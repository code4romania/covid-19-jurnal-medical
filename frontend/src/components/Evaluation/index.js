import React from "react";
import SidebarLayout from "../SidebarLayout";
import Tabs from "../Tabs/Tabs";
import SelfEvaluation from "./selfEvaluation";
import MemberEvaluation from "./MemberEvaluation";

const Evaluation = () => {
  const tabs = [
    {
      id: 0,
      title: "Formularul tău",
      content: <SelfEvaluation />,
      url: "/evaluation/me"
    },
    {
      id: 1,
      title: "Alte persoane",
      content: <MemberEvaluation />,
      url: "/evaluation/other-members/:personId?",
      navUrl: "/evaluation/other-members"
    }
  ];
  return (
    <SidebarLayout>
      <Tabs tabs={tabs} />
    </SidebarLayout>
  );
};

export default Evaluation;
