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


export const SidebarHeader = ({ setCollapsed, collapsed, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div className='flex justify-between items-center'>
        {!collapsed &&
          <div>
            <p className='text-2xl font-bold text-blue-950'>CRM</p>
            <p className='text-xs text-blue-500'>Customer Relation Management</p>
          </div>
        }
        <span onClick={() => setCollapsed(!collapsed)}>{collapsed ? <FaAnglesRight /> : <FaAnglesLeft />}</span>
      </div>
    </StyledSidebarHeader>
  );
};
