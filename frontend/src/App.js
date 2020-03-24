import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Route, Switch } from "react-router-dom";

import "./App.scss";
import { ROUTES } from "./routes";

const App = () => {
  const appRoutes = Object.values(ROUTES);

  return (
    <Provider store={store}>
      <Switch>
        {appRoutes.map(({ path, component, extraProps }) => (
          <Route path={path} component={component} key={path} {...extraProps} />
        ))}
      </Switch>
    </Provider>
  );
};

export default App;
