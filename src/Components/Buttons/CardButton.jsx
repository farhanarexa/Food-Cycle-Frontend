// import React from 'react';
// import styled from 'styled-components';

// const CardButton = () => {
//   return (
//     <StyledWrapper>
//       <button>
//         <span>View Details</span>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height={34} width={34}>
//           <circle strokeWidth={3} stroke="white" r="35.5" cy={37} cx={37} />
//           <path fill="white" d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" />
//         </svg>
//       </button>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   button {
//     cursor: pointer;
//     font-weight: 700;
//     transition: all 0.2s;
//     padding: 10px 20px;
//     border-radius: 100px;
//     background: #A47C59;
//     border: 1px solid transparent;
//     display: flex;
//     align-items: center;
//     color: white;
//     font-size: 15px;
//   }

//   button:hover {
//     background: #A47C59;
//   }

//   button > svg {
//     width: 34px;
//     margin-left: 10px;
//     transition: transform 0.3s ease-in-out;
//   }

//   button:hover svg {
//     transform: translateX(5px);
//   }

//   button:active {
//     transform: scale(0.95);
//   }`;

// export default CardButton;


import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';

const CardButton = () => {
    return (
        <StyledWrapper>
            <button className="button flex items-center gap-2">
                <div className='font-bold'>View Details</div>
                <FaArrowRight size={22} />
            </button>

        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .button {
    cursor: pointer;
    position: relative;
    padding: 10px 20px;
    font-size: 16px;
    color: #A47C59;
    border: 2px solid #A47C59;
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
    background-color:#A47C59;
    transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
  }

  .button:hover::before {
    scale: 5;
  }

  .button:hover {
    color: white;
    scale: 1.1;
    box-shadow: 0 0px 20px rgba(193, 163, 98,0.4);
  }

  .button:active {
    scale: 1;
  }`;

export default CardButton;
