import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { IoIosArrowBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Back = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className=" cursor-pointer flex items-center text-blue-900 hover:text-blue-600 transition duration-200 p-2 rounded-lg">
      <IoIosArrowBack  className='text-xl'/>
    </button>
  );
};

export default Back;

