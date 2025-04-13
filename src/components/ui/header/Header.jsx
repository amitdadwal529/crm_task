import { logout } from '@redux/slices/authSlice';
import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';

const Header = (props) => {
  const { broken, setToggled } = props
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
 const {myDetails} =  useSelector((state)=>state.auth)
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = ()=>{
    dispatch(logout());
  }

  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-5 py-4 flex justify-between items-center">
        <div>
          {broken && (
            <button className="sb-button" onClick={() => setToggled(prev => !prev)}>
              <RxHamburgerMenu />
            </button>
          )}
        </div>
        <div className="relative border border-transparent hover:border-1 hover:border-gray-300 hover:bg-orange-100 px-5 rounded-full">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-700 focus:outline-none"
          >
            <div>
              <p className="mr-2 font-semibold">Admin</p>
              <p className="mr-2 text-sm">{`${myDetails?.firstName} ${myDetails?.lastName}`}</p>
            </div>

            <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" className='w-10' />
          </button>

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-auto bg-white rounded-lg shadow-lg "
              onMouseLeave={closeDropdown}
            >
              <a
                href="#"
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={closeDropdown}
              >
                <div className='flex'>
                  <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" className='w-8 h-8 m-auto me-2' />
                  <div>
                    <p className="mr-2 font-semibold">Admin</p>
                    {/* <p className='text-sm '>a***@admin.com</p> */}
                  </div>

                </div>
              </a>
           
              <button
                type='button'
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={handleLogout}
              >
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
