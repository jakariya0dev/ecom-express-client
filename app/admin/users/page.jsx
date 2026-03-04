"use client";
import React, { use } from "react";
import StatCard from "@/components/admin/StatCard";
import {
  ShoppingCart,
  Users,
  ShoppingBag,
  ShoppingBasket,
  Search,
  User2Icon,
} from "lucide-react";
import Image from "next/image";
import {
  changeUserStatusMutation,
  getUsersMutation,
} from "@/lib/api/common/userApi";
import { CURRENCY_SYMBOL } from "@/data/const";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function UserPage() {
  const [filterValue, setFilterValue] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const queryClient = useQueryClient();
  const changeUserStatus = changeUserStatusMutation();
  const { data, isLoading } = getUsersMutation(filterValue, debouncedSearchValue);
  const usersData = data?.data?.data;

  // console.log(usersData);

  const handleStatusChange = (userId, status) => {
    changeUserStatus.mutate(
      { userId, status },
      {
        onSuccess: (data) => {
          // console.log(data);
          toast.success(data.data.message);
          queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => {
          // console.log(err);
          toast.error(err.response.data.message);
        },
      },
    );
  };


  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex-1">
      {/* Stat Cards */}
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
              onChange={(e) => setFilterValue(e.target.value)}
              value={filterValue}
              className="ml-4 p-2 border border-gray-100 rounded-md"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="verified">Verified</option>
              <option value="not_verified">Not Verified</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </select>
          </div>

          <div className="flex border border-[#2f2f2f] rounded-lg">
            
              <input
                type="text"
                onChange={(e) => setSearchValue(e.target.value)}
                value={searchValue}
                placeholder="Search here"
                className="px-4 py-2 w-full focus:outline-none"
              />
              <button
                className="p-4 rounded-lg bg-[#2f2f2f] hover:cursor-pointer hover:bg-[#555454]"
              >
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
                <th className="pb-2 text-start">Orders</th>
                <th className="pb-2 text-start">Amount</th>
                <th className="pb-2 text-start">Status</th>
                <th className="pb-2 text-start">Change Status</th>
              </tr>
            </thead>
            <tbody>
              {usersData &&
                usersData.map((user, index) => (
                  <tr key={index} className="border-b border-[#2f2f2f]">
                    <td className="pr-4">{index + 1}</td>
                    <td className="py-4">
                      {usersData?.avatar ? (
                        <Image
                          src={user?.avatar?.url}
                          alt="Product 1"
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full grid place-content-center">
                          <User2Icon size={24} className="text-gray-900" />
                        </div>
                      )}
                    </td>
                    <td className="py-4">
                      <p className="mb-1">
                        {user?.name}{" "}
                        {user?.verified && (
                          <span className="text-green-200 text-xs bg-amber-600 rounded-md px-2 py-1 lowercase">
                            Verified
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400">
                        Email: {user?.email}
                      </p>
                    </td>

                    <td className="py-4">{user?.phone || "N/A"}</td>
                    <td className="py-4">{user?.orders.length || "0"}</td>
                    <td className="py-4">
                      <span className="text-gray-400 text-xs">
                        {CURRENCY_SYMBOL}
                      </span>
                      {user?.orders.reduce(
                        (total, order) => total + order.totalAmount,
                        0,
                      )}
                    </td>

                    <td className="py-4">
                      <span
                        className={`text-xs font-semibold py-1 px-3 rounded-md lowercase ${user?.status === "active" ? "bg-green-600" : "bg-red-600"}`}
                      >
                        {user?.status}
                      </span>
                    </td>
                    <td className="flex gap-2 py-4">
                      <select
                        className="p-2 bg-[#2f2f2f] text-gray-100 rounded-md cursor-pointer hover:bg-gray-500 transition-all duration-300"
                        value={user?.status}
                        onChange={(e) =>
                          handleStatusChange(user?._id, e.target.value)
                        }
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                        <option value="blocked">Blocked</option>
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
