import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/index";

const PrivateOutlate = () => {
  const { isLogin } = useAuth();

  return isLogin ? <Navigate to="/home" /> : <Outlet />;
};

export default PrivateOutlate;
