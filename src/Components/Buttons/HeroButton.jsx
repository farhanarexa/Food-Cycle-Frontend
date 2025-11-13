import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const HeroButton = () => {
  return (
    <div 
      className="button flex items-center gap-2 cursor-pointer px-6 py-3.75 font-semibold text-white border-2 border-white rounded-full bg-transparent transition-all duration-300 hover:scale-110 hover:shadow-[0_0px_20px_rgba(193,163,98,0.4)] relative overflow-hidden"
      style={{
        fontFamily: 'inherit',
        fontSize: '16px',
        padding: '15px 25px',
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
          scale: 5;
        }
        
        .button:hover {
          color: white !important;
          scale: 1.1;
        }
        
        .button:active {
          scale: 1;
        }
      `}</style>
      <div>View All Foods</div>
      <FaArrowRight size={22} />
    </div>
  );
}

export default HeroButton;