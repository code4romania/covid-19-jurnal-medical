import React from "react";
import { useLocation, useHistory } from "react-router-dom";

const HOME_PATH = {
  DEFAULT: "/",
  REDIRECT: "/account"
};

const useAuthHomeRedirect = isAuthenticated => {
  const location = useLocation();
  const history = useHistory();

  React.useEffect(() => {
    if (isAuthenticated && location.pathname === HOME_PATH.DEFAULT) {
      history.replace(HOME_PATH.REDIRECT);
    }
  }, [location]);
};

export default useAuthHomeRedirect;
