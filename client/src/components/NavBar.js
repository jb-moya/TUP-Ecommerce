import './NavBar.css'
import React from 'react'
import LinkRoute from "./LinkRoute.js";

//Images and Icons

import LogoBlueBg from "../Assets/LogoBlueBg.png"
import CartButton from "../Assets/CartButton.png"
import SearchButton from "../Assets/SearchButton.png"


const NavBar = () => {
    return (
        
      <section className="frame-sign-up">
      <header className="main-f-r-a-m-e">
        <div className="navbar" />
        <div className="header">
          <div className="company-text">
            <img
              className="logo-icon"
              loading="lazy"
              alt=""
              src={LogoBlueBg}
            />
            <h3 className="tup-merch-co">TUP Merch Co.</h3>
          </div>
          <div className="div">
            <nav className="home-about-contact">
              <b className="home1"><LinkRoute to="/" text="Home" /></b>
              <b className="about"><LinkRoute to="/" text="About" /></b>
              <b className="contact"><LinkRoute to="/" text="Contact" /></b>
              <b className="shop-now"><LinkRoute to="/" text="Shop Now!" /></b>
            </nav>
            <div className="max-altitude">
              <img
                className="carticon"
                loading="lazy"
                alt=""
                src={CartButton}
              />
              <img
                className="searchicon"
                loading="lazy"
                alt=""
                src={SearchButton}
              />
              <button className="difficulty">
                <b className="login">Login</b>
              </button>
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
