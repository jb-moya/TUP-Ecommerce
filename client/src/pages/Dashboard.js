import React from 'react'
import { NavBar } from '../components/NavBar'
import Footer from '../components/Footer'
import { DashboardFrame } from '../components/DashboardFrame'
import ColoredTMCLogo from "../Assets/LogoBlue.png";

export const Dashboard = () => {
  return (
    <div>
        <NavBar
        bgColor="bg-[#211C6A]"
        bgColorAnnouncement="bg-[#EFEFEF]"
        ColorAnnouncementText="text-[#211C6A]"
        textColor="text-[#EFEFEF]"
        border = "border-b-[#EFEFEF]"
        logo={ColoredTMCLogo}/>
        <DashboardFrame />
        <Footer />

    </div>
  )
}
