import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Footer from "./components/shared/Footer";

import "./App.scss";

function App() {
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/despre" component={About} />
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
