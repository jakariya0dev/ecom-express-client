"use client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import {
  DollarSign,
  ShoppingCart,
  Users,
  ShoppingBag,
  LucideShoppingBasket,
  ShoppingBasket,
  Search,
  Edit,
  Delete,
  EditIcon,
  DeleteIcon,
  View,
  ViewIcon,
  EyeIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";

export default function UserPage() {
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
            <p className="text-lg font-semibold">Product List</p>
            <select
              name="user_filter"
              id="user_filter"
              className="ml-4 p-2 border border-gray-100 rounded-md"
            >
              <option value="all">All</option>
              <option value="verified">Verified</option>
              <option value="not_verified"></option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
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
                <th className="pb-2 text-start">Email</th>
                <th className="pb-2 text-start">Phone</th>
                <th className="pb-2 text-start">Total Sales</th>
                <th className="pb-2 text-start">Total Orders</th>
                <th className="pb-2 text-start">Status</th>
                <th className="pb-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#2f2f2f]">
                <td className="py-4">
                  <Image
                    src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                    alt="Product 1"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </td>
                <td className="py-4">
                  <p>Product 1</p>
                  <p className="text-sm text-gray-400">ID: 123</p>
                </td>

                <td className="py-4">$10</td>
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

              <tr className="border-b border-[#2f2f2f]">
                <td className="py-4">
                  <Image
                    src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                    alt="Product 1"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </td>
                <td className="py-4">
                  <p>Product 1</p>
                  <p className="text-sm text-gray-400 italic">ID: 123</p>
                </td>

                <td className="py-4">$10</td>
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

              <tr className="border-b border-[#2f2f2f]">
                <td className="py-4">
                  <Image
                    src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                    alt="Product 1"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </td>
                <td className="py-4">
                  <p>Product 1</p>
                  <p className="text-sm text-gray-400 italic">ID: 123</p>
                </td>

                <td className="py-4">$10</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
