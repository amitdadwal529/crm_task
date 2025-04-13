import styled from '@emotion/styled';
import React from 'react';

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


export const SidebarHeader = ({ collapsed, ...rest }) => {
  return (
    <StyledSidebarHeader {...rest}>
      <div className='flex justify-between items-center'>
        {!collapsed &&
          <div>
            <p className='text-2xl font-bold text-blue-950'>CRM</p>
          </div>
        }
      </div>
    </StyledSidebarHeader>
  );
};
