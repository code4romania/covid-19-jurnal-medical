import React from "react";
import { List, ListItem } from "@code4ro/taskforce-fe-components";
import { STEPS_CONFIG } from "./const";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const StepsBar = props => {
  const history = useHistory();
  const location = useLocation();

  const handleClick = URL => {
    if (props.isProfileComplete || URL === "/account") {
      history.push(URL);
    }
  };

  return (
    <div className="steps-bar">
      <List columns={3}>
        {STEPS_CONFIG.map(({ label, URL }, index) => (
          <ListItem
            title={label}
            key={index}
            onClick={() => handleClick(URL)}
            active={location.pathname.includes(URL)}
          />
        ))}
      </List>
    </div>
  );
};

StepsBar.propTypes = {
  isProfileComplete: PropTypes.bool
};

export default StepsBar;
