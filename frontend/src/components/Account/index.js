import React from "react";

import "./Account.scss";

import SidebarLayout from "../SidebarLayout";

import MyAccount from "./MyAccount";
import MemberAccount from "./MemberAccount";
import Tabs from "./common/Tabs/Tabs";

export const Account = () => {
  const tabs = [
    {
      id: 0,
      title: "Profilul meu",
      content: <MyAccount />
    },
    {
      id: 1,
      title: "Alte persoane",
      content: <MemberAccount />
    }
  ];
  return (
    <SidebarLayout>
      <Tabs tabs={tabs} />
    </SidebarLayout>
  );
};

export default Account;
