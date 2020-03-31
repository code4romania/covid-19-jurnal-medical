import React from "react";
import { Form } from "@code4ro/taskforce-fe-components";
import data from "../../data/self-eval.json";

const SelfEvaluation = () => {
  const evaluateCallback = (formData, options) => {
    // TODO Send data to BE
  };

  return (
    <div>
      <Form
        data={data}
        evaluateForm={evaluateCallback}
        onFinishingForm={results => console.log(results)}
      />
    </div>
  );
};

export default SelfEvaluation;
