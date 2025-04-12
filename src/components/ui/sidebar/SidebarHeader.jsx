import styled from '@emotion/styled';
import React from 'react';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }
`;


export const SidebarHeader = ({setCollapsed, collapsed, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div className='flex justify-between items-center'>
        {!collapsed && <img src="https://www.freepnglogos.com/uploads/logo-chatgpt-png/black-chatgpt-logo-circle-symbol-black-png-0.png" className='w-14' />}
        <span onClick={() => setCollapsed(!collapsed)}>{collapsed ? <FaAnglesRight /> : <FaAnglesLeft />}</span>
      </div>
    </StyledSidebarHeader>
  );
};
