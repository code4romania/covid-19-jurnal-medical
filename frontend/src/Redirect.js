import React from "react";
import { Redirect } from "react-router-dom";
import { AuthService } from "./auth";

const RedirectOidc = () => {
  AuthService.signinCallback();
  return <Redirect to="/"></Redirect>;
};

export default RedirectOidc;
