import React from "react";
import PropTypes from "prop-types";
import {
  Instruments,
  InstrumentsItem,
  Hero,
  SearchInput
} from "@code4ro/taskforce-fe-components";

const SidebarLayout = ({ children }) => {
  const instrumentsItems = [
    {
      color: "green",
      title: "Intaleaza-ti add-on-ul de depistat stiri false"
    },
    {
      color: "green",
      title: "Știri oficiale și informații la zi",
      content:
        "Lorem ipsum dolorit sit amet, consecteur adipiscing elit. Elit, duis pretium",
      ctaText: "Cele mai noi informații oficiale",
      ctaLink: "https://code4ro.ro"
    },
    {
      color: "red",
      title: "Vrei să ajuți? Intră aici",
      content:
        "Lorem ipsum dolorit sit amet, consecteur adipiscing elit. Elit, duis pretium",
      ctaText: "Centrul de sprijin",
      ctaLink: "https://code4ro.ro"
    },
    {
      color: "pink",
      title: "Date în timp real",
      content:
        "Lorem ipsum dolorit sit amet, consecteur adipiscing elit. Elit, duis pretium",
      ctaText: "Vezi situația curentă",
      ctaLink: "https://code4ro.ro"
    }
  ].map((item, index) => (
    <InstrumentsItem
      key={index}
      color={item.color}
      title={item.title}
      content={item.content}
      ctaText={item.ctaText}
      ctaLink={item.ctaLink}
    />
  ));

  return (
    <div className="columns">
      <div className="column is-8">{children}</div>
      <aside className="column is-4">
        <Instruments layout="column">
          <Hero useFallbackIcon="true" title="Instrumente utile" />
          <SearchInput placeholder="caută informații aici" />
          {instrumentsItems}
        </Instruments>
      </aside>
    </div>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node.isRequired
};

export default SidebarLayout;
