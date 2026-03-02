"use client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import {
  ShoppingCart,
  Users,
  ShoppingBag,
  ShoppingBasket,
  Search,
  EditIcon,
  EyeIcon,
  Trash,
  PlusIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useGetProducts } from "@/lib/api/admin/productsApi";

export default function Products() {
  const { data, isLoading } = useGetProducts();


  console.log(data);
  
  if(isLoading) return <div>Loading...</div>;

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          name="Total Products"
          icon={<ShoppingBasket size={20} />}
          value="$1,234,567"
        />
        <StatCard
          name="Total Stock"
          icon={<ShoppingCart size={20} />}
          value="12,345"
        />
        <StatCard name="Sold Items" icon={<Users size={20} />} value="1,234" />
        <StatCard
          name="Featured Items"
          icon={<ShoppingBag size={20} />}
          value="1,234"
        />
      </div>

      <div className="bg-card">
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <p className="text-xl font-semibold">Product List</p>
          </div>

          <div className="flex border border-[#2f2f2f] rounded-lg">
            <Link
              href="/dashboard/products/create"
              className="px-4 py-2 text-white rounded-lg bg-purple-600 flex gap-2 items-center"
            >
              <PlusIcon size={24} /> Add New Product
            </Link>
          </div>
        </div>

        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <p className="text-lg">Filter By:</p>
            <select
              name="product_filter"
              id="product_filter"
              className="ml-4 p-2 border border-gray-100 rounded-md"
            >
              <option className="bg-black" value="all">
                All
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
              <option value="unfeatured">Unfeatured</option>
              <option value="best_selling">Best Selling</option>
              <option value="most_viewed">Most Viewed</option>
              <option value="most_rated">Most Rated</option>
              <option value="lowest_rated">Lowest Rated</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="recently_added">Recently Added</option>
              <option value="recently_updated">Recently Updated</option>
              <option value="recently_sold">Recently Sold</option>
              <option value="recently_deleted">Recently Deleted</option>
            </select>
          </div>

          <div className="flex border border-[#2f2f2f] rounded-lg">
            <input
              type="text"
              placeholder="Search here"
              className="px-4 py-2 w-full focus:outline-none"
            />
            <button className="p-4 rounded-lg bg-[#2f2f2f]">
              <Search size={20} />
            </button>
          </div>
        </div>
        <div className="p-5 w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="mb">
              <tr className="border-b">
                <th className="pb-2 text-start">#</th>
                <th className="pb-2 text-start">Name</th>
                <th className="pb-2 text-start">Price</th>
                <th className="pb-2 text-start">Stock</th>
                <th className="pb-2 text-start">Sold</th>
                <th className="pb-2 text-start">Featured</th>
                <th className="pb-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product, index) => {
                return (
                  <tr key={product.id} className="border-b border-[#2f2f2f]">
                    <td className="py-4 pr-2">
                      {index + 1}
                    </td>
                    <td className="py-4 flex items-center gap-2">
                      <div>
                        <Image
                        src={product.thumbnail.url}
                        alt="Product 1"
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      </div>
                      <div>
                        <p>{product.name}</p>
                      <p className="text-sm text-gray-400 italic">Category: {product.category.name}</p>
                      </div>
                    </td>
                    <td className="py-4">$10</td>
                    <td className="py-4">10</td>
                    <td className="py-4">5</td>
                    <td className="py-4">Yes</td>
                    <td className="flex gap-2 py-4">
                      <button className="px-4 py-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300">
                        <EditIcon size={20} />
                      </button>
                      <button className="px-4 py-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300">
                        <Trash size={20} />
                      </button>
                      <button className="px-4 py-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300">
                        <EyeIcon size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
