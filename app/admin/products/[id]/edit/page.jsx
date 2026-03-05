"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Trash2, Upload, Package, ArrowLeft } from "lucide-react";
import {
  updateProductMutation,
  getSingleProductMutation,
} from "@/lib/api/common/productsApi";
import { useGetCategories } from "@/lib/api/admin/categoriesApi";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import BackButton from "@/components/admin/BackButton";

const EditProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState("");
  const queryClient = useQueryClient();

  // API Hooks
  const { data, isLoading: isProductLoading } = getSingleProductMutation(id);
  const updateProduct = updateProductMutation();
  const { categoriesData } = useGetCategories();

  const product = data?.data?.product;

  console.log(product, id);

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
      attributes: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "attributes",
  });

  //  Populate Form when data is fetched
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        brand: product.brand,
        category: product.category?._id || product.category,
        shortDescription: product.shortDescription,
        longDescription: product.longDescription,
        tags: product.tags?.join(", "), // Convert array to string for input
        attributes: product.attributes || [],
      });
      setExistingImage(product.thumbnail?.url || product.image);
    }
  }, [product, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("category", data.category);
    formData.append("shortDescription", data.shortDescription);
    formData.append("longDescription", data.longDescription);
    formData.append("tags", data.tags);
    formData.append("attributes", JSON.stringify(data.attributes));

    // Only append image if a NEW one was selected
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }

    updateProduct.mutate(
      { id, formData },
      {
        onSuccess: () => {
            queryClient.invalidateQueries(["product", id]);
            router.push("/admin/products")
        },
        onError: (err) => toast.error(err.response.data.message),
      },
    );
  };

  if (isProductLoading)
    return <div className="p-8 text-white">Loading Product Data...</div>;

  return (
    <div className="p-8 bg-card text-gray-100 rounded shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Package size={24} />
          </div>
          <p className="text-xl font-semibold text-gray-200">
            <Link href="/admin/products" className="hover:text-blue-400">
              Products
            </Link>
            <span className="text-gray-400 mx-2">/ Edit</span> 
          </p>
        </div>
        <BackButton />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image Section */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 p-6 rounded-xl bg-[#1e1e1e]">
          {preview || existingImage ? (
            <div className="relative group">
              <img
                src={preview || existingImage}
                alt="Product"
                className="h-40 w-40 object-cover rounded-lg mb-4 border border-gray-700"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                <p className="text-xs text-white">Change Image</p>
              </div>
            </div>
          ) : (
            <Upload className="mb-2 text-gray-500" size={32} />
          )}
          <input
            type="file"
            accept="image/*"
            {...register("image")}
            onChange={handleImageChange}
            className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-900 file:text-blue-200 hover:file:bg-blue-800 cursor-pointer"
          />
          <p className="text-xs text-gray-500 mt-2">
            Leave empty to keep existing image
          </p>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Product Name
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                * {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Brand
            </label>
            <input
              {...register("brand", { required: "Brand is required" })}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-white"
            />
            {errors.brand && (
              <p className="text-red-500 text-xs mt-1">
                * {errors.brand.message}
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Attributes */}
        <div className="space-y-3 bg-[#1e1e1e] p-4 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <label className="text-sm font-semibold text-blue-400">
              Specifications / Attributes
            </label>
            <button
              type="button"
              onClick={() => append({ key: "", value: "" })}
              className="bg-gray-700 p-1.5 rounded-md text-gray-200 hover:bg-gray-600 transition-colors"
            >
              <Plus size={18} />
            </button>
          </div>

          {fields.map((item, index) => (
            <div key={item.id} className="flex gap-3">
              <input
                {...register(`attributes.${index}.key`)}
                placeholder="Key"
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
              />
              <input
                {...register(`attributes.${index}.value`)}
                placeholder="Value"
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg text-sm"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-400 p-2"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
        </div>

        {/* Descriptions */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Short Description
          </label>
          <textarea
            {...register("shortDescription", {
              required: "Short Description is required",
            })}
            rows="2"
            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg outline-none text-white"
          />
          {errors.shortDescription && (
            <p className="text-red-500 text-xs mt-1">
              * {errors.shortDescription.message}
            </p>
          )}
        </div>

        {/* Long Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Long Description
          </label>
          <textarea
            {...register("longDescription")}
            rows="4"
            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg outline-none text-white"
          />
        </div>

        {/* Tags & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Tags (Comma separated)
            </label>
            <input
              {...register("tags")}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg outline-none text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              Category
            </label>
            <select
              {...register("category", { required: true })}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg outline-none text-white"
            >
              {categoriesData?.categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={updateProduct.isPending}
            className="flex-1 bg-blue-600 text-white py-3.5 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:bg-gray-600"
          >
            {updateProduct.isPending ? "Saving Changes..." : "Update Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
