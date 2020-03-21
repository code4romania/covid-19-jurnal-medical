import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";

import "./App.scss";

const App = () => (
  <Switch>
    <Route path="/" component={Home} key="/" exact={true} />
    <Route path="/login" component={Login} key="/login" />
  </Switch>
);

export default App;
