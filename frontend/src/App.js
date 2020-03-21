import React from "react";

import AppRouter from "./components/AppRouter";

import Header from "./components/Header";
import StepsBar from "./components/StepsBar";
import Footer from "./components/Footer";

import "./App.scss";

const App = () => (
  <>
    <Header />
    <div className="container">
      <StepsBar />
      <AppRouter />
    </div>
    <Footer />
  </>
);

export default App;
