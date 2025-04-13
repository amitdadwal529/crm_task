import React from "react";

const FormError = ({ error }) => {
  if (!error) return null;

  return (
    <p className="mt-2 text-sm text-red-600">
      {error.message || "Invalid input"}
    </p>
  );
};

export default FormError;
