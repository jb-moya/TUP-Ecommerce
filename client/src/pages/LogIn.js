import React from 'react'
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"
import LoginForm from "../components/LoginComponents/LoginFrame"

import "./LoginSignUp.css"

// import LogInForm from '../components/StudentLogInForm.js'

const LogIn = () => {
  return (

  <div className="LoginSignUp">
  <NavBar />
  <LoginForm />
  <Footer />
  </div>

  );
};

export default LogIn;
