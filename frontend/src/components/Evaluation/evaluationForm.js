import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Form } from "@code4ro/taskforce-fe-components";
import FinishFormButton from "../Evaluation/finishFormButton";
import IntroSelfEvaluation from "./SelfEvaluation/introSelfEvaluation";
import LoadingPlaceholder from "../LoadingPlaceholder";

const EvaluationForm = ({ getForm, sendResults }) => {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [introData, setIntroData] = useState({});
  const [evaluationFormData, setEvaluationForm] = useState(null);

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
          <LoadingPlaceholder text={"Formularul se incarca"} />
        )}
        {finished && <FinishFormButton />}
      </>
    );
  } else {
    return <IntroSelfEvaluation onFinish={onFinishingIntro} />;
  }
};

export default EvaluationForm;

EvaluationForm.propTypes = {
  getForm: PropTypes.func.isRequired,
  sendResults: PropTypes.func.isRequired,
  introType: PropTypes.oneOf(["OTHER", "SELF"])
};
