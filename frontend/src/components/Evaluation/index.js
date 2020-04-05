import React from "react";
import PropTypes from "prop-types";
import SidebarLayout from "../SidebarLayout";
import TabTitle from "./tabTitle";
import { Hero } from "@code4ro/taskforce-fe-components";

const Evaluation = ({ children }) => {
  return (
    <SidebarLayout>
      <div className={"tabs is-centered"}>
        <ul>
          <TabTitle link={"/evaluation/self"}>
            <Hero title={"Formularul tau"} useFallbackIcon={true} />
          </TabTitle>
          <TabTitle link={"/evaluation/other"}>
            <Hero title={"Alte formulare"} useFallbackIcon={true} />
          </TabTitle>
        </ul>
      </div>
      {children}
    </SidebarLayout>
  );
};

export default Evaluation;

Evaluation.propTypes = {
  children: PropTypes.node.isRequired
};
