import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import { ROUTES } from "./routes";

const App = () => {
  const { base, oidc } = ROUTES;
  const baseRoutes = Object.values(base),
    oidcRoutes = Object.values(oidc);

  return (
    <Provider store={store}>
      <Switch>
        {[...oidcRoutes, ...baseRoutes].map(
          ({ path, component, extraProps }) => (
            <Route
              path={path}
              component={component}
              key={path}
              {...extraProps}
            />
          )
        )}
      </Switch>
    </Provider>
  );
};

export default App;
