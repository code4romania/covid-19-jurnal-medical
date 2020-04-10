import React from "react";
import PropTypes from "prop-types";
import "./ProfileHistory.scss";
import ProfileDetails from "../ProfileDetails/ProfileDetails.js";
import SymptomsHistoryTable from "../SymptomsHistoryTable/SymptomsHistoryTable.js";
import { TemperatureChart } from "@code4ro/taskforce-fe-components";

import Table from "../Table/Table";
import { Link } from "react-router-dom";

export const ProfileHistory = ({ data, isSelf }) => {
  const symptomsHeaders = [
    "Data/Ora",
    "Durere in gat si/sau dificultate in a inghiti?",
    "Tuse intensa?",
    "Dificultate in a respira?",
    "Îți curge nasul?"
  ];
  const otherSymptomsHeaders = ["Data/ora", "Simptome semnalate"];
  const outingsHeaders = [
    "Data/Ora",
    "Motivul deplasării",
    "Ora plecării",
    "Ora sosirii",
    "Contact cu pacient"
  ];

  return (
    <div className="profile-history-container">
      <ProfileDetails fields={data.profile} isSelf={isSelf} />
      <p className="profile-history-text">
        Completează formularul zilnic de simptome care te ajută să menții un
        istoric al simptomelor sau al absenței acestora în perioada în care stai
        în izolare. Parcurge întrebările și răspunde cu atenție. Pe măsură ce
        completezi, această pagină se va popula cu istoricul răspunsurilor tale.
        Poți completa
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
      <h2 className="header">Istoric Simptome</h2>
      <div className="profile-history-content">
        <TemperatureChart
          results={data.temperature}
          title="Monitorizare temperatura"
        />
      </div>
      <SymptomsHistoryTable
        symptomsData={data.symptoms}
        headers={symptomsHeaders}
        title="Istoric"
      />
      <hr />
      <Table
        dataRows={data.otherSymptoms}
        headers={otherSymptomsHeaders}
        title="Alte Simptome"
      />
      <hr />
      <h2 className="header">Istoric deplasări </h2>
      <Table dataRows={data.outings} headers={outingsHeaders} />
    </div>
  );
};

ProfileHistory.defaultProps = {
  isSelf: false
};

ProfileHistory.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    profile: PropTypes.object,
    temperature: PropTypes.array,
    symptoms: PropTypes.array,
    otherSymptoms: PropTypes.array,
    outings: PropTypes.array
  }).isRequired,
  isSelf: PropTypes.bool
};

export default ProfileHistory;
