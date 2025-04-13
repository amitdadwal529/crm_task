import styled from '@emotion/styled';
import React from 'react';

// Styled component for the sidebar header
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

// SidebarHeader component that displays the title based on the collapsed state
export const SidebarHeader = ({ collapsed, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div className='flex justify-between items-center'>
        {/* Conditionally render the title based on the collapsed state */}
        {!collapsed && 
          <div>
            <p className='text-2xl font-bold text-blue-950'>CRM</p>
          </div>
        }
      </div>
    </StyledSidebarHeader>
  );
};
