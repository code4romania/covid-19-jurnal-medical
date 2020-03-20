import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.scss";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/despre" component={About} />
        </Switch>
      </div>
      <Footer></Footer>
    </>

  );
}

export default App;
