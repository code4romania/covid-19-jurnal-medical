import React, { useEffect, useState } from "react";

import "./Account.scss";

import SidebarLayout from "../SidebarLayout";
import Tabs from "../Tabs/Tabs";

import MyAccount from "./MyAccount";
import MemberAccount from "./MemberAccount";
import CreateProfile from "./CreateProfile";

import ProfileApi from "../../api/profileApi";

const TABS = [
  {
    id: 0,
    title: "Profilul meu",
    content: <MyAccount />,
    url: "/account/me"
  },
  {
    id: 1,
    title: "Alte persoane",
    content: <MemberAccount />,
    url: "/account/other-members/:personId?",
    navUrl: "/account/other-members"
  }
];

export const Account = () => {
  const [userProfile, setUserProfile] = useState(null);

  const updateProfileFromServer = () => {
    ProfileApi.get().then(setUserProfile);
  };

  useEffect(() => updateProfileFromServer(), []);

  const getContent = () => {
    const loading = userProfile === null;
    if (loading) {
      return <div>Datele se incarca</div>;
    }

    const profileEmpty = userProfile.id === undefined;
    if (profileEmpty) {
      return <CreateProfile onFinish={updateProfileFromServer} />;
    }

    return <Tabs tabs={TABS} />;
  };

  return <SidebarLayout>{getContent()}</SidebarLayout>;
};

export default Account;
