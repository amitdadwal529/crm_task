import React from "react";
import { twMerge } from "tailwind-merge";
import Error from "@components/ui/form/Error";

const Input = ({
  label,
  name,
  register,
  validation,
  type = "text",
  placeholder = "",
  errors,
  className = "",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}
        className={twMerge(
          "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
          errors?.[name] && "border-red-500",
          className
        )}
      />
      <Error error={errors?.[name]} />
    </div>
  );
};

export default Input;
