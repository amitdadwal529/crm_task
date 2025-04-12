// src/pages/ErrorPage.jsx
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center p-4">
      <h1 className="text-3xl font-bold text-red-600">Oops!! something went wrong</h1>
      <p className="mt-2 text-gray-700">
        {error?.statusText || error?.message || "Unexpected error occurred."}
      </p>
    </div>
  );
};

export default Error;
