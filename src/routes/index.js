import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import PartnerLayout from "../layouts/PartnerLayout";
import DetailCampPage from "../pages/Customer/DetailCampPage";
import HomePage from "../pages/Customer/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PartnerAccount from "../pages/PartnerAccount";
import UserChangePassword from "../pages/UserChangePassword";
import UserLoginPage from "../pages/UserLoginPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import UserResetPassword from "../pages/UserResetPassword";
import AuthRequire from "./AuthRequire";
import CustomerProfile from "../pages/Customer/CustomerProfile";
import ConfirmBooking from "../pages/Authentication/ConfirmBooking";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/camp/:id" element={<DetailCampPage />} />
        <Route path="/user/:id" element={<AuthRequire><CustomerProfile /></AuthRequire>} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/userLogin" element={<UserLoginPage />} />
        <Route path="/userRegister" element={<UserRegisterPage />} />
        <Route path="/userReset" element={<UserResetPassword />} />
        <Route path="/userReset/:token" element={<UserChangePassword />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/confirmBooking/:token/" element={<ConfirmBooking/>}/>
      </Route>
      <Route path="/partner/:id" element={<AuthRequire><PartnerLayout /></AuthRequire>}>
        <Route path="/partner/:id" element={<PartnerAccount />} />
      </Route>
    </Routes>
  );
}

export default Router;
