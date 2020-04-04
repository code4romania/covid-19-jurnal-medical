import React from "react";
import PropTypes from "prop-types";
import {
  Instruments,
  InstrumentsItem,
  Hero,
  SearchInput
} from "@code4ro/taskforce-fe-components";
import { instrumentsItems } from "./const";

const SidebarLayout = ({ children }) => {
  return (
    <div className="columns">
      <div className="column is-8">{children}</div>
      <aside className="column is-4">
        <Instruments layout="column">
          <Hero useFallbackIcon title="Instrumente utile" />
          <SearchInput placeholder="caută informații aici" />
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
