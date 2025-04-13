import React from 'react';
import { IoIosArrowBack } from 'react-icons/io'; // Importing the back arrow icon
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation

const Back = () => {
  const navigate = useNavigate(); // Using useNavigate hook to programmatically navigate

  // Function to navigate one step back in the browser history
  const handleBack = () => {
    navigate(-1); // This will navigate the user to the previous page
  };

  return (
    <button
      onClick={handleBack} // Calls the handleBack function on click
      className="cursor-pointer flex items-center text-blue-900 hover:text-blue-600 transition duration-200 p-2 rounded-lg">
      {/* Render the back arrow icon with specific styling */}
      <IoIosArrowBack className='text-2xl' />
    </button>
  );
};

export default Back;
