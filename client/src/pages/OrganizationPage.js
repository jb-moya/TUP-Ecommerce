import React from 'react'
import {NavBar} from "../components/NavBar.js";
import Footer from "../components/Footer";
import OrganizationFrame from '../components/OrganizationFrame.js';
import ColoredTMCLogo from "../Assets/LogoBlue.png";

const OrganizationPage = () => {

  const isLoggedIn = true;
  return (
      <div>
          <NavBar
              bgColor="bg-[#211C6A]"
              bgColorAnnouncement="bg-[#EFEFEF]"
              ColorAnnouncementText="text-[#211C6A]"
              textColor="text-[#EFEFEF]"
              border = "border-b-[#EFEFEF]"
              logo={ColoredTMCLogo}
          />
          <OrganizationFrame />
          <Footer />
      </div>
  );
}

export default OrganizationPage