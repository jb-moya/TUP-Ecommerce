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
        textColor="text-[#EFEFEF]"
        bgColor1="bg-[#EFEFEF]"
        textColor1="text-[#211C6A]"
        logo={ColoredTMCLogo} />
        <DashboardFrame />
        <Footer />

    </div>
  )
}
