import { logout } from '@redux/slices/authSlice';
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { CiLogout } from "react-icons/ci";

const Header = (props) => {
  const { broken, setToggled } = props; // Destructure props for responsiveness
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to control dropdown visibility
  const dispatch = useDispatch();
  const { myDetails } = useSelector((state) => state.auth); // Fetch user details from the Redux store

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when mouse leaves
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Handle user logout by dispatching the logout action
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-5 py-4 flex justify-between items-center">
        <div>
          {/* Hamburger menu button for mobile view */}
          {broken && (
            <button className="sb-button" onClick={() => setToggled((prev) => !prev)}>
              <RxHamburgerMenu />
            </button>
          )}
        </div>
        <div className="relative border border-blue-950 hover:border-1 hover:border-transparent hover:bg-blue-200 px-5 rounded-full py-1">
          {/* User profile button with dropdown */}
          <button onClick={toggleDropdown} className="flex items-center text-gray-700 focus:outline-none">
            <div>
              <p className="mr-2 font-semibold">Admin</p>
              <p className="mr-2 text-sm">{`${myDetails?.firstName} ${myDetails?.lastName}`}</p>
            </div>

            {/* User profile image */}
            <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" className='w-10' />
          </button>

          {/* Dropdown menu to show user details and logout option */}
          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-full bg-white rounded-xl shadow-2xl "
              onMouseLeave={closeDropdown}
            >
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                {/* User details in dropdown */}
                <div className='flex justify-start items-center me-auto'>
                  <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" className='w-8 h-8 me-2' />
                  <div>
                    <p className="font-semibold">Admin</p>
                    {/* Optionally, you can display email or other details here */}
                  </div>
                </div>
              </a>

              {/* Logout button */}
              <button
                type='button'
                className=" px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center w-full"
                onClick={handleLogout}
              >
                <CiLogout className='me-2'/>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
