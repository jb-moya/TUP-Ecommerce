// Images and Icons

import BigLogo from "../../Assets/LogoWhiteBg.png";

const LogoFrame = () => {
    return (
        <div className="containerMain">
            <img className="biglogo-icon" loading="lazy" alt="" src={BigLogo} />
            <h3 className="messageTitle">LOGIN</h3>
            <div className="messageText">
                Hey, welcome back! Ready to score some awesome deals? Let's dive
                in and find the perfect ones for you!
            </div>
        </div>
    );
};

export default LogoFrame;
