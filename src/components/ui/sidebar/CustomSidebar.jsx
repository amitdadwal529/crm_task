import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { SidebarHeader } from '@components/ui/sidebar/SidebarHeader';
import { FaTachometerAlt, FaBoxOpen } from 'react-icons/fa';
import { PRIVATE_ROUTES } from '@routes/routes';
import { MdDashboard } from "react-icons/md";
import { BsBoxFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { GoDotFill } from "react-icons/go";

export const CustomSidebar = (props) => {
  const { setBroken, toggled, setToggled } = props;
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      label: 'Dashboard',
      icon: <MdDashboard className="text-blue-900  text-lg" />,
      path: PRIVATE_ROUTES.DASHBOARD,
      subMenu: []
    },
   
    {
      label: 'Product Management',
      icon: <BsBoxFill className="text-blue-900" />,
      path: '',
      subMenu: [
        { label: 'Products', path: PRIVATE_ROUTES.PRODUCTS},
        { label: 'Add Product', path: PRIVATE_ROUTES.ADD_PRODUCT },
      ]
    },

  ];

  const isActive = (path) => location.pathname === path ? 'bg-gray-200' : ''; // Tailwind active color
 
  
   // Function to check if any submenu under the current main menu is active
   const isSubMenuActive = (subMenu) => {
    return subMenu.some(item => location.pathname === item.path) ? 'bg-gray-200' : '';
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        backgroundColor="#ffffff"
        rootStyles={{
          color: '#607489',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', }}>
          <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Menu
            menuItemStyles={{
              root: { fontSize: '13px', fontWeight: 400 },
              icon: { color: '#0098e5' },
              label: { fontWeight: 500 },
            }}
          >
           {menuItems.map((menuItem, index) => (
      menuItem.subMenu.length === 0 ? (
        
          <MenuItem key={index} className={isActive(menuItem.path)} component={<Link to={menuItem.path} />}>
            <p className="flex items-center gap-3 ml-2 ">
              {menuItem.icon} {menuItem.label}
            </p>
          </MenuItem>
       
      ) : (
        <SubMenu
          key={index}
          label={menuItem.label}
          icon={menuItem.icon}
          className={isActive(menuItem.path) || isSubMenuActive(menuItem.subMenu)}
        >
          {menuItem.subMenu.map((subMenuItem, subIndex) => (
           
              <MenuItem key={`subMenu${subIndex}`} className={isActive(subMenuItem.path)} component={ <Link to={subMenuItem.path}/>}>
                <p className="flex items-center gap-1">
                  <GoDotFill className="text-red-500 mx-2" /> {subMenuItem.label}
                </p>
              </MenuItem>
          ))}
        </SubMenu>
      )
    ))}
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

