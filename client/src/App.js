import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage.js";
import LogIn from "./pages/LogInPage.js";
import Home from "./pages/HomePage.js";
import About from "./pages/AboutPage.js";
import Cart from "./pages/CartPage.js";
import {
    CustomerAccountSettings,
    SellerAccountSettings,
} from "./pages/AccountSettings.js";
import SellerRegistration from "./pages/SellerRegistration.js";
import ProductDetail from "./pages/ProductDetailPage.js";
import Organization from "./pages/OrganizationPage.js";
import NotFound from "./pages/NotFoundPage.js";
import { Dashboard } from "./pages/Dashboard.js";
import { SearchPage } from "./pages/SearchPage.js";
import { CheckOutPage } from "./pages/CheckOutPage.js";
import { getAllItems } from "./features/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const rootUrl = "http://localhost:5000/api/v1";
function App() {
    const dispatch = useDispatch();
    const { isLogged, user } = useSelector((state) => state.user);

    // console.log("ISLOGGED", isLogged);

    // var _lsTotal = 0,
    //     _xLen,
    //     _x;
    // for (_x in localStorage) {
    //     _xLen = ((localStorage[_x].length || 0) + (_x.length || 0)) * 2;
    //     _lsTotal += _xLen;
    //     // console.log(
    //         _x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB"
    //     );
    // }
    // // console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

    useEffect(() => {
        if (isLogged && user.role === "customer") {
            dispatch(getAllItems());
        } else {
        }
    }, [isLogged, dispatch, user]);

    return (
        <div className="box-border">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/product" element={<ProductDetail />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route
                        path="/customeraccount"
                        element={
                            <CustomerAccountSettings
                                section={"profileSettings"}
                            />
                        }
                    />
                    <Route
                        path="/customeraccount/password"
                        element={
                            <CustomerAccountSettings
                                section={"passwordSettings"}
                            />
                        }
                    />
                    <Route
                        path="/customeraccount/purchasehistory"
                        element={
                            <CustomerAccountSettings
                                section={"purchaseHistory"}
                            />
                        }
                    />
                    <Route
                        path="/selleraccount"
                        element={<SellerAccountSettings />}
                    />
                    <Route
                        path="/sellercenter"
                        element={<SellerRegistration />}
                    />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/sellerdashboard" element={<Dashboard />} />
                    <Route path="/checkout" element={<CheckOutPage />} />
                    <Route path="/org/:id" element={<Organization />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
export { rootUrl };
