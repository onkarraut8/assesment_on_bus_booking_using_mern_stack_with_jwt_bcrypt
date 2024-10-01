import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/HomePage";
import AdminPage from "../pages/AdminPage";
import Login from "../pages/UserLoginForm";
import Register from "../pages/AddUserForm";
import AdminRegister from "../pages/AddAdminForm";
import Header from "../pages/Header";




const Routers = () => {
  return (
   <>
    <Header/>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/register/admin" element={<AdminRegister />} />

    </Routes>
   </>
  );
};

export default Routers;
