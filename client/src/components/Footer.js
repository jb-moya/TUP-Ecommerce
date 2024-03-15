import "./CSS/Footer.css"

// Icons

import emailIcon from "../Assets/EmailIcon.png"
import fbIcon from "../Assets/FacebookIcon.png"
import instaIcon from "../Assets/InstagramIcon.png"


const Footer = () => {
  return (
    <footer className="footerContainer">
     <div className="footerItemsContainer" /> 
     <div className="itemsContainer">
     <div className="containerItemsRight">
          <div className="textContainer">
            <h1 className="represent-your">REPRESENT YOUR</h1>
            <h1 className="school-organization">SCHOOL ORGANIZATION</h1>
            <h1 className="in-style">
              <span>{`IN `}</span>
              <span className="style">STYLE</span>
              <span>!</span>
            </h1>
          </div>
          <div className="emailContainer">
            <img
              className="emailIcon"
              loading="lazy"
              alt=""
              src={emailIcon}
            />
            <div className="tupmerchco">@tupmerchco.</div>
          </div>
        </div>


        <div className="containerItemsLeft">
        <div className="rightIconContainer">
            <img
              className="facebookicon"
              loading="lazy"
              alt=""
              src={fbIcon}
            />
            <img
              className="instagramicon"
              loading="lazy"
              alt=""
              src={instaIcon}
            />
          </div>
          <div className="privacy-termContainer">
            <div className="privacy-policy">Privacy Policy</div>
            <div className="terms-conditions">{`Terms & Conditions`}</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
