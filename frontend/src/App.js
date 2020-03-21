import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import About from "./components/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.scss";
import SigninRoute from "./components/OIDC/SigninRoute";
import PostLogoutRoute from "./components/OIDC/PostLogoutRoute";
import SilentRefreshRoute from "./components/OIDC/SilentRefreshRoute";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/despre" component={About} />
          <Route exact path="/signin-oidc" component={SigninRoute} />
          <Route exact path="/post-logout" component={PostLogoutRoute} />
          <Route exact path="/silent-refresh" component={SilentRefreshRoute} />
        </Switch>
      </div>
      <Footer></Footer>
    </Provider>
  );
}

export default App;
