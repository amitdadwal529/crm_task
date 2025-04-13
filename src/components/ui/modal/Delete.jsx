import React from "react";
import { FaTrash } from "react-icons/fa";

const Delete = ({ isOpen, title, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
       
        <div className="flex flex-col items-center text-center gap-3">
          <FaTrash className="w-16 h-16 p-3 bg-red-500 text-white rounded-lg" />
          <h2 className="font-semibold text-lg">Delete {title}?</h2>
          <p className="text-sm text-gray-600">
            This action cannot be undone. It will permanently remove the {title}.
          </p>
        </div>

      
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
