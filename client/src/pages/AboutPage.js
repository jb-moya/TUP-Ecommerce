import React, { useEffect, useState } from "react";
import {NavBar} from "../components/NavBar.js";
import AboutPage from "../components/AboutPage.js";
import DevPage from "../components/DevPage.js"
import Footer from "../components/Footer.js";

const About = () => {
    return(
        <div>
            <NavBar />
            <AboutPage />
            <DevPage />
            <Footer />
        </div>
    )
}

export default About