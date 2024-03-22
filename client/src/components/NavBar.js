
import React from 'react'
import LinkRoute from "./LinkRoute.js";
import TMCBlueBGLogo from "../Assets/LogoBlueBg.png"
import { useNavigate } from 'react-router-dom';

//Icons

import { FaShoppingCart, FaSearch} from "react-icons/fa"

const NavBar = () => {

    const navigate = useNavigate();

    const handleClick = () => {
      // Navigate to the desired route
      navigate('/login');
    };

    return (
      // content wrapper
      <div className="fixed top-0 left-0 w-full bg-[#211C6A]">
          <div className="flex overflow-hidden max-w-[1240px] px-4 h-24 text-white justify-between items-center font-bold mx-auto text-nowrap">
              <div className='flex items-center select-none'>
                <img 
                className="w-20 h-20"
                src={TMCBlueBGLogo}
                alt="Logo Here"
                loading="lazy"
                /> 
                <h1 className="text-xl">TUP Merch Co.</h1>
              </div>

              <ul className='hidden md:flex text-based'>
                <li className="p-4"><LinkRoute to="/" text="Home"/></li>
                <li className="p-4" ><LinkRoute to="/" text="About" /></li>
                <li className="p-4"><LinkRoute to="/" text="Contact" /></li>
                <li className="p-4"><LinkRoute to="/" text="Shop Now!" /></li>
              </ul>

              <div className='flex p-2 items-center justify-between'> 
                
                      <div className='pr-4'> 
                      <FaShoppingCart size={28}/>
                      </div>
                      <div className='pr-6'>
                        <FaSearch  size={28}/>
                      </div>
                 
                  <button onClick={handleClick} className='bg-white hover:bg-[#EFEFEF] text-[#211C6A] font-bold py-3 px-5 rounded-2xl text-sm'  >
                     Login
                  </button>

              </div>
            
          </div>
      </div>

    );
};

export default NavBar;
