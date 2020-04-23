import {
  clearStale,
  getUser,
  registerUserLoaded,
  registerUserUnloaded,
  unregisterUserLoaded,
  unregisterUserUnloaded
} from "../api/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ac as userAc } from "../store/ducks/user";

export const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userAc.setUser({ user: null, pending: true }));

    const isLoggedIn = Object.keys(sessionStorage).find(key =>
      key.includes("oidc.user")
    );

    if (isLoggedIn) {
      getUser().then(user =>
        dispatch(userAc.setUser({ user, pending: false }))
      );
    } else {
      dispatch(userAc.setUser({ user: null, pending: false }));
    }
  }, [dispatch]);

  useEffect(() => {
    clearStale();
    const userLoaded = user =>
      dispatch(userAc.setUser({ user, pending: false }));
    const userUnloaded = () => dispatch(userAc.setUser({ user: null }));

    registerUserLoaded(userLoaded);
    registerUserUnloaded(userUnloaded);

    return () => {
      unregisterUserLoaded(userLoaded);
      unregisterUserUnloaded(userUnloaded);
    };
  }, [dispatch]);
};
