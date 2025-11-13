import React from 'react';

const FeaturedFoodButton = () => {
  return (
    <div 
      className="button cursor-pointer text-white bg-[#A47C59] border-none rounded-full font-bold px-6 py-3 whitespace-nowrap overflow-hidden transition-colors duration-300 relative inline-flex items-center gap-3"
      style={{
        lineHeight: 1,
        textDecoration: 'none',
        alignItems: 'center',
        gap: '0.75rem'
      }}
    >
      <style>{`
        .button__icon-wrapper {
          flex-shrink: 0;
          width: 25px;
          height: 25px;
          position: relative;
          color: #A47C59;
          background-color: #fff;
          border-radius: 50%;
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .button:hover {
          background-color: #575f43 !important;
        }

        .button:hover .button__icon-wrapper {
          color: #000 !important;
        }

        .button__icon-svg--copy {
          position: absolute;
          transform: translate(-150%, 150%);
        }

        .button:hover .button__icon-svg:first-child {
          transition: transform 0.3s ease-in-out;
          transform: translate(150%, -150%);
        }

        .button:hover .button__icon-svg--copy {
          transition: transform 0.3s ease-in-out 0.1s;
          transform: translate(0);
        }
      `}</style>
      
      <span className="button__icon-wrapper">
        <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="button__icon-svg" width={12}>
          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
        </svg>
        <svg viewBox="0 0 14 15" fill="none" width={12} xmlns="http://www.w3.org/2000/svg" className="button__icon-svg button__icon-svg--copy">
          <path d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z" fill="currentColor" />
        </svg>
      </span>
      See All
    </div>
  );
}

export default FeaturedFoodButton;