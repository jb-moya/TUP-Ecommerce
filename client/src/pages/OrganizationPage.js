import React from 'react'
import {ColoredNavBar} from "../components/NavBar.js";
import Footer from "../components/Footer";
import OrganizationFrame from '../components/OrganizationFrame.js';


const OrganizationPage = () => {
  return (
    <div>
    <ColoredNavBar />
    <OrganizationFrame />
    <Footer />
    </div>
  )
}

export default OrganizationPage