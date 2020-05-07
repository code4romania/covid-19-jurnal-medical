import React, { useState, useEffect } from "react";
import ChevronImageLeft from "./../../../../images/chevrons-left.svg";
import ChevronImageRight from "./../../../../images/chevrons-right.svg";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TemperatureChart } from "@code4ro/taskforce-fe-components";
import Table from "../Table/Table";
import ProfileDetails from "../ProfileDetails/ProfileDetails.js";
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

const PAGE_SIZE = 10;

const hasPrev = page => page > 0;
const hasNext = (page, count) => page + 1 < Math.ceil(count / PAGE_SIZE);

export const ProfileHistory = ({ data, family, isSelf }) => {
  const [history, setHistory] = useState(null);
  const [symptomsPage, setSymptomsPage] = useState(0);
  const [otherSymptomsPage, setOtherSymptoms] = useState(0);
  const [outingsPage, setOutings] = useState(0);

  useEffect(() => {
    EvaluationApi.getEvaluationResults(data.id).then(res => {
      setHistory(res && res.length > 0 ? buildHistory(res) : null);
    });
  }, [data]);

  return (
    <div className="profile-history-container">
      <ProfileDetails fields={data} isSelf={isSelf}>
        <ProfileOthers family={family} />
      </ProfileDetails>
      <p className="profile-history-text">
        {DESCRIPTION_TEXT}
        <Link
          to={
            isSelf
              ? "/evaluation/me"
              : {
                  pathname: "/evaluation/other-members",
                  state: { id: data.id }
                }
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
              results={history.temperature.slice(
                symptomsPage * PAGE_SIZE,
                PAGE_SIZE * (symptomsPage + 1)
              )}
              title="Monitorizare temperatura"
            />
          </div>
          <Table
            dataRows={history.symptoms.slice(
              symptomsPage * PAGE_SIZE,
              PAGE_SIZE * (symptomsPage + 1)
            )}
            headers={SYMPTOMS_HEADERS}
            title="Istoric"
          />
          <div className="navigation">
            {hasPrev(symptomsPage) && (
              <div
                className="button"
                onClick={() => setSymptomsPage(symptomsPage - 1)}
              >
                <img
                  src={ChevronImageLeft}
                  className="navigation-chevron"
                  alt="Pagina anterioară"
                />
              </div>
            )}
            {hasNext(symptomsPage, history.symptoms.length) && (
              <div
                className="button right"
                onClick={() => setSymptomsPage(symptomsPage + 1)}
              >
                <img
                  src={ChevronImageRight}
                  className="navigation-chevron"
                  alt="Pagina următoare"
                />
              </div>
            )}
          </div>
          <hr />
          <Table
            dataRows={history.otherSymptoms.slice(
              otherSymptomsPage * PAGE_SIZE,
              PAGE_SIZE * (otherSymptomsPage + 1)
            )}
            headers={OTHER_SYMPTOMS_HEADERS}
            title="Alte Simptome"
          />
          <div className="navigation">
            {hasPrev(otherSymptomsPage) && (
              <div
                className="button"
                onClick={() => setOtherSymptoms(otherSymptomsPage - 1)}
              >
                <img
                  src={ChevronImageLeft}
                  className="navigation-chevron"
                  alt="Pagina anterioară"
                />
              </div>
            )}
            {hasNext(otherSymptomsPage, history.otherSymptoms.length) && (
              <div
                className="button right"
                onClick={() => setOtherSymptoms(otherSymptomsPage + 1)}
              >
                <img
                  src={ChevronImageRight}
                  className="navigation-chevron"
                  alt="Pagina următoare"
                />
              </div>
            )}
          </div>
          <hr />
          <h2 className="header">Istoric deplasări</h2>
          <Table
            dataRows={history.outings.slice(
              outingsPage * PAGE_SIZE,
              PAGE_SIZE * (outingsPage + 1)
            )}
            headers={OUTINGS_HEADERS}
          />
          <div className="navigation">
            {hasPrev(outingsPage) && (
              <div
                className="button"
                onClick={() => setOutings(outingsPage - 1)}
              >
                <img
                  src={ChevronImageLeft}
                  className="navigation-chevron"
                  alt="Pagina anterioară"
                />
              </div>
            )}
            {hasNext(outingsPage, history.outings.length) && (
              <div
                className="button right"
                onClick={() => setOutings(outingsPage + 1)}
              >
                <img
                  src={ChevronImageRight}
                  className="navigation-chevron"
                  alt="Pagina următoare"
                />
              </div>
            )}
          </div>
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
