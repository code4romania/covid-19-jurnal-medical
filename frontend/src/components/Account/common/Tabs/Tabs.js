import React, { useState } from "react";
import PropTypes from "prop-types";
import Tab from "../Tab/Tab";
import "./Tabs.scss";

export const Tabs = ({ tabs, defaultTab }) => {
  // selected tab by default will be the first tab
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const handleTabClick = tab => {
    setSelectedTab(tab.id);
    if (tab.clickHandler && typeof tab.clickHandler === "function") {
      tab.clickHandler();
    }
  };
  return (
    <>
      <div className="tabs">
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            title={tab.title}
            clickHandler={() => handleTabClick(tab)}
            isActive={selectedTab === tab.id}
          />
        ))}
      </div>
      {tabs[selectedTab].content}
    </>
  );
};

Tabs.defaultProps = {
  defaultTab: 0
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      clickHandler: PropTypes.func,
      content: PropTypes.node.isRequired
    })
  ).isRequired,
  defaultTab: PropTypes.number
};

export default Tabs;
