import React from "react";
import "./App.css";
import { Route, Switch, NavLink } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import { ReactComponent as LogoSvg } from "./assets/stamacasa.svg";

import { Header } from "@code4ro/taskforce-fe-components";

function App() {
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

  return (
    <>
      <Header Logo={<Logo />} MenuItems={<MenuItems />} />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/despre" component={About} />
        </Switch>
      </div>
    </>
  );
}

export default App;
