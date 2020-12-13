import React from "react";
import PropTypes from "prop-types";
import {
  Instruments,
  InstrumentsItem,
  BannerImage,
  Hero
} from "@code4ro/taskforce-fe-components";
import { instrumentsItems } from "./const";
import rovaccinareImage from "../../images/rovaccinare.jpg";

const SidebarLayout = ({ children }) => {
  return (
    <div className="columns">
      <div className="column is-8">{children}</div>
      <aside className="column is-4">
        <Instruments layout="column">
          <Hero useFallbackIcon title="Instrumente utile" />
          <BannerImage
            link="https://vaccinare-covid.gov.ro/"
            image={{
              src: rovaccinareImage,
              alt: "#ROVACCINARE",
              title: "#ROVACCINARE"
            }}
          />
          {instrumentsItems.map((item, index) => (
            <InstrumentsItem
              key={index}
              color={item.color}
              title={item.title}
              content={item.content}
              ctaText={item.ctaText}
              ctaLink={item.ctaLink}
            />
          ))}
        </Instruments>
      </aside>
    </div>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SidebarLayout;
