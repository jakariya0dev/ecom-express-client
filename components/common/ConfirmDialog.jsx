"use client";

export default function ConfirmDialog({
  open,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
  loading,
}) {

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>

        <p className="mt-2 text-sm text-gray-600">{message}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-md text-gray-800 bg-gray-200 px-4 py-2 text-sm hover:bg-gray-300 transition-all duration-300 ease-in-out cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
