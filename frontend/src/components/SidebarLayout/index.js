import React from "react";
import PropTypes from "prop-types";
import {
  Instruments,
  InstrumentsItem,
  Hero
} from "@code4ro/taskforce-fe-components";
import { browserExtensions, instrumentsItems } from "./const";

const SidebarLayout = ({ children }) => {
  // Browser detection based on this answer:
  // https://stackoverflow.com/a/9851769/5723188
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  const isFirefox = typeof InstallTrigger !== "undefined";

  let installExtensionItem = null;
  if (isChrome) {
    installExtensionItem = <InstrumentsItem {...browserExtensions.chrome} />;
  } else if (isFirefox) {
    installExtensionItem = <InstrumentsItem {...browserExtensions.firefox} />;
  }

  return (
    <div className="columns">
      <div className="column is-8">{children}</div>
      <aside className="column is-4">
        <Instruments layout="column">
          <Hero useFallbackIcon title="Instrumente utile" />
          {installExtensionItem}
          {instrumentsItems.map((item, index) => (
            <InstrumentsItem key={index} {...item} />
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
