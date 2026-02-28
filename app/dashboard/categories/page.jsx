"use client";

import StatCard from "@/components/dashboard/StatCard";
import { useGetCategories } from "@/lib/api/dashboard/categoriesApi";

import {
  ShoppingCart,
  Users,
  ShoppingBag,
  ShoppingBasket,
  Search,
  EditIcon,
  EyeIcon,
  Trash,
} from "lucide-react";
import Image from "next/image";
import { AddCategory } from "@/components/dashboard/AddCategory";

export default function Categories() {

  const {categoriesData, isGetCategoriesLoading} = useGetCategories();
  console.log(categoriesData);
  
  if (isGetCategoriesLoading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="flex-1">

      {/* Stats */}
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

      {/* <AddCategory categoriesData={categoriesData}/> */}

      <div className="bg-card">
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold">Category List</p>
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
                <th className="pb-2 text-start">Category Name</th>
                <th className="pb-2 text-start">Parent Category</th>
                <th className="pb-2 text-start">Total Items</th>
                <th className="pb-2 text-start">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                categoriesData?.categories.map((category, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 text-start">{index + 1}</td>
                    <td className="py-2 text-start">
                      <div className="flex items-center gap-2">
                        <Image
                          src={category?.image.url}
                          alt={category?.name}
                          width={50}
                          height={50}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                        <p>{category?.name}</p>
                      </div>
                    </td>
                    <td className="py-2 text-start">{category.parent === null ? "None" : category.parent.name}</td>
                    <td className="py-2 text-start">{category.product?.length}</td>
                    <td className="py-2 text-start">
                      <div className="flex items-center gap-2">
                        <EditIcon size={20} />
                        <EyeIcon size={20} />
                        <Trash size={20} />
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


