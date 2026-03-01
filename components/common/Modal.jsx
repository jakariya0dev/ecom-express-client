"use client";

import { CroissantIcon, Cross, CrossIcon, X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ open, onClose, onConfirm, children, }) {
//   useEffect(() => {
//     const handleEsc = (e) => {
//       if (e.key === "Escape") onClose();
//     };

//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/80"
      />

      {/* modal */}
      <div className="relative z-10 w-full max-w-lg rounded-lg p-8 shadow-lg bg-[#1e1e1e]">
        <button onClick={onClose} className="absolute bg-white rounded-full p-2 -top-4 -right-4 cursor-pointer" >
            <X size={24} className="text-gray-800"/>
        </button>
        <div>
          {children}
        </div>
      </div>

    </div>
  );
}
