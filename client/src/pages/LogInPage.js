import React from 'react'
import NavBar from "../components/NavBar"
import LoginForm from "../components/LogInForm"
import Footer from "../components/Footer";
//import LogInForm from '../components/StudentLogInForm.js'

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