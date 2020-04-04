import React from "react";
import SelfEvaluation from "./index";
import IntroSelfEvaluation from "./introSelfEvaluation";
import { shallow } from "enzyme";
import { Form } from "@code4ro/taskforce-fe-components";

describe("Self evaluation", () => {
  it("starts the form when action comes from intro", () => {
    const evaluation = shallow(<SelfEvaluation />);

    expect(evaluation.exists(Form)).toBe(false);

    const callback = evaluation.find(IntroSelfEvaluation).prop("onFinish");

    callback();

    expect(evaluation.exists(Form)).toBe(true);
  });
});
