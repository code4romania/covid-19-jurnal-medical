import { NavLink } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import React from "react";

const Logo = () => (
  <NavLink to="/">
    <LogoSvg />
  </NavLink>
);

export default Logo;
