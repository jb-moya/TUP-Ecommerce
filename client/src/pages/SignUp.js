import NavBar from "../components/NavBar";
import InfoFrame from "../components/SignUpComponents/InfoFrame";
import "./SignUp.css";

const SignUp = () => {
  return (
    <div className="signup">
      <NavBar />
      <InfoFrame />
      <section className="footer" />
    </div>
  );
};

export default SignUp;
