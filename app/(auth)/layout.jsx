import Link from "next/link";
import { Code } from "lucide-react";
import { Children } from "react";

export default function layout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      
      {children}

      {/* Right Side - Branding */}
      <div className="hidden md:flex flex-1  flex-col items-center justify-center bg-blue-600 text-white p-8">
        <Code size={64} className="mb-4" />
        <h1 className="text-3xl font-bold mb-2">MyWebsite</h1>
        <p className="text-lg">Empowering Through Innovation</p>
      </div>
    </div>
  );
}
