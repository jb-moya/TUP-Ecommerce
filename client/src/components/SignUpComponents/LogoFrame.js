import "./LogoFrame.css";


// Images and Icons

import BigLogo from '../../Assets/Logo.png'

const LogoFrame = () => {
  return (
    <div className="first-name-last-name-frames">
      <img
        className="biglogo-icon"
        loading="lazy"
        alt=""
        src={BigLogo}
      />
      <h3 className="creating-your-account">Creating Your Account</h3>
      <div className="welcome-to-our">
        Welcome to our platform! Sign up now for exclusive deals and seamless
        shopping. Join us today!
      </div>
    </div>
  );
};

export default LogoFrame;
