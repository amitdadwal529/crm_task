import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'; // Importing sidebar components
import { SidebarHeader } from '@components/ui/sidebar/SidebarHeader'; // Importing SidebarHeader component
import { PRIVATE_ROUTES } from '@routes/routes'; // Importing the routes configuration
import { MdDashboard } from "react-icons/md"; // Dashboard icon
import { BsBoxFill } from "react-icons/bs"; // Box icon for product management
import { Link, useLocation } from 'react-router-dom'; // For routing and accessing the current location
import { GoDotFill } from "react-icons/go"; // Icon for sub-menu items

export const CustomSidebar = (props) => {
  const { setBroken, toggled, setToggled } = props; // Props for controlling sidebar toggling and broken state
  const [collapsed, setCollapsed] = useState(false); // State to manage sidebar collapse
  const location = useLocation();  // Hook to get the current location (path) in the app

  // Menu items configuration
  const menuItems = [
    {
      label: 'Dashboard', // Main menu label
      icon: <MdDashboard className="text-blue-900 text-lg" />, // Dashboard icon
      path: PRIVATE_ROUTES.DASHBOARD, // Path for the dashboard page
      subMenu: [] // No sub-menu for this item
    },
    {
      label: 'Product Management', // Main menu label for product management
      icon: <BsBoxFill className="text-blue-900" />, // Icon for product management
      path: '', // No specific path for the main item
      subMenu: [ // Sub-menu items for product management
        { label: 'Products', path: PRIVATE_ROUTES.PRODUCTS }, // Sub-menu item for products page
        { label: 'Add Product', path: PRIVATE_ROUTES.ADD_PRODUCT }, // Sub-menu item for add product page
      ]
    },
  ];

  // Function to check if the current path is active
  const isActive = (path) => {
    return location.pathname.replace(/\/$/, '') === path.replace(/\/$/, '') ? '' : ''; // Compare paths, removing trailing slashes
  };

  // Function to check if any submenu under the current main menu is active
  const isSubMenuActive = (subMenu) => {
    return subMenu.some(item => location.pathname.replace(/\/$/, '') === item.path.replace(/\/$/, '')) ? '' : ''; // Check if any submenu path matches current location
  };

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Sidebar
        collapsed={collapsed} // Controlled collapsed state
        toggled={toggled} // Controlled toggled state
        onBackdropClick={() => setToggled(false)} // Close sidebar when clicking outside
        onBreakPoint={setBroken} // Callback for when sidebar switches to mobile mode
        breakPoint="md" // Sidebar breakpoint for mobile mode
        rootStyles={{
          color: '#607489', // Sidebar root styles
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Sidebar Header */}
          <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Menu
            menuItemStyles={{
              root: { fontSize: '13px', fontWeight: 400 }, // Root styles for menu items
              icon: { color: '#0098e5' }, // Icon color
              label: { fontWeight: 500 }, // Label font weight
            }}
          >
            {/* Map through menuItems to create menu options */}
            {menuItems.map((menuItem, index) => (
              // If no sub-menu, render as a single MenuItem
              menuItem.subMenu.length === 0 ? (
                <MenuItem key={index} className={isActive(menuItem.path)} component={<Link to={menuItem.path} />}>
                  <p className="flex items-center gap-3 ml-2 ">
                    {menuItem.icon} {menuItem.label}
                  </p>
                </MenuItem>
              ) : (
                // If sub-menu exists, render as a SubMenu
                <SubMenu
                  key={index}
                  label={menuItem.label}
                  icon={menuItem.icon}
                  className={isActive(menuItem.path) || isSubMenuActive(menuItem.subMenu)} // Add active class if this or any submenu is active
                >
                  {/* Map through subMenu items to create sub-menu options */}
                  {menuItem.subMenu.map((subMenuItem, subIndex) => (
                    <MenuItem key={`subMenu${subIndex}`} className={isActive(subMenuItem.path)} component={ <Link to={subMenuItem.path}/>}>
                      <p className="flex items-center gap-1">
                        <GoDotFill className="text-blue-900 mx-2" /> {subMenuItem.label}
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
