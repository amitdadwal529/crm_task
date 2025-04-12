import React, { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { SidebarHeader } from '@components/ui/sidebar/SidebarHeader';
import { FaTachometerAlt, FaBoxOpen } from 'react-icons/fa';

export const CustomSidebar = (props) => {
  const { setBroken, toggled, setToggled } = props;
  const [collapsed, setCollapsed] = useState(false);

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
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SidebarHeader collapsed={collapsed} setCollapsed={setCollapsed} />

          <Menu
            menuItemStyles={{
              root: { fontSize: '13px', fontWeight: 400 },
              icon: { color: '#0098e5' },
              label: { fontWeight: 500 },
            }}
          >
            <MenuItem icon={<FaTachometerAlt />}>Dashboard</MenuItem>
            <MenuItem icon={<FaBoxOpen />}>Product Management</MenuItem>
          </Menu>
        </div>
      </Sidebar>
    </div>
  );
};

