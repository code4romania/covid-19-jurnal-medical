import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";

import "./App.scss";
import { ROUTES } from "../../routes";
import { useAuth } from "../../hooks/auth";

const App = () => {
  const history = useHistory();
  useAuth();
  const { base, oidc } = ROUTES;
  const baseRoutes = Object.values(base);
  const oidcRoutes = Object.values(oidc);

  return (
    <Switch>
      {oidcRoutes.map(({ path, method }) => (
        <Route
          key={path}
          exact
          path={path}
          render={() => {
            if (method) {
              method(uri => {
                history.push(uri);
              });
            }
          }}
        />
      ))}
      {baseRoutes.map(({ path, component, extraProps }) => (
        <Route path={path} component={component} key={path} {...extraProps} />
      ))}
    </Switch>
  );
};

export default App;
