"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Upload, Box, DollarSign, Layers } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { addVariantMutation } from "@/lib/api/admin/variantApi";

const AddVariant = () => {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId"); // Get ID from URL
  const queryClient = useQueryClient();
  const [previews, setPreviews] = useState([]);
  const addVariant = addVariantMutation();
  

  const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      sku: "",
      costPrice: 0,
      price: 0,
      salePrice: 0,
      stock: 0,
      options: { color: "", size: "", weight: "", storage: "" },
      attributes: [],
      isDefault: false
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes"
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...urls]);
  };

  const onSubmit = (data) => {
    if (!productId) return alert("Product ID is missing!");

    const formData = new FormData();
    formData.append("product", productId);
    formData.append("sku", data.sku);
    formData.append("costPrice", data.costPrice);
    formData.append("price", data.price);
    formData.append("salePrice", data.salePrice);
    formData.append("stock", data.stock);
    formData.append("isDefault", data.isDefault);

    // Append nested Objects/Arrays as JSON strings for Multer
    formData.append("options", JSON.stringify(data.options));
    formData.append("attributes", JSON.stringify(data.attributes));

    // Multiple Images
    const imageFiles = document.getElementById("variant-images").files;
    for (let i = 0; i < imageFiles.length; i++) {
      formData.append("images", imageFiles[i]);
    }

    addVariant.mutate(formData, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["product", productId]);
        toast.success(data.message);
        reset();
        setPreviews([]);
      },
      onError: (err) => {
        console.log(err);
        toast.error(err.response.data.message);
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-[#2f2f2f] text-gray-100 rounded-xl shadow-2xl">
      <div className="flex items-center gap-3 mb-8 border-b border-gray-700 pb-4">
        <Box className="text-blue-400" />
        <h2 className="text-2xl font-bold">Add Product Variant</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">SKU (Unique Code)</label>
            <input 
              {...register("sku", { required: "SKU is required" })}
              className="w-full p-3 bg-[#1e1e1e] rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="IPHONE-15-BLUE-128"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Inventory Stock</label>
            <input 
              type="number" {...register("stock")}
              className="w-full p-3 bg-[#1e1e1e] rounded focus:outline-none"
            />
          </div>
        </div>

        {/* Section 2: Pricing */}
        <div className="bg-[#383838] p-6 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <DollarSign size={14}/> Cost Price
            </label>
            <input type="number" {...register("costPrice")} className="w-full p-3 bg-[#1e1e1e] rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Selling Price</label>
            <input type="number" {...register("price")} className="w-full p-3 bg-[#1e1e1e] rounded" />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Sale Price (Optional)</label>
            <input type="number" {...register("salePrice")} className="w-full p-3 bg-[#1e1e1e] rounded" />
          </div>
        </div>

        {/* Section 3: Primary Options */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider">Primary Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["color", "size", "weight", "storage"].map(opt => (
              <div key={opt}>
                <label className="block text-[10px] uppercase text-gray-500 mb-1">{opt}</label>
                <input 
                  {...register(`options.${opt}`)}
                  className="w-full p-2 bg-[#1e1e1e] rounded text-sm"
                  placeholder={`e.g. ${opt === 'storage' ? '128GB' : '...'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Dynamic Attributes */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Layers size={16}/> Custom Attributes
            </h3>
            <button 
              type="button" onClick={() => append({ key: "", value: "" })}
              className="text-xs bg-gray-700 px-3 py-1 rounded hover:bg-gray-600"
            >
              + Add Attribute
            </button>
          </div>
          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-4 animate-in fade-in duration-300">
              <input {...register(`attributes.${index}.key`)} placeholder="Key (Material)" className="flex-1 p-2 bg-[#1e1e1e] rounded text-sm" />
              <input {...register(`attributes.${index}.value`)} placeholder="Value (Leather)" className="flex-1 p-2 bg-[#1e1e1e] rounded text-sm" />
              <button type="button" onClick={() => remove(index)} className="text-red-400 hover:bg-red-900/20 p-2 rounded">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* Section 5: Image Upload */}
        <div className="space-y-4">
          <label className="block text-sm text-gray-400">Variant Images (Multiple)</label>
          <div className="flex flex-wrap gap-4">
            {previews.map((url, i) => (
              <img key={i} src={url} className="w-24 h-24 object-cover rounded bg-[#1e1e1e]" alt="preview" />
            ))}
            <label className="w-24 h-24 flex flex-col items-center justify-center bg-[#1e1e1e] rounded cursor-pointer hover:bg-[#252525] border border-dashed border-gray-600">
              <Upload size={20} className="text-gray-500" />
              <span className="text-[10px] mt-1 text-gray-500">Upload</span>
              <input id="variant-images" type="file" multiple onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-[#383838] rounded">
          <input type="checkbox" {...register("isDefault")} className="w-4 h-4 rounded accent-blue-500" />
          <label className="text-sm text-gray-300">Set as default variant for this product</label>
        </div>

        <button 
          disabled={addVariant.isPending}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition-all shadow-lg disabled:bg-gray-600"
        >
          {addVariant.isPending ? "Saving Variant..." : "Add Variant to Product"}
        </button>
      </form>
    </div>
  );
};

export default AddVariant;