import React from "react";

import Account from "./Account";

import { useSelector } from "react-redux";
import { sel as userSel } from "../../store/ducks/user";

const AccountWithAuth = () => {
  const isAuthenticated = useSelector(userSel.user);

  return isAuthenticated ? <Account isAuthenticated={isAuthenticated} /> : null;
};

export default AccountWithAuth;
