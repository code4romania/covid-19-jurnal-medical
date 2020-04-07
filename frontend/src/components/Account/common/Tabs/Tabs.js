import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Tab from "../Tab/Tab";
import "./Tabs.scss";

export const Tabs = ({ tabs, defaultTab }) => {
  const history = useHistory();
  const location = useLocation();
  // selected tab by default will be the first tab
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  useEffect(() => {
    const openedTab = tabs.find(
      tab => location.pathname.indexOf(tab.url) !== -1
    );
    if (openedTab) {
      setSelectedTab(openedTab.id);
    }
  }, []);
  useEffect(() => {
    return history.listen(location => {
      // when clicking back from the browser's back button the visible tab needs to be set again
      const locationTab = tabs.find(
        tab => location.pathname.indexOf(tab.url) !== -1
      );
      const locationTabId = locationTab ? locationTab.id : 0;
      setSelectedTab(locationTabId);
    });
  }, [history]);
  const handleTabClick = tab => {
    setSelectedTab(tab.id);
    if (tab.clickHandler) {
      tab.clickHandler();
    }
  };
  return (
    <>
      <div className="tabs">
        {tabs.map(tab => (
          <Tab
            url={tab.url}
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
      content: PropTypes.node.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  defaultTab: PropTypes.number
};

export default Tabs;
