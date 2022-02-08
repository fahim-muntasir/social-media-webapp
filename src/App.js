import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./auth/index";
import Home from "./components/Home";
import Login from "./components/Login";
import LoginPagePrivateRoute from "./private/LoginPagePrivateRoute";
import PrivateOutlate from "./private/PrivateOutlate";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPagePrivateRoute />}>
            <Route path="" element={<Login />} />
          </Route>

          <Route path="/*" element={<PrivateOutlate />}>
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
