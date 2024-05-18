import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUpPage.js";
import LogIn from "./pages/LogInPage.js";
import Home from "./pages/HomePage.js";
import About from "./pages/AboutPage.js";
import Cart from "./pages/CartPage.js";
import {
    CustomerAccountSettings,
    AddProjectPage,
} from "./pages/AccountSettings.js";
import SellerRegistration from "./pages/SellerRegistration.js";
import ProductDetail from "./pages/ProductDetailPage.js";
import Organization from "./pages/OrganizationPage.js";
import NotFound from "./pages/NotFoundPage.js";
import NotAllowed from "./pages/NotAllowed.js";
import { Dashboard } from "./pages/Dashboard.js";
import { SearchPage } from "./pages/SearchPage.js";
import { CheckOutPage } from "./pages/CheckOutPage.js";
import { getAllItems } from "./features/cart/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import SellerSettings from "./components/SellerSettingsNew.js";
import SellerSettingsPage from "./pages/SellerSettingsPage.js";
import { getUserRole } from "./features/user/userSlice.js";
import Playground from "./pages/Playground.js";
import AdminMainPage from "./pages/AdminMainPage.js";
import { AiOutlineStop } from "react-icons/ai";
import { toast } from "react-toastify";
import "react-tooltip/dist/react-tooltip.css";
import {
    SellerReviewFormPage,
    ProductReviewFormPage,
} from "./pages/ReviewFormPage.js";
const rootUrl = "http://localhost:5000/api/v1";

function RestrictedRoute({ allowedRoles, allowGuest, children }) {
    const userRole = useSelector(getUserRole);
    // toast.info(`User Role: ${userRole}`);
    if (allowedRoles.includes(userRole) || allowGuest) {
        return <>{children}</>;
    } else {
        return <NotAllowed />;
    }
}

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

        if (user && user.status === "pending" && user.role === "seller") {
            console.log(`User is pending ${user.status} ${user.role} ${user._id}`);
            toast.warning("Warning, your account is currently pending! You cannot sell", {
                position: "bottom-right",
                hideProgressBar: false,
                autoClose: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }, [isLogged, dispatch, user]);

    return (
        <div className="box-border ">
            <BrowserRouter>
                <Routes>
                    <Route path="/not-allowed" element={<NotAllowed />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="playground" element={<Playground />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/org/:id" element={<Organization />} />
                    <Route path="/about" element={<About />} />
                    <Route path="*" element={<NotFound />} />

                    <Route
                        path="sellercenter"
                        element={<SellerRegistration />}
                    />
                    <Route
                        path="/cart"
                        element={
                            <RestrictedRoute allowedRoles={["customer"]}>
                                <Cart />
                            </RestrictedRoute>
                        }
                    />
                    <Route
                        path="/checkout"
                        element={
                            <RestrictedRoute allowedRoles={["customer"]}>
                                <CheckOutPage />
                            </RestrictedRoute>
                        }
                    />
                    <Route path="customer">
                        <Route
                            path=""
                            element={
                                <RestrictedRoute allowedRoles={["customer"]}>
                                    <CustomerAccountSettings
                                        section={"profileSettings"}
                                    />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="password"
                            element={
                                <RestrictedRoute allowedRoles={["customer"]}>
                                    <CustomerAccountSettings
                                        section={"passwordSettings"}
                                    />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="purchasehistory"
                            element={
                                <RestrictedRoute allowedRoles={["customer"]}>
                                    <CustomerAccountSettings
                                        section={"purchaseHistory"}
                                    />
                                </RestrictedRoute>
                            }
                        />
                    </Route>

                    <Route path="seller">
                        <Route
                            path="dashboard"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={0} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="accountsettings"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={1} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="orders"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={2} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="productsOverview"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={3} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="addeditProduct"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={4} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="addeditProduct/:id"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={4} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="advertisement"
                            element={
                                <RestrictedRoute allowedRoles={["seller"]}>
                                    <SellerSettings settingsMenu={5} />
                                </RestrictedRoute>
                            }
                        />
                    </Route>

                    <Route path="admin">
                        <Route
                            path="seller-review-form/:id"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <SellerReviewFormPage />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="product-review-form/:id"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <ProductReviewFormPage />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path=""
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <AdminMainPage settingsMenu={0} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="manageUsers"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <AdminMainPage settingsMenu={1} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="manageProducts"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <AdminMainPage settingsMenu={2} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="manageCategories"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <AdminMainPage settingsMenu={3} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="addProductViolation"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <AdminMainPage settingsMenu={4} />
                                </RestrictedRoute>
                            }
                        />
                        <Route
                            path="addProductViolation/:id"
                            element={
                                <RestrictedRoute allowedRoles={["admin"]}>
                                    <AdminMainPage settingsMenu={4} />
                                </RestrictedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
export { rootUrl };
