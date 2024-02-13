import { useReactiveVar } from "@apollo/client";
import React from "react";
import { isLoggedInVar } from "../apollo";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ProtectRouter = ({ children }: React.PropsWithChildren) => {
  const { pathname: from } = useLocation();
  const isLoggedIn = isLoggedInVar();
  if (!isLoggedIn) {
    return <Navigate to={"/auth"} state={{ from }} />;
  }
  return <div>{children}</div>;
};

export default ProtectRouter;
