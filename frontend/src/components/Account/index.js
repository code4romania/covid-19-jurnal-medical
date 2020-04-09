import React from "react";

import "./Account.scss";

import SidebarLayout from "../SidebarLayout";

import MyAccount from "./MyAccount";
import MemberAccount from "./MemberAccount";
import Tabs from "./common/Tabs/Tabs";
import BasePage from "../BasePage";
import { Hero } from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";

export const Account = () => {
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
      url: "/account/other-members"
    }
  ];
  return (
    <BasePage>
      <Hero
        title="Ce pași ai de urmat"
        subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
        useFallbackIcon={true}
      />
      <StepsBar />
      <SidebarLayout>
        <Tabs tabs={tabs} />
      </SidebarLayout>
    </BasePage>
  );
};

export default Account;
