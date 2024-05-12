import React from 'react'
import {NavBar} from "../components/NavBar.js";
import LoginForm from "../components/LogInForm"
import Footer from "../components/Footer";

const LogIn = () => {
  return (
    <div>
     <NavBar />
     <LoginForm />
     <Footer />
    </div>
  )
}

export default LogIn;