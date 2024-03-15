import NavBar from "../components/NavBar"
import InfoFrame from "../components/SignUpComponents/InfoFrame"
import Footer from "../components/Footer"
import "./LoginSignUp.css";

const SignUp = () => {
  return (
    <div className="LoginSignUp">
      <NavBar />
      <InfoFrame />
      <Footer />
    </div>
  );
};

export default SignUp;
