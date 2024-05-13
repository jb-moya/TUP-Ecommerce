import React from "react";
import { NavBar } from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import HomeFrame from "../components/HomeFrame.js";

const Home = () => {
    return (
        <div>
            <NavBar />
            <HomeFrame />
            <Footer />
        </div>
    );
};

export default Home;