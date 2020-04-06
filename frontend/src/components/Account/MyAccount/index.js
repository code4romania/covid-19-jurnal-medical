import React from "react";

import "./MyAccount.scss";
import ProfileDetails from "../common/ProfileDetails/ProfileDetails.js";
import SymptomsHistoryTable from "../common/SymptomsHistoryTable/SymptomsHistoryTable.js";
import { TemperatureChart } from "@code4ro/taskforce-fe-components";

import mockData from "../mockData/mockData";
import Table from "../common/Table/Table";

export const MyAccount = () => {
  const myData = Object.assign({}, mockData);
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
    <div className="account-container">
      <h1 className="account-header">Datele mele personale</h1>
      <ProfileDetails fields={myData["general-info"]} isSelf />
      <p className="account-text">
        Completează formularul zilnic de simptome care te ajută să menții un
        istoric al simptomelor sau al absenței acestora în perioada în care stai
        în izolare. Parcurge întrebările și răspunde cu atenție. Pe măsură ce
        completezi, această pagină se va popula cu istoricul răspunsurilor tale.
        Poți completa{" "}
        <a className="link" href="#">
          formularul aici
        </a>
        .
      </p>
      <h2 className="account-header">Istoric Simptome</h2>
      <div className="account-content">
        <TemperatureChart
          results={mockData.temperature}
          title="Monitorizare temperatura"
        />
      </div>
      <SymptomsHistoryTable
        symptomsData={mockData["simptome"]}
        headers={symptomsHeaders}
        title="Istoric"
      />
      <hr />
      <Table
        dataRows={mockData["alte simptome"]}
        headers={otherSymptomsHeaders}
        title="Alte Simptome"
      />
      <hr />
      <h2 className="account-header">Istoric deplasări </h2>
      <Table dataRows={mockData["deplasari"]} headers={outingsHeaders} />
    </div>
  );
};

export default MyAccount;
