import React, { useEffect, useState } from "react";

import "./Account.scss";

import SidebarLayout from "../SidebarLayout";

import MyAccount from "./MyAccount";
import MemberAccount from "./MemberAccount";
import Tabs from "../Tabs/Tabs";
import BasePage from "../BasePage";
import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";
import ProfileApi from "../../api/profileApi";
import CreateProfile from "./CreateProfile";

export const Account = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    ProfileApi.get().then(setUserProfile);
  }, []);

  const tabs = [
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

  const getContent = () => {
    const loading = userProfile === null;
    if (loading) {
      return <div>Datele se incarca</div>;
    }

    const profileEmpty = userProfile.id === undefined;
    if (profileEmpty) {
      return <CreateProfile />;
    }

    return <Tabs tabs={tabs} />;
  };

  return (
    <BasePage>
      <Hero
        title="Ce pași ai de urmat"
        subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
        useFallbackIcon={true}
      />
      <StepsBar />
      <SidebarLayout>{getContent()}</SidebarLayout>
    </BasePage>
  );
};

export default Account;
