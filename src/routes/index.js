import React from "react";
import { Route, Routes } from "react-router-dom";
import BlankLayout from "../layouts/BlankLayout";
import MainLayout from "../layouts/MainLayout";
import PartnerLayout from "../layouts/PartnerLayout";
import CreateCamp from "../pages/CreateCamp";
import DetailCampPage from "../pages/DetailCampPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import PartnerAccount from "../pages/PartnerAccount";
// import PartnerLoginPage from "../pages/PartnerLoginPage";
// import PartnerRegisterPage from "../pages/PartnerRegisterPage";
import UserAccount from "../pages/UserAccount";
import UserLoginPage from "../pages/UserLoginPage";
import UserRegisterPage from "../pages/UserRegisterPage";
import AuthRequire from "./AuthRequire";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AuthRequire><MainLayout /></AuthRequire>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/detailCamp/:id" element={<DetailCampPage />} />
        <Route path="/user/:id" element={<UserAccount />} />
      </Route>
      <Route element={<BlankLayout />}>
        <Route path="/userLogin" element={<UserLoginPage />} />
        <Route path="/userRegister" element={<UserRegisterPage />} />
        {/* <Route path="/partnerLogin" element={<PartnerLoginPage />} />
        <Route path="/partnerRegister" element={<PartnerRegisterPage />} /> */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/partner/:id" element={<AuthRequire><PartnerLayout /></AuthRequire>}>
        <Route path="/partner/:id" element={<PartnerAccount />} />
        <Route path="create" element={<CreateCamp />} />
        <Route path="user" element={<CreateCamp />} />
        <Route path="camp" element={<CreateCamp />} />
      </Route>
    </Routes>
  );
}

export default Router;
