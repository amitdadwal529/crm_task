import React from "react";
import { useRouteError } from "react-router-dom"; // Importing the hook to get route errors

const Error = () => {
  const error = useRouteError(); // Fetch the current route error using the hook

  return (
    <div className="min-h-screen flex items-center justify-center flex-col text-center p-4">
      {/* Error message header */}
      <h1 className="text-3xl font-bold text-red-600">Oops!! something went wrong</h1>
      {/* Display the error message or fallback message */}
      <p className="mt-2 text-gray-700">
        {error?.statusText || error?.message || "Unexpected error occurred."}
      </p>
    </div>
  );
};

export default Error;
