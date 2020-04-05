import React from "react";
import SelfEvaluation from "./index";
import IntroSelfEvaluation from "./introSelfEvaluation";
import { shallow } from "enzyme";
import { Form } from "@code4ro/taskforce-fe-components";
import EvaluationApi from "../../api/evaluationApi";

jest.mock("../../api/evaluationApi");

describe("Self evaluation", () => {
  it("starts the form when action comes from intro", () => {
    const evaluation = shallow(<SelfEvaluation />);

    expect(evaluation.exists(Form)).toBe(false);

    const callback = evaluation.find(IntroSelfEvaluation).prop("onFinish");

    callback();

    expect(evaluation.exists(Form)).toBe(true);
  });

  it("sends the results from the form", () => {
    const evaluation = shallow(<SelfEvaluation />);

    const callback = evaluation.find(IntroSelfEvaluation).prop("onFinish");
    callback();

    const finishCallback = evaluation.find(Form).prop("onFinishingForm");

    const formResults = { formId: 1, test: "something" };
    finishCallback(formResults);

    expect(EvaluationApi.sendSelfEvaluationResults).toHaveBeenCalledWith(
      formResults
    );
  });
});
