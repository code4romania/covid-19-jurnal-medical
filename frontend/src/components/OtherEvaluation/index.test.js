import React from "react";
import { shallow } from "enzyme";
import { Form } from "@code4ro/taskforce-fe-components";
import IntroOtherEvaluation from "./introOtherEvaluation";
import OtherEvaluation from "./index";
import EvaluationApi from "../../api/evaluationApi";

jest.mock("../../api/evaluationApi");

describe("Other evaluation", () => {
  it("starts the form when action comes from intro", () => {
    const evaluation = shallow(<OtherEvaluation />);

    expect(evaluation.exists(Form)).toBe(false);

    const callback = evaluation.find(IntroOtherEvaluation).prop("onFinish");

    callback("Superman");

    expect(evaluation.exists(Form)).toBe(true);
  });

  it("sends the results from the form", () => {
    const evaluation = shallow(<OtherEvaluation />);

    const callback = evaluation.find(IntroOtherEvaluation).prop("onFinish");
    callback(12);

    const finishCallback = evaluation.find(Form).prop("onFinishingForm");

    const formResults = { formId: 1, test: "something" };
    finishCallback(formResults);

    expect(EvaluationApi.sendDependantEvaluationResult).toHaveBeenCalledWith(
      12,
      formResults
    );
  });
});
