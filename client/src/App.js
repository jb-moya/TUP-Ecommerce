import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage.js";
import LogIn from "./pages/LogInPage.js";
import Home from "./pages/HomePage.js";
import About from "./pages/AboutPage.js";
import Cart from "./pages/CartPage.js";
import {
    CustomerAccountSettings,
    CustomerPasswordSettings,
    SellerAccountSettings,
} from "./pages/AccountSettings.js";
import SellerRegistration from "./pages/SellerRegistration.js";
import ProductDetail from "./pages/ProductDetailPage.js";
import Organization from "./pages/OrganizationPage.js";
import NotFound from "./pages/NotFoundPage.js";
import { UserPassword } from "./components/AccountDetails.js";
import { Dashboard } from "./pages/Dashboard.js";
import { SearchPage } from "./pages/SearchPage.js";
import { CheckOutPage } from "./pages/CheckOutPage.js";
import { fetchUser } from "./features/user/userSlice.js";
import {
    clearCart,
} from "./features/cart/cartSlice.js";
import { getAllItems, deleteItemFromDB, deleteCart } from "./features/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";

const rootUrl = "http://localhost:5000/api/v1";
function App() {
    const dispatch = useDispatch();
    const { isLogged, user } = useSelector((state) => state.user);

    console.log("ISLOGGED", isLogged);

    // var _lsTotal = 0,
    //     _xLen,
    //     _x;
    // for (_x in localStorage) {
    //     _xLen = ((localStorage[_x].length || 0) + (_x.length || 0)) * 2;
    //     _lsTotal += _xLen;
    //     console.log(
    //         _x.substr(0, 50) + " = " + (_xLen / 1024).toFixed(2) + " KB"
    //     );
    // }
    // console.log("Total = " + (_lsTotal / 1024).toFixed(2) + " KB");

    useEffect(() => {
        if (isLogged) {
            //  importatn
            // dispatch(clearCart());
            // dispatch(deleteCart());
            dispatch(getAllItems());
            // dispatch(deleteItemFromDB('6639c10f2e4fe96acf68e2b0'));
            // dispatch(fetchUser());
        } else {
        }
    }, [isLogged, dispatch, user]);

    // before accessing local stroage, check if the user is logged in

    // local stroage are only available if there is a user logged in

    // profile picture, persistent throughout the app
    // if user is logged in, display user's profile picture
    // upon closed, the profile picture is stored in the local storage
    // if user logs out, the profile picture is removed from the local storage
    // if user logs in, the profile picture is retrieved from the local storage
    // if user is not logged in, display default profile picture

    // const [modalShow, setModalShow] = React.useState(false);
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
    // 662f45a2754796a0ccf03c71
    return (
        <div className="box-border">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/product" element={<ProductDetail />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/customeraccount" element={<CustomerAccountSettings/>}/>
                    <Route path="/customeraccount=password" element={<CustomerPasswordSettings/>}/>
                    <Route path="/selleraccount" element={<SellerAccountSettings/>}/>
                    <Route path="/sellercenter" element={<SellerRegistration />}/>
                    <Route path="/search" element={<SearchPage />}/>
                    <Route path="/sellerdashboard" element={<Dashboard />}/>
                    <Route path="/checkout" element={<CheckOutPage />}/>
                    <Route path="/org" element={<Organization  />} />
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
