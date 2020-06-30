import { NavLink } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../assets/jurnalmedical.svg";
import React from "react";

const Logo = () => (
  <NavLink to="/">
    <LogoSvg />
  </NavLink>
);

export default Logo;
