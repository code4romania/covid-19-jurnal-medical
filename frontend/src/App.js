import React from "react";

import AppRouter from "./components/AppRouter";

import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.scss";

const App = () => (
  <Provider store={store}>
    <Header />
    <div className="container">
      <StepsBar />
      <AppRouter />
    </div>
    <Footer />
  </Provider>
);

export default App;
