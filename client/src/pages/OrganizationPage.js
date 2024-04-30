import React from 'react'
import {NavBar, ColoredNavBar, ColoredNavBarUser} from "../components/NavBar.js";
import Footer from "../components/Footer";
import OrganizationFrame from '../components/OrganizationFrame.js';
import ColoredTMCLogo from "../Assets/LogoBlue.png";

const OrganizationPage = () => {

  const isLoggedIn = true;
  return (
      <div>
          {/* {isLoggedIn ? <ColoredNavBarUser /> : <ColoredNavBar />} */}
          {/* <ColoredNavBarUser /> */}
          <NavBar
              bgColor="bg-[#211C6A]"
              bgColorAnnouncement="bg-[#EFEFEF]"
              textColor="text-[#EFEFEF]"
              textColorAnnouncement="text-[#211C6A]"
              logo={ColoredTMCLogo}
          />
          <OrganizationFrame />
          <Footer />
      </div>
  );
}

export default OrganizationPage