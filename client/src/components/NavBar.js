import React from "react";
import LinkRoute from "./LinkRoute.js";

const NavBar = () => {
    return (
        <div className={`navbar`}>
            <LinkRoute to="/" text="Home" />
            <LinkRoute to="/signup" text="Sign Up" />
            <input
                type="text"
                id="searchInput"
                placeholder="Enter your search query"
            ></input>
            <LinkRoute to="/login" text="Log In" />
        </div>
    );
};

export default NavBar;
