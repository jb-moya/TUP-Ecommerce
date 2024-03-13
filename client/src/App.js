import "./App.css";
// import SignUpForm from "./components/StudentSignUpForm.js";
// import LogInForm from "./components/StudentLogInForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.js";
import LogIn from "./pages/LogIn.js";
import Home from "./pages/Home.js";
import ProductDetail from "./pages/ProductDetail.js";

function App() {    
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route
                        path="/product"
                        element={<ProductDetail />}
                    />
                </Routes>
            </BrowserRouter>

            
        </div>
    );
}

export default App;
