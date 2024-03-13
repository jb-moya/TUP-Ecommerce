import LogoFrame from "./LogoFrame";
import "./InfoFrame.css";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';


const InfoFrame = () => {
  
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  
  return (

    
    <form className="info-frame">
      <LogoFrame />
      <div className="input-frames">
        <b className="first-name">First Name</b>
        <input className="firstnameinput" type="text" placeholder="Enter your first name"/>
        <b className="last-name">Last Name</b>
        <input className="lastnameinput" type="text" placeholder="Enter your last name" />
        <b className="birthday">Birthday</b>
        <input className="bdayinput" type="date"/>
        <b className="email-address">Email Address</b>
        <input className="eminput" type="email" placeholder="Enter your email address"/>
        <div className="confirm-account">
        <div className="passwordContainer">
        <b className="password">Password</b>
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
          className="password-icon"
        />
        <span className="password-toggle-text" onClick={togglePasswordVisibility}>
          {showPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      <input
        className="pinput"
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your preferred password"
      />

      <div className="passwordContainer">
        <b className="password">Confirm Password</b>
        <FontAwesomeIcon
          icon={showConfirmPassword ? faEyeSlash : faEye}
          onClick={toggleConfirmPasswordVisibility}
          className="password-icon"
        />
        <span className="password-toggle-text" onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      <input
        className="cpinput"
        type={showConfirmPassword ? 'text' : 'password'}
        onChange={(e) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
        placeholder="Enter your preferred password"
      />
      
      </div>
          
      </div>

      <div className="footer-rectangle">
        <button className="sign-up-button">
          <b className="sign-up-now">Sign Up Now</b>
        </button>
        <button className="already-have-an">Already have an account?</button>
      </div>
    </form>
  );
};

export default InfoFrame;
