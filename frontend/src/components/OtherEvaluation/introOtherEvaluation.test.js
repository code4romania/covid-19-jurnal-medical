import React from "react";
import IntroOtherEvaluation from "./introOtherEvaluation";
import { mount } from "enzyme";

describe("Intro to self evaluation", () => {
  it("calls on finish on button click", () => {
    const onFinishMock = jest.fn();
    const intro = mount(<IntroOtherEvaluation onFinish={onFinishMock} />);
    intro.find("select").simulate("change", { target: { value: "A" } });
    intro.find("button").simulate("click");

    expect(onFinishMock).toHaveBeenCalledWith("A");
  });
});
