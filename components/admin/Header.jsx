import { Bell } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <header className="bg-[#1e1e1e] shadow-lg border-b border-[#1f1f1f] my-4">
      <div className="py-4 px-4 sm:px-6 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-100">
          Dashboard
        </h1>

        <div className="flex items-center space-x-3 sm:space-x-6">
          <Image
            src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full shadow-md cursor-pointer"
          />

          <div className="relative">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 cursor-pointer hover:text-white transition-all" size={24} />
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <Image
            src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full shadow-md cursor-pointer"
          />
          <span className="hidden sm:block text-gray-100 font-medium">
            Jhone Doe
          </span>
          </div>

        </div>
      </div>
    </header>
  );
}
