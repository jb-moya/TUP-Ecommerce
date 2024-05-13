import { NavBar, NavbarUser } from "../components/NavBar.js";
import Footer from "../components/Footer";
import { UserAccountDetails } from "../components/AccountDetails";
// import { UserAccountDetails, UserPassword } from "../components/AccountDetails";
import { AddProductFrame } from "../components/AddProductFrame.js";

export const CustomerAccountSettings = ({ section }) => {
    return (
        <div className="mt-28">
            <NavBar />
            <UserAccountDetails section={section} />
            <Footer />
        </div>
    );
};

export const CustomerPasswordSettings = () => {
    return (
        <div className="mt-28">
            <NavBar />
            {/* <UserPassword /> */}
            <UserAccountDetails />
            <Footer />
        </div>
    );
};

export const AddProjectPage = () => {
    return (
        <div className="mt-28">
            <NavBar />
            <AddProductFrame />
            <Footer />
        </div>
    );
};
