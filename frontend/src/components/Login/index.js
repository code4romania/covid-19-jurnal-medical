import React from "react";
import { NavLink } from "react-router-dom";
import { LoginForm } from "@code4ro/taskforce-fe-components";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";

import "./login.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="container">
        <NavLink to="/">
          <LogoSvg />
        </NavLink>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
