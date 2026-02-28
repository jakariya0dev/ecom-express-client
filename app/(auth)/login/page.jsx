"use client";
import { useState } from "react";
import Link from "next/link";
import { Code } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/lib/api/common/authApi";
import { toast } from "react-toastify";

export default function userLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // login mutation 
  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      toast.success("User Login successful");
    },
    onError: (error) => {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
      
    }
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
    console.log("Form Data Submitted:", formData);
    // Add your registration API call here
  };

  // redirect user if 

  return (
    <div className="flex-1 flex items-center justify-center bg-gray-100 text-slate-500">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-sm">
            <p>Forgot your password? <Link href="/forgot-password" className="text-blue-500 font-semibold">Reset Password</Link></p>
            <p>Don't have an account? <Link href="/register" className="text-blue-500 font-semibold">Register</Link></p>
          </div>
        </div>
      </div>
  );
}
