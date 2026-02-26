"use client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { DollarSign, ShoppingCart, Users, ShoppingBag, LucideShoppingBasket, ShoppingBasket } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  monthlySalesData,
  weeklySalesData,
  growthSalesData,
  dailySalesData,
} from "@/data/data";

export default function Products() {
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
        <StatCard
          name="Sold Items"
          icon={<Users size={20} />}
          value="1,234"
        />
        <StatCard
          name="Featured Items"
          icon={<ShoppingBag size={20} />}
          value="1,234"
        />
      </div>
      <div className="bg-card">
        <div className="">
            <div className="flex p-4 items-center">
                <p className="text-lg font-semibold">Product List</p>
                <select name="product_filter" id="product_filter" className="ml-4 p-2 border border-gray-100 rounded-md">
                    <option className="bg-black" value="all">All</option>
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
        </div>
      </div>
    </div>
  );
}
