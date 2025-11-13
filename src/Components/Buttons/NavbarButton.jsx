import React from 'react';
import { IoMdLogIn } from 'react-icons/io';
import { Link } from 'react-router';

const NavbarButton = () => {
  return (
    <Link 
      to="/login" 
      className="button flex items-center gap-2 cursor-pointer px-5 py-2.5 font-semibold text-white border-2 border-white rounded-full bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0px_20px_rgba(193,163,98,0.4)] relative overflow-hidden"
      style={{
        fontFamily: 'inherit',
        fontSize: '16px',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)'
      }}
    >
      <style>{`
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
          background-color: #575f43;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }
        
        .button:hover::before {
          scale: 3;
        }
        
        .button:active {
          scale: 1;
        }
      `}</style>
      <div>Login</div>
      <IoMdLogIn size={22} />
    </Link>
  );
}

export default NavbarButton;