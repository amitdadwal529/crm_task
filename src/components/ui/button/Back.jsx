import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Back = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button 
      onClick={handleBack} 
      className="flex items-center text-blue-900 hover:text-blue-600 transition duration-200 p-2 bg-gray-200 rounded-lg shadow-md">
      <FaArrowLeft className="mr-2" />
      Back
    </button>
  );
};

export default Back;

