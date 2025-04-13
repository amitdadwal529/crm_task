import React from "react";
import { twMerge } from "tailwind-merge";
import Error from "@components/ui/form/Error"; // Importing Error component for validation feedback

const Input = ({
  label,
  name,
  register,
  validation,
  type = "text", // Default input type is 'text'
  placeholder = "",
  errors, // For displaying errors
  className = "", // Custom class for additional styling
}) => {
  return (
    <div className="mb-4">
      {/* Conditionally rendering label if it's passed as a prop */}
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type} // Input field type (e.g., text, password, email)
        placeholder={placeholder} // Placeholder text for the input field
        {...register(name, validation)} // Registering the input field with validation rules
        className={twMerge(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500", // Base styling for the input
          errors?.[name] && "border-red-500", // Highlight input border in red if there are errors
          className // Allow additional custom styling through className
        )}
      />
      {/* Displaying error message if there are validation errors for the input field */}
      <Error error={errors?.[name]} />
    </div>
  );
};

export default Input;
