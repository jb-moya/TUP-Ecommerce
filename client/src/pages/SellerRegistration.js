import React from 'react'
import {NavBar, NavbarUser} from "../components/NavBar.js";
import Footer from "../components/Footer";
import { SellerRegistrationFrame, SellerRegistrationFrame1 } from '../components/SellerRegistrationFrame';
import ColoredTMCLogo from "../Assets/LogoBlue.png";


const SellerRegistration = () => {

  const isLoggedIn = true;
  
  return (
      <div>
          <NavBar
              bgColor="bg-[#211C6A]"
              textColor="text-[#EFEFEF]"
              logo={ColoredTMCLogo}
          />
          <SellerRegistrationFrame />
          <Footer />
      </div>
  );
}

export default SellerRegistration