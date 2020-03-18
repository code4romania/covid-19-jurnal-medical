import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/despre" component={About} />
    </Switch>
  );
}

export default App;
