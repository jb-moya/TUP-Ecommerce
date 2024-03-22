// import "./CSS/NavBar.css";
import React from "react";
import LinkRoute from "./LinkRoute.js";

//Images and Icons

import LogoBlueBg from "../Assets/LogoBlueBg.png";
import CartButton from "../Assets/CartButton.png";
import SearchButton from "../Assets/SearchButton.png";
import { useSelector } from "react-redux";

const NavBar = () => {
    const amount = useSelector((store) => store.cart.amount);

    console.log(useSelector((store) => store.cart.amount));

    return (
        <section className="navBarSection">
            <header className="navBarHeader">
                <div className="containerNavBar">
                    <div className="logoIcon">
                        <img
                            className="logo-icon"
                            loading="lazy"
                            alt=""
                            src={LogoBlueBg}
                        />
                        <h3 className="titleText">TUP Merch Co.</h3>
                    </div>

                    <div className="div">
                        <nav className="home-about-contact">
                            <b>
                                <LinkRoute
                                    to="/"
                                    text="Home"
                                    className="navBarItems"
                                />
                            </b>
                            <b>
                                <LinkRoute
                                    to="/"
                                    text="About"
                                    className="navBarItems"
                                />
                            </b>
                            <b>
                                <LinkRoute
                                    to="/"
                                    text="Contact"
                                    className="navBarItems"
                                />
                            </b>
                            <b>
                                <LinkRoute
                                    to="/"
                                    text="Shop Now!"
                                    className="navBarItems"
                                />
                            </b>
                        </nav>

                        <div className="IconHolder">
                            <LinkRoute
                                to="/cart"
                                // text="ff"
                                image={
                                    <img
                                        className="carticon"
                                        loading="lazy"
                                        alt=""
                                        src={CartButton}
                                    />
                                }
                            />

                            <img
                                className="searchicon"
                                loading="lazy"
                                alt=""
                                src={SearchButton}
                            />
                            <LinkRoute
                                to="/login"
                                text={<b className="login">Login</b>}
                                className="loginBtn"
                            ></LinkRoute>
                        </div>
                    </div>
                </div>
            </header>
        </section>

        /* <div className={'navBar'}>

<div className='LogoContainer'>  
    <img src={LogoBlueBg} alt="Logo" />
    <div className='title'>TUP Merch Co.</div>
</div>

<div className='container2'>
    <LinkRoute to="/" text="Home" />
    <LinkRoute to="" text="About" />
    <LinkRoute to="" text="Shop Now!" />
</div>

<div className='container3'>

<LinkRoute to="/signup" text="Sign Up" />
    <input
    type="text"
    id="searchInput"
    placeholder="Enter your search query"
    ></input>
    <LinkRoute to="/login" text="Log In" />
</div>





</div> */
    );
};

export default NavBar;
