import React from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";

import { List, ListItem } from "@code4ro/taskforce-fe-components";

import { STEPS_CONFIG } from "./const";

const StepsBar = ({ history, location: { pathname } }) => (
  <div className="steps-bar">
    <List columns={3}>
      {STEPS_CONFIG.map(({ label, URL }, index) => (
        <ListItem
          title={label}
          key={index}
          onClick={() => history.push(URL)}
          active={URL === pathname}
        />
      ))}
    </List>
  </div>
);

StepsBar.propTypes = {
  history: {
    push: () => {}
  },
  location: {
    pathname: PropTypes.string
  }
};

export default withRouter(StepsBar);
