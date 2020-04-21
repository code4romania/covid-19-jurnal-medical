import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { TemperatureChart } from "@code4ro/taskforce-fe-components";
import Table from "../Table/Table";

import ProfileDetails from "../ProfileDetails/ProfileDetails.js";
import SymptomsHistoryTable from "../SymptomsHistoryTable/SymptomsHistoryTable.js";
import ProfileOthers from "../ProfileOthers/ProfileOthers";

import EvaluationApi from "../../../../api/evaluationApi";

import { buildHistory } from "./ProfileHistoryBuilder";

import {
  SYMPTOMS_HEADERS,
  OTHER_SYMPTOMS_HEADERS,
  OUTINGS_HEADERS,
  DESCRIPTION_TEXT
} from "./ProfileHistory.constants";

import "./ProfileHistory.scss";

export const ProfileHistory = ({ data, family, isSelf }) => {
  const [history, setHistory] = useState(null);

  useEffect(() => {
    EvaluationApi.getEvaluationResults(data.id).then(res => {
      if (res && res.length > 0) {
        setHistory(buildHistory(res));
      }
    });
  }, []);

  return (
    <div className="profile-history-container">
      <ProfileDetails fields={data} isSelf={isSelf}>
        <ProfileOthers family={family} />
      </ProfileDetails>
      <p className="profile-history-text">
        {DESCRIPTION_TEXT}
        <Link
          to={
            isSelf ? "/evaluation/me" : `/evaluation/other-members/${data.id}`
          }
        >
          {" "}
          formularul aici
        </Link>
        .
      </p>
      {history && (
        <>
          <h2 className="header">Istoric Simptome</h2>
          <div className="profile-history-content">
            <TemperatureChart
              results={history.temperature}
              title="Monitorizare temperatura"
            />
          </div>
          <SymptomsHistoryTable
            symptomsData={history.symptoms}
            headers={SYMPTOMS_HEADERS}
            title="Istoric"
          />
          <hr />
          <Table
            dataRows={history.otherSymptoms}
            headers={OTHER_SYMPTOMS_HEADERS}
            title="Alte Simptome"
          />
          <hr />
          <h2 className="header">Istoric deplasări </h2>
          <Table dataRows={history.outings} headers={OUTINGS_HEADERS} />
        </>
      )}
    </div>
  );
};

ProfileHistory.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    profile: PropTypes.object,
    temperature: PropTypes.array,
    symptoms: PropTypes.array,
    otherSymptoms: PropTypes.array,
    outings: PropTypes.array
  }).isRequired,
  family: PropTypes.array,
  isSelf: PropTypes.bool
};

ProfileHistory.defaultProps = {
  isSelf: false,
  family: []
};

export default ProfileHistory;
