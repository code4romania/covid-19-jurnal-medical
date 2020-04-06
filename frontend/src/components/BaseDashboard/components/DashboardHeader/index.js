import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as LogoSvg } from "../../../../assets/stamacasa.svg";
import "./DashboardHeader.scss";

const DashboardHeader = () => (
  <div className="dashboard-header">
    <header className="App-header container">
      <NavLink to="/">
        <LogoSvg />
      </NavLink>
      <input type={"text"} placeholder={"Cauta"} className={"searchInput"} />
      <div className="menu-items">
        <span>User</span>
      </div>
    </header>
  </div>
);

export default DashboardHeader;
