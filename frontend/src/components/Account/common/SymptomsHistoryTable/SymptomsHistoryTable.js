import React from "react";
import PropTypes from "prop-types";
import "./SymptomsHistoryTable.scss";
import { CompletedFormTable } from "@code4ro/taskforce-fe-components";

const SymptomsHistoryTable = ({ symptomsData, headers, title }) => {
  if (!symptomsData || !Object.keys(symptomsData).length) {
    return <div> Nu exista date</div>;
  }

  return (
    <div>
      <h2 className="account-header subheader">{title}</h2>
      <CompletedFormTable headers={headers} dataRows={symptomsData} />
    </div>
  );
};

SymptomsHistoryTable.propTypes = {
  symptomsData: PropTypes.array,
  headers: PropTypes.array,
  title: PropTypes.string.isRequired
};

export default SymptomsHistoryTable;
