import React from 'react';
import { IoMdLogIn } from 'react-icons/io';
import styled from 'styled-components';

const NavbarButton = () => {
  return (
    <StyledWrapper>
      <button className="button flex items-center gap-2">
       <div>Login</div> 
       <IoMdLogIn size={22} />
      </button>
      
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    position: relative;
    padding: 5px 20px;
    font-size: 16px;
    color: white;
    border: 2px solid white;
    border-radius: 34px;
    background-color: transparent;
    font-weight: 600;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    overflow: hidden;
  }

  .button::before {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 50px;
    height: 50px;
    border-radius: inherit;
    scale: 0;
    z-index: -1;
    background-color:#575f43;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button:hover::before {
    scale: 3;
  }

  .button:hover {
    color: white;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98,0.4);
  }

  .button:active {
    scale: 1;
  }`;

export default NavbarButton;
