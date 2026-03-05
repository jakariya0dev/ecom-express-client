"use client";

import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, Package } from "lucide-react";
import { useAddProduct } from "@/lib/api/common/productsApi";
import { useGetCategories } from "@/lib/api/admin/categoriesApi";
import Link from "next/link";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const { mutate, isAddProductLoading } = useAddProduct();
  const { categoriesData, isGetCategoriesLoading } =
    useGetCategories();

  // console.log(categoriesData);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      shortDescription: "",
      longDescription: "",
      tags: "",
      attributes: [{ key: "", value: "" }],
    },
  });

  // Dynamic Fields
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  // Image Preview Logic
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Form Submission
  const onSubmit = (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("shortDescription", data.shortDescription);
    formData.append("longDescription", data.longDescription);
    formData.append("tags", data.tags);
    formData.append("attributes", JSON.stringify(data.attributes));

    // Append the file
    if (data.image[0]) {
      formData.append("image", data.image[0]);
    }

    mutate(formData);
    // console.log(Object.fromEntries(formData.entries()));
    
  };

  return (
    <div className="p-8 bg-card text-gray-100 rounded shadow-sm">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
          <Package size={24} />
        </div>
        <h2 className="text-2xl font-bold text-gray-200">
          <Link href="/admin/products">Products</Link> <span className="text-gray-400">/</span> Create
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Upload Area */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 p-6 rounded-xl">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-40 object-cover rounded-lg mb-4"
            />
          ) : (
            <Upload className="mb-2" size={32} />
          )}
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            onChange={handleImageChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.image && <p className="text-red-500 mt-2">Select a product image</p>}
        </div>

        {/* Product Name, Brand */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-1">
              Product Name
            </label>
            <input
              {...register("name", { required: true })}
              className="w-full p-2.5 bg-gray-500 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="e.g. MacBook Pro M3"
            />
            {errors.name && <p className="text-red-500 mt-1">Name is required</p>}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-1">
              Brand
            </label>
            <input
              {...register("brand", {required: true })}
              className="w-full p-2.5 bg-gray-500 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Apple"
            />
            {errors.brand && <p className="text-red-500 mt-1">Brand is required</p>}
          </div>
        </div>

        {/* Dynamic Attributes */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-gray-200">
              Product Specifications
            </label>
            <button
              type="button"
              onClick={() => append({ key: "", value: "" })}
              className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
            >
              <Plus size={18} /> Add Attribute
            </button>
          </div>

          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-3">
              <input
                {...register(`attributes.${index}.key`)}
                placeholder="Key (e.g. Color)"
                className="flex-1 p-2 bg-gray-500 border border-gray-200 rounded-lg text-sm text-gray-50"
              />
              <input
                {...register(`attributes.${index}.value`)}
                placeholder="Value (e.g. Space Gray)"
                className="flex-1 p-2 bg-gray-500 border border-gray-200 rounded-lg text-sm text-gray-50"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 hover:text-red-600 px-2"
              >
                <Trash2 size={24} />
              </button>
            </div>
          ))}
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-50 mb-1">
            Short Description
          </label>
          <textarea
            {...register("shortDescription", { required: true })}
            rows="2"
            className="w-full p-2.5 border border-gray-600 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none"
          />
          {errors.shortDescription && <p className="text-red-500 mt-1">Short Description is required</p>}
        </div>

        {/* Tags and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-1">
              Tags (Comma separated)
            </label>
            <input
              {...register("tags")}
              className="w-full p-2.5 text-gray-50 bg-gray-500 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="electronics, computing, deals"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-1">
              Select Category
            </label>
            <select {...register("category", { required: true })} className="w-full p-2.5 bg-gray-500 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="">Not Selected</option>
                {
                  categoriesData?.categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.name}</option>
                  ))
                }
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">Select a category</p>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isAddProductLoading}
          className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow shadow-blue-100 disabled:bg-gray-300"
        >
          {isAddProductLoading ? "Publishing..." : "Publish Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
