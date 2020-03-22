import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";
import Footer from "../Footer";

const BasePage = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container main-content">
        <Hero
          title="Ce pași ai de urmat"
          subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
          useFallbackIcon={true}
        />
        <StepsBar />
        {children}
      </div>
      <Footer />
    </>
  );
};

BasePage.propTypes = {
  children: PropTypes.node.isRequired
};

export default BasePage;
