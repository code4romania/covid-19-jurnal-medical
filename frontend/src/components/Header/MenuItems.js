import { NavLink } from "react-router-dom";
import React from "react";

const MenuItems = () => (
  <>
    <a
      href="https://cetrebuiesafac.ro"
      target="_blank"
      rel="noopener noreferrer"
    >
      Ce trebuie să fac
    </a>
    <a href="https://datelazi.ro" target="_blank" rel="noopener noreferrer">
      Date la zi
    </a>
    <a
      href="https://stirioficiale.ro"
      target="_blank"
      rel="noopener noreferrer"
    >
      Știri oficiale
    </a>
    <NavLink className="nav-link" to="/despre">
      Despre
    </NavLink>
  </>
);

export default MenuItems;
