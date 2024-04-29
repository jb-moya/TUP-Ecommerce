import React from 'react'
import {ColoredNavBar, ColoredNavBarUser} from "../components/NavBar.js";
import Footer from "../components/Footer";
import OrganizationFrame from '../components/OrganizationFrame.js';


const OrganizationPage = () => {

  const isLoggedIn = true;
  return (
    <div>
    {isLoggedIn ? <ColoredNavBarUser /> : <ColoredNavBar />}
    <OrganizationFrame />
    <Footer />
    </div>
  )
}

export default OrganizationPage