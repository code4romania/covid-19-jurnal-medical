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
    clearStale();
    const userLoaded = user => dispatch(userAc.setUser(user));
    const userUnloaded = () => dispatch(userAc.setUser());

    registerUserLoaded(userLoaded);
    registerUserUnloaded(userUnloaded);

    getUser().then(user => dispatch(userAc.setUser(user)));
    return () => {
      unregisterUserLoaded(userLoaded);
      unregisterUserUnloaded(userUnloaded);
    };
  }, [dispatch]);
};
