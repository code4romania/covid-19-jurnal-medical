import React from "react";
import { Form } from "@code4ro/taskforce-fe-components";
import data from "../../data/personal-assesment.json";
import { submitFormResults } from "../../api/evaluation";

const SelfEvaluation = () => {
  // eslint-disable-next-line no-unused-vars
  const evaluateCallback = (formState, options) => {
    return options[0];
  };

  const onFinishingForm = result => {
    submitFormResults(result);
  };

  return (
    <Form
      data={data}
      evaluateForm={evaluateCallback}
      onFinishingForm={onFinishingForm}
    />
  );
};

export default SelfEvaluation;
