import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRouter from "./components/ProtectRouter";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Auth from "./routes/Signup";
import Signup from "./routes/Signup";
import Login from "./routes/Login";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectRouter>
            <Home />
          </ProtectRouter>
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
