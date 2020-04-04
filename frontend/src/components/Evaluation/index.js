import React from "react";
import PropTypes from "prop-types";
import SidebarLayout from "../SidebarLayout";
import TabTitle from "./tabTitle";

const Evaluation = ({ children }) => {
  return (
    <SidebarLayout>
      <div className={"tabs is-large is-boxed"}>
        <ul>
          <TabTitle link={"/evaluation/self"}>Formularul tau</TabTitle>
          <TabTitle link={"/evaluation/other"}>Alte formulare</TabTitle>
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
