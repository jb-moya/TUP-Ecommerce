import LogoFrame from "./LogoFrame";
import "./InfoFrame.css";
import React, { useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import InputField from "../InputField";
import "../StudentSignUpForm"


const InfoFrame = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [last_name, setLastName] = useState('');
  const [first_name, setFirstName] = useState('');
  
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [lastNameError, setLastNameError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [middleNameError, setMiddleNameError] = useState(null);

  const [contactError, setContactError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordConfirmError, setPasswordConfirmError] = useState(null);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };


  return (
    <form className="info-frame">
      <LogoFrame />
       <div className="input-frames-padding">
        <InputField 
          title="First Name"
          type="text"
          placeholder="Enter your first name"
          value=''
          onChange=''
          setError=''
         />
        <InputField 
          title="Last Name"
          type="text"
          placeholder="Enter your last name"
         />
         <InputField 
          title="Date of Birth"
          type="date"
          placeholder="Enter your date of birth"
         />
         <InputField 
          title="Email Address"
          type="email"
          placeholder="Enter your email address"
         />
         <InputField 
          title="Contact Number"
          type="text"
          placeholder="Enter your contact number"
         />
        <div className="confirm-account">
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
      <div className="passwordContainer">
        <FontAwesomeIcon
          icon={showConfirmPassword ? faEyeSlash : faEye}
          onClick={toggleConfirmPasswordVisibility}
          className="password-icon"
        />
        <span className="password-toggle-text" onClick={toggleConfirmPasswordVisibility}>
          {showConfirmPassword ? 'Hide' : 'Show'}
        </span>
      </div>
      <InputField 
          title="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password' }
          placeholder="Enter to confirm your password"
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
