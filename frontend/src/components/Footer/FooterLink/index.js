import React from "react";
import PropTypes from "prop-types";

import { FooterLinkItem } from "@code4ro/taskforce-fe-components";

const FooterLink = ({ URL, label, extraProps = {} }) => (
  <FooterLinkItem key={label}>
    <a href={URL} {...extraProps}>
      {label}
    </a>
  </FooterLinkItem>
);

FooterLink.propTypes = {
  URL: PropTypes.string,
  label: PropTypes.string,
  extraProps: {}
};

export default FooterLink;
