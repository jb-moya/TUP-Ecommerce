import "./App.css";
// import SignUpForm from "./components/StudentSignUpForm.js";
// import LogInForm from "./components/StudentLogInForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.js";
import LogIn from "./pages/LogIn.js";
import Home from "./pages/Home.js";
import ProductDetail from "./pages/ProductDetail.js";

import { Button, ThemeProvider } from "react-bootstrap";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/product" element={<ProductDetail />} />
                </Routes>
            </BrowserRouter>
            {/* https://react-bootstrap.netlify.app/docs/getting-started/theming */}
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
