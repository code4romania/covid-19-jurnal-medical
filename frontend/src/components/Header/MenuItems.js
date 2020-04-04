import { NavLink } from "react-router-dom";
import React from "react";

const MenuItems = () => (
  <>
    <NavLink className="nav-link" to="/despre">
      Despre
    </NavLink>
    <a
      href="https://code4.ro/ro/apps/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ecosistemul Covid-19
    </a>
    <a
      href="https://code4.ro/ro/doneaza/"
      target="_blank"
      rel="noopener noreferrer"
    >
      Sprijină proiectul
    </a>
  </>
);

export default MenuItems;
