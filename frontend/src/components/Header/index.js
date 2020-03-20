import React from "react";

import { ReactComponent as LogoSvg } from "../../assets/stamacasa.svg";
import { NavLink } from "react-router-dom";
import { Header as TFHeader } from "@code4ro/taskforce-fe-components";

const Header = () => {
  const Logo = () => (
    <NavLink to="/">
      <LogoSvg />
    </NavLink>
  );

  const MenuItems = () => (
    <>
      <NavLink to="/despre">Despre</NavLink>
      <NavLink to="https://code4.ro/ro/apps/">Ecosistemul Covid-19</NavLink>
      <NavLink to="https://code4.ro/ro/doneaza/">Sprijină proiectul</NavLink>
    </>
  );

  return <TFHeader Logo={<Logo />} MenuItems={<MenuItems />} />;
};

export default Header;
