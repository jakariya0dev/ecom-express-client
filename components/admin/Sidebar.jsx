"use client";
import {
  House,
  DollarSign,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Mail,
  Users,
  Bell,
  Info,
  Icon,
  Menu,
  SquareMenu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const Links = [
  {
    name: "Home",
    href: "/admin",
    icon: House,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: ShoppingBag,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
    {
    name: "Categories",
    href: "/admin/categories",
    icon: SquareMenu,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex shrink-0 ${isSidebarExpanded ? "w-72" : "w-24"}`}
    >
      <div className="h-full w-full bg-[#1e1e1e] backdrop-blur-md p-4 flex flex-col border-r border-[#2f2f2f]">
        <div className="flex justify-between">
          {isSidebarExpanded && (
            <h1 className="text-2xl font-semibold text-gray-100">Ecom</h1>
          )}
          <button
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            className="flex items-center gap-4 py-2 px-4 rounded-md hover:bg-[#2f2f2f]"
          >
            <Menu size={20} />
          </button>
        </div>
        <nav className="mt-8 grow">
          {Links.map((link, index) => (
            <Link
              href={link.href}
              key={index}
              className={`flex items-center gap-4 py-2 px-4 rounded-md hover:bg-[#2f2f2f] ${pathname === link.href ? "bg-[#2f2f2f]" : ""}`}
            >
              <link.icon size={20} />
              {isSidebarExpanded && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
