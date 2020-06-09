import React from "react";
import PropTypes from "prop-types";

import Header from "../Header";
import Footer from "../Footer";

import CookieConsent from "react-cookie-consent";

const BasePage = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container main-content">{children}</div>
      <Footer />
      <CookieConsent buttonText="Am înțeles" acceptOnScroll={true}>
        Acest site folosește cookie-uri. Prin continuarea navigării vă exprimați
        acordul pentru folosirea cookie-urilor, conform Regulamentului (UE)
        2016/679.
      </CookieConsent>
    </>
  );
};

BasePage.propTypes = {
  children: PropTypes.node.isRequired
};

export default BasePage;
