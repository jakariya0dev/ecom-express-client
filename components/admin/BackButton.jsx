import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
    const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-1 bg-purple-400 px-4 py-2 text-sm font-semibold rounded hover:bg-purple-600 transition-all duration-300 ease-in-out"
    >
      {" "}
      <ArrowLeft size={16} /> Back
    </button>
  );
}
