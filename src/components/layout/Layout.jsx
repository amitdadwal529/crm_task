import Header from '@components/ui/header/Header';
import { CustomSidebar } from '@components/ui/sidebar/CustomSidebar';
import React, { useState } from 'react'
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [broken, setBroken] = useState(true);
  const [toggled, setToggled] = useState(false);
  return (
    <>
      <div className='flex'>
        <CustomSidebar setBroken={setBroken} toggled={toggled} setToggled={setToggled}/>

        <div className='w-full '>
          <Header broken={broken} setToggled={setToggled} />
          <div className="p-6 bg-gray-100 min-h-screen">

        <Outlet />
        </div>
        </div>

      </div>
    </>
  )
}

export default Layout
