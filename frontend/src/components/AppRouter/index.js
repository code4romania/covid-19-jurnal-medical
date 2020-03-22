import React from "react";
import { Route, Switch } from "react-router-dom";

import { ROUTES } from "./const";

const AppRouter = () => {
  const appRoutes = Object.values(ROUTES);

  return (
    <Switch>
      {appRoutes.map(({ path, component, extraProps }) => (
        <Route
          exact
          path={path}
          component={component}
          key={path}
          {...extraProps}
        />
      ))}
    </Switch>
  );
};

export default AppRouter;
