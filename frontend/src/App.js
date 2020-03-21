import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";

import "./App.scss";
import RedirectOidc from "./Redirect";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/despre" component={About} />
          <Route exact path="/signin-oidc" component={RedirectOidc} />
        </Switch>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
