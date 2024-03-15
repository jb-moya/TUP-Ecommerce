import "../CSS/LogoFrame.css"


// Images and Icons

// import BigLogo from '../../Assets/LogoWhiteBg.png'
import BigLogo from '../../Assets/LogoWhiteBg.png'

const LogoFrame = () => {
  return (
    <div className="containerMain">
      <img
        className="biglogo-icon"
        loading="lazy"
        alt=""
        src={BigLogo}
      />
      <h3 className="messageTitle">Creating Your Account</h3>
      <div className="messageText">
        Welcome to our platform! Sign up now for exclusive deals and seamless
        shopping. Join us today!
      </div>
    </div>
  );
};

export default LogoFrame;
