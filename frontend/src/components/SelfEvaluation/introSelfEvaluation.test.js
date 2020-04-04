import React from "react";
import IntroSelfEvaluation from "./introSelfEvaluation";
import { mount } from "enzyme";

describe("Intro to self evaluation", () => {
  it("calls on finish on button click", () => {
    const onFinishMock = jest.fn();
    const intro = mount(<IntroSelfEvaluation onFinish={onFinishMock} />);
    intro.find("button").simulate("click");

    expect(onFinishMock).toHaveBeenCalledTimes(1);
  });
});
