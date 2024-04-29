import React from 'react'
import {NavBar, NavbarUser} from "../components/NavBar.js";
import Footer from "../components/Footer";
import { SellerRegistrationFrame, SellerRegistrationFrame1 } from '../components/SellerRegistrationFrame';


const SellerRegistration = () => {

  const isLoggedIn = true;
  
  return (
    <div>
        {isLoggedIn ? <NavbarUser /> : <NavBar />}
        <SellerRegistrationFrame />     
        <Footer />
    </div>
  )
}

export default SellerRegistration