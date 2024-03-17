import "./App.css";
// import SignUpForm from "./components/StudentSignUpForm.js";
// import LogInForm from "./components/StudentLogInForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.js";
import LogIn from "./pages/LogIn.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import ProductDetail from "./pages/ProductDetail.js";
import NotFound from "./pages/NotFound.js";

import { Button } from "react-bootstrap";

const rootUrl = "http://localhost:5000/api/v1";
 

function App() {
    return (
        <div className="app" id="overriding-bootstrap-css">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/product" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <Button variant="primary">Primary</Button>{" "}
            <Button variant="secondary">Secondary</Button>{" "}
            <Button variant="success">Success</Button>{" "}
            <Button variant="warning">Warning</Button>{" "}
            <Button variant="danger">Danger</Button>{" "}
            <Button variant="info">Info</Button>{" "}
            <Button variant="light">Light</Button>{" "}
            <Button variant="dark">Dark</Button>
            <Button variant="link">Link</Button>
        </div>
    );
}

export default App;
export { rootUrl }