import React from "react";
import { List, ListItem } from "@code4ro/taskforce-fe-components";
import { STEPS_CONFIG } from "./const";
import { useHistory, useLocation } from "react-router-dom";

const StepsBar = () => {
  const history = useHistory();
  const location = useLocation();

  return (
    <div className="steps-bar">
      <List columns={3}>
        {STEPS_CONFIG.map(({ label, URL }, index) => (
          <ListItem
            title={label}
            key={index}
            onClick={() => history.push(URL)}
            active={URL === location.pathname}
          />
        ))}
      </List>
    </div>
  );
};

export default StepsBar;
