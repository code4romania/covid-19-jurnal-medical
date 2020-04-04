import React from "react";
import { shallow } from "enzyme";
import { Form } from "@code4ro/taskforce-fe-components";
import IntroOtherEvaluation from "./introOtherEvaluation";
import OtherEvaluation from "./index";

describe("Other evaluation", () => {
  it("starts the form when action comes from intro", () => {
    const evaluation = shallow(<OtherEvaluation />);

    expect(evaluation.exists(Form)).toBe(false);

    const callback = evaluation.find(IntroOtherEvaluation).prop("onFinish");

    callback("Superman");

    expect(evaluation.exists(Form)).toBe(true);
    expect(evaluation.find(".dependant").text()).toEqual("Superman");
  });
});
