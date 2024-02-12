import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectRouter from "./components/ProtectRouter";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Auth from "./routes/Auth";

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
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
