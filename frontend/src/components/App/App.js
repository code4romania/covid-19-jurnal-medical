import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import "./App.scss";
import { ROUTES } from "../../routes";
import { useAuth } from "../../hooks/auth";

const App = () => {
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
              method();
            }
            return <Redirect key={path} from={path} to="/account" />;
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
