import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Form } from "@code4ro/taskforce-fe-components";
import FinishFormButton from "../Evaluation/finishFormButton";
import LoadingPlaceholder from "../LoadingPlaceholder";
import StartFormButton from "./startFormButton";
import ProfileApi from "../../api/profileApi";
import ProfileDetails from "../Account/common/ProfileDetails/ProfileDetails";
import ProfileOthers from "../Account/common/ProfileOthers/ProfileOthers";

const EvaluationForm = ({ getForm, sendResults }) => {
  const [userProfile, setUserProfile] = useState({});
  const [dependants, setDependants] = useState([]);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [introData, setIntroData] = useState({});
  const [evaluationFormData, setEvaluationForm] = useState(null);
  const [isSelf, setIsSelf] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsSelf(!location.pathname.startsWith("/evaluation/other-members"));
    ProfileApi.get().then(setUserProfile);
    ProfileApi.getDependants().then(setDependants);
  }, []);

  useEffect(() => {
    getForm().then(setEvaluationForm);
  }, [getForm]);

  const evaluateCallback = (_formState, options) => options[0];

  const onFinishingForm = result => {
    setFinished(true);
    sendResults(result, introData);
  };

  const onFinishingIntro = introData => {
    setIntroData(introData);
    setStarted(true);
  };

  if (started) {
    return (
      <>
        {evaluationFormData && (
          <Form
            data={evaluationFormData}
            evaluateForm={evaluateCallback}
            onFinishingForm={onFinishingForm}
          />
        )}
        {evaluationFormData === null && (
          <LoadingPlaceholder text={"Formularul se încarcă"} />
        )}
        {finished && <FinishFormButton />}
      </>
    );
  } else {
    return (
      <>
        <StartFormButton onClick={onFinishingIntro} />

        {userProfile.id && isSelf && (
          <ProfileDetails fields={userProfile} isSelf>
            <ProfileOthers family={dependants} />
          </ProfileDetails>
        )}
      </>
    );
  }
};

export default EvaluationForm;

EvaluationForm.propTypes = {
  getForm: PropTypes.func.isRequired,
  sendResults: PropTypes.func.isRequired,
  introType: PropTypes.oneOf(["OTHER", "SELF"])
};
