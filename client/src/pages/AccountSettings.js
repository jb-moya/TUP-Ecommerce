import {NavBar, NavbarUser} from "../components/NavBar.js";
import Footer from "../components/Footer";
import { UserAccountDetails, UserPassword } from "../components/AccountDetails";
import {SellerSettings} from "../components/SellerSettings";

export const CustomerAccountSettings = () => {
  return (
    <div className="mt-28">
    <NavBar />
    <UserAccountDetails/>
    <Footer />
    </div>
  );
};

export const CustomerPasswordSettings = () => {
  return (
    <div className="mt-28">
    <NavBar />
    <UserPassword/>
    <Footer />
    </div>
  );
};

export const SellerAccountSettings = () => {
  return (
    <div className="mt-28">
    <NavBar />
    <SellerSettings />
    <Footer />
    </div>
  );
};