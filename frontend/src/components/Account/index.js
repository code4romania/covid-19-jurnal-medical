import React, { useState } from "react";

import "./Account.scss";

import SidebarLayout from "../SidebarLayout";

import MyAccount from "./MyAccount";
import MemberAccount from "./MemberAccount";

export const Account = () => {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <SidebarLayout>
      <button onClick={() => setSelectedTab(1)}>Profilul meu</button>
      <button onClick={() => setSelectedTab(2)}>Alte persoane</button>
      {selectedTab === 1 && <MyAccount />}
      {selectedTab === 2 && <MemberAccount />}
    </SidebarLayout>
  );
};

export default Account;
