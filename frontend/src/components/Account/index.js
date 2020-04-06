import React from "react";

import "./Account.scss";

import SidebarLayout from "../SidebarLayout";

import MyAccount from "./MyAccount";
import MemberAccount from "./MemberAccount";

export const Account = () => {
  return (
    <SidebarLayout>
      <MyAccount />
      <MemberAccount />
    </SidebarLayout>
  );
};

export default Account;
