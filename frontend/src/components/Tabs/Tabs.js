import React from "react";
import PropTypes from "prop-types";
import { Redirect, Route, Switch } from "react-router-dom";
import Tab from "./Tab/Tab";
import "./Tabs.scss";

export const Tabs = ({ tabs, defaultTab }) => {
  return (
    <>
      <div className="tabs">
        {tabs.map(tab => (
          <Tab url={tab.navUrl || tab.url} key={tab.id} title={tab.title} />
        ))}
      </div>
      <Switch>
        {tabs.map(tab => (
          <Route path={tab.url} key={tab.id}>
            {tab.content}
          </Route>
        ))}
        {tabs.length && <Redirect to={tabs[defaultTab || 0].url} />}
      </Switch>
    </>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
      url: PropTypes.string.isRequired,
      navUrl: PropTypes.string
    })
  ).isRequired,
  defaultTab: PropTypes.number
};

export default Tabs;
