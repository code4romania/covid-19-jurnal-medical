import React from "react";
import {
  IncubatedBy,
  Footer,
  FooterLinkHeader,
  FooterLinks
} from "@code4ro/taskforce-fe-components";

import { FOOTER_LINKS } from "./const";

import FooterLink from "./FooterLink/";

import "./style.scss";

export const FooterComponent = () => (
  <div className="footer-section">
    <IncubatedBy />
    <Footer>
      <FooterLinks>
        <FooterLinkHeader>Link-uri utile</FooterLinkHeader>
        {FOOTER_LINKS.leftColumn.map(FooterLink)}
      </FooterLinks>
      <FooterLinks>
        <FooterLinkHeader>&nbsp;</FooterLinkHeader>
        {FOOTER_LINKS.rightColumn.map(FooterLink)}
      </FooterLinks>
    </Footer>
  </div>
);

export default FooterComponent;
