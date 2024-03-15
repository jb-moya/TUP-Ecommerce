import "../CSS/LoginSignForm.css"
import LogoFrame from "./LogoFrame.js"
import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


import InputField from "../InputField";

const LoginFrame = () => {

  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className="info-frame">
      
      <LogoFrame />
      
      <div className="input-frames-padding">
        <InputField 
            title="Email Address"
            type="Email"
            placeholder="Enter your email address"
          />

        <div className="passwordContainer">
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
          className="password-icon"
        />
        <span className="password-toggle-text" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </span>
       </div>
       <InputField 
          title="Password"
          type={showPassword ? 'text' : 'password' }
          placeholder="Enter your preferred password"
         />
      </div>

      <div className="frame-container">
        <button className="login-container">
          <b className="login5">LOGIN</b>
        </button>
        <button className="create-an-account-wrapper">
          <b className="create-an-account">CREATE AN ACCOUNT</b>
        </button>
      </div>

      
    </form>
  );
};

export default LoginFrame;
