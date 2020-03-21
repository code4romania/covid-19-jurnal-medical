import React from "react";
import AppRouter from "../AppRouter";

import Header from "../Header";
import StepsBar from "../StepsBar";
import Footer from "../Footer";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <StepsBar />
        <AppRouter />
      </div>
      <Footer />
    </>
  );
};

export default Home;
