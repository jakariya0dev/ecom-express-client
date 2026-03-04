"use client";
import React, { useState } from "react";
import StatCard from "@/components/admin/StatCard";
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
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  deleteProductMutation,
  getProductsMutation,
  toggleFeaturedStatusMutation,
} from "@/lib/api/common/productsApi";
import useDebounce from "@/hooks/useDebounce";
import Pagination from "@/components/common/Pagination";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  SWAL_CONFIRM_DELETE_OPTIONS,
  SWAL_ERROR_OPTIONS,
  SWAL_PENDING_OPTIONS,
  SWAL_SUCCESS_OPTIONS,
} from "@/data/const";

export default function Products() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const debouncedSearch = useDebounce(search, 500);
  const { data, isLoading } = getProductsMutation(debouncedSearch, currentPage, filter);
  const toggleFeaturedStatus = toggleFeaturedStatusMutation();
  const deleteProduct = deleteProductMutation();
  const queryClient = useQueryClient();

  const products = data?.data?.products || [];

  console.log(products);

  const handleProductDelete = (productId) => {
    Swal.fire(SWAL_CONFIRM_DELETE_OPTIONS).then((result) => {
      if (result.isConfirmed) {
        deleteProduct.mutate(productId, {
          onSuccess: (data) => {
            // Invalidate queries to refresh data
            queryClient.invalidateQueries(["products", productId]);
            Swal.fire({
              ...SWAL_SUCCESS_OPTIONS,
              title: "Deleted",
              text: data?.data?.message,
            });
          },
          onError: (err) => {
            toast.error(err.response?.data?.message);
            console.log(err);
          },
        });
      }
    });
  };

  const handleFeaturedToggle = (productId) => {
    toggleFeaturedStatus.mutate(productId, {
      onSuccess: (data) => {
        // Invalidate queries to refresh data
        queryClient.invalidateQueries(["products", productId]);
        // toast.success(data.message);
        Swal.fire({
          ...SWAL_SUCCESS_OPTIONS,
          title: "Updated",
          text: data?.data?.message,
        });
      },
      onError: (err) => {
        Swal.fire({...SWAL_ERROR_OPTIONS, text: err.response?.data?.message});
        console.log(err);
      },
    });
  };

  if (toggleFeaturedStatus.isPending)
    Swal.fire({ ...SWAL_PENDING_OPTIONS, title: "Updating..." });

  if (deleteProductMutation.isPending)
    Swal.fire({ ...SWAL_PENDING_OPTIONS, title: "Deleting..." });

  if (isLoading) return <div>Loading...</div>;

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
              href="/admin/products/create"
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
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="ml-4 p-2 border border-gray-100 rounded-md"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="featured">Featured</option>
              <option value="not_featured">Unfeatured</option>
              <option value="out_of_stock">Out of Stock</option>
              {/* <option value="best_selling">Best Selling</option>
              <option value="most_viewed">Most Viewed</option>
              <option value="most_rated">Most Rated</option>
              <option value="lowest_rated">Lowest Rated</option>
              <option value="low_stock">Low Stock</option>
              <option value="recently_added">Recently Added</option>
              <option value="recently_updated">Recently Updated</option>
              <option value="recently_sold">Recently Sold</option>
              <option value="recently_deleted">Recently Deleted</option> */}
            </select>
          </div>

          <div className="flex border border-[#2f2f2f] rounded-lg">
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
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
              {products.map((product, index) => {
                return (
                  <tr key={product.id} className="border-b border-[#2f2f2f]">
                    <td className="py-4 pr-2">{index + 1}</td>
                    <td className="py-4 flex items-center gap-2">
                      <div>
                        <Image
                          src={product.thumbnail.url}
                          alt="Product 1"
                          width={50}
                          height={50}
                          className="rounded-full h-10 w-10 object-cover"
                        />
                      </div>
                      <div>
                        <p>{product.name}</p>
                        <p className="text-sm text-gray-400 italic">
                          Category: {product?.category?.name}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">$10</td>
                    <td className="py-4">10</td>
                    <td className="py-4">5</td>
                    <td className="py-4">
                      <button
                        disabled={toggleFeaturedStatus.isPending}
                        onClick={() => handleFeaturedToggle(product.id)}
                        tooltip="Toggle Featured"
                        className="cursor-pointer"
                      >
                        {product.isFeatured ? (
                          <ToggleRight size={24} className="text-green-500" />
                        ) : (
                          <ToggleLeft size={24} />
                        )}
                      </button>
                    </td>
                    <td className="flex gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="px-4 py-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300">
                        <EditIcon size={20} />
                      </Link>
                      <button
                        onClick={() => handleProductDelete(product.id)}
                        className="px-4 py-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300"
                      >
                        <Trash size={20} />
                      </button>
                      <Link href={`/admin/products/${product.id}`} className="px-4 py-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300">
                        <EyeIcon size={20} />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Pagination
            totalPages={data?.data?.totalPages}
            setCurrentPage={setCurrentPage}
            currentPage={data?.data?.currentPage}
          />
        </div>
      </div>
    </div>
  );
}
