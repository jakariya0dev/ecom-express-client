"use client";

import React from "react";
import { useParams } from "next/navigation";
import { getProductMutation } from "@/lib/api/admin/productsApi";
import { Edit3, Plus, Settings, ChevronRight, Package, Info } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productData, isLoading, isError } = getProductMutation(id);

  console.log(productData?.product);
  // console.log(id);

  // return null;
  
  
  if (isLoading) return <div className="p-10 text-center">Loading productData.data...</div>;
  if (isError) return <div className="p-10 text-center text-red-500 font-bold">productData.data not found.</div>;

  return (
    <div className="">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 bg-[#2f2f2f] text-gray-100 p-4 rounded shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-100">
          <Link href="admin/productData.data" className="hover:text-blue-600 transition">Products</Link>
          <ChevronRight size={14} />
          <span className="font-medium text-gray-300 truncate max-w-50">{productData.product.name}</span>
        </div>
        
        <div className="flex items-center gap-3">
          <Link 
            href={`/admin/productData.data/edit/${productData.product._id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition"
          >
            <Edit3 size={16} /> Edit Product
          </Link>
          <Link 
            href={`/admin/variants/add?productData.dataId=${productData.product._id}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition shadow"
          >
            <Plus size={16} /> Add Variant
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Media & Specs */}
        <div className="lg:col-span-1 space-y-4">
          <div className="aspect-square bg-[#2f2f2f] rounded overflow-hidden">
            <Image
              width={500}
              height={300} 
              src={productData.product.thumbnail?.url || "/placeholder.png"} 
              alt={productData.product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-[#2f2f2f] p-4 rounded">
            <h3 className="text-sm font-bold text-gray-100 mb-4 flex items-center gap-2">
              <Settings size={16} className="text-blue-100" /> Specifications
            </h3>
            <div className="space-y-4">
              {productData.product.attributes?.map((attr, i) => (
                <div key={i} className="flex justify-between text-sm border-b border-gray-50 pb-2">
                  <span className="text-gray-100">{attr.key}</span>
                  <span className="font-semibold text-gray-100">{attr.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Details & Variants */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#2f2f2f] p-4 rounded">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 text-blue-600 bg-blue-100 text-[10px] font-semibold uppercase rounded tracking-wider">
                Brand: {productData.product.brand}
              </span>
              {productData.product.isFeatured && (
                <span className="px-2 py-0.5 bg-[#fbbf24] text-amber-600 text-[10px] font-bold uppercase rounded tracking-wider">
                  Featured
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-100 mb-4">{productData.product.name}</h1>
            <p className="text-gray-200 leading-relaxed mb-6">{productData.product.shortDescription}</p>
            
            <div className="flex gap-2 flex-wrap"> Tags:
              {productData.product.tags?.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Variants Table */}
          <div className="bg-[#2f2f2f] rounded overflow-hidden">
            <div className="p-4 bg-[#2f2f2f] flex items-center gap-2">
              <Package size={18} className="text-gray-100" />
              <h3 className="font-bold text-gray-100">Available Variants</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-[#4e4d4d] text-gray-100 uppercase text-[10px] font-bold tracking-widest">
                    <th className="px-6 py-4">Option (Size/Color)</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">Stock</th>
                    <th className="px-6 py-4">SKU</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {productData.product.variants?.length > 0 ? (
                    productData.product.variants.map((variant) => (
                      <tr key={variant._id} className="hover:bg-gray-700 transition">
                        <td className="px-6 py-4 font-medium text-gray-100">
                          {Object.values(variant.options || {}).join(" / ")}
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-bold text-blue-400">৳{variant.salePrice || variant.price}</span>
                          {variant.salePrice && <span className="ml-2 text-xs text-gray-400 line-through">৳{variant.price}</span>}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-md text-[10px] font-bold ${variant.stock > 10 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {variant.stock} Left
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-400 font-mono text-xs">{variant.sku}</td>
                        <td className="px-6 py-4 text-right">
                          <Link href={`/admin/variants/edit/${variant._id}`} className="text-gray-400 hover:text-blue-600">
                            <Edit3 size={14} />
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-10 text-center text-gray-400 italic">
                        No variants added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;