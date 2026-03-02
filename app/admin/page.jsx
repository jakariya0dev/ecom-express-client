"use client";
import React from "react";
import StatCard from "@/components/dashboard/StatCard";
import { DollarSign, ShoppingCart, Users, ShoppingBag } from "lucide-react";
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

export default function page() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          name="Total Revenue"
          icon={<DollarSign size={20} />}
          value="$1,234,567"
        />
        <StatCard
          name="Total Orders"
          icon={<ShoppingCart size={20} />}
          value="12,345"
        />
        <StatCard
          name="Total Customers"
          icon={<Users size={20} />}
          value="1,234"
        />
        <StatCard
          name="Total Products"
          icon={<ShoppingBag size={20} />}
          value="1,234"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-[#1e1e1e] backdrop-blur-md outline-hidden shadow-lg rounded-xl border border-[#2f2f2f]">
          <p className="mb-4 font-semibold">Monthly Sales</p>
          <LineChart width={300} height={300} data={monthlySalesData}>
            <XAxis dataKey="month" />
            <YAxis dataKey="revenue" />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="p-4 bg-[#1e1e1e] backdrop-blur-md outline-hidden shadow-lg rounded-xl border border-[#2f2f2f]">
          <p className="mb-4 font-semibold">Monthly Sales</p>
          <LineChart width={300} height={300} data={monthlySalesData}>
            <XAxis dataKey="month" />
            <YAxis dataKey="revenue" />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="p-4 bg-[#1e1e1e] backdrop-blur-md outline-hidden shadow-lg rounded-xl border border-[#2f2f2f]">
          <p className="mb-4 font-semibold">Monthly Sales</p>
          <LineChart width={300} height={300} data={monthlySalesData}>
            <XAxis dataKey="month" />
            <YAxis dataKey="revenue" />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </div>

        <div className="p-4 bg-[#1e1e1e] backdrop-blur-md outline-hidden shadow-lg rounded-xl border border-[#2f2f2f]">
          <p className="mb-4 font-semibold">Monthly Sales</p>
          <LineChart width={300} height={300} data={monthlySalesData}>
            <XAxis dataKey="month" />
            <YAxis dataKey="revenue" />
            <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            <Line type="monotone" dataKey="orders" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
