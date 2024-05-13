import React from "react";
import { NavBar } from "../components/NavBar";
import Footer from "../components/Footer";
import SellerSettings from "../components/SellerSettingsNew";

const SellerSettingsPage = () => {
    return (
        <div>
            <NavBar />
            <SellerSettings />
            <Footer />
        </div>
    );
};

export default SellerSettingsPage;
