import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";

const BasePage = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container main-content">{children}</div>
      <Footer />
    </>
  );
};

BasePage.propTypes = {
  children: PropTypes.node.isRequired
};

export default BasePage;
