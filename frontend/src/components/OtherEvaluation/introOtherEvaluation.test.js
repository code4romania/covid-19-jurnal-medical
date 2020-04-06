import React from "react";
import IntroOtherEvaluation from "./introOtherEvaluation";
import { mount } from "enzyme";
import ProfileApi from "../../api/profileApi";
import { act } from "react-dom/test-utils";

jest.mock("../../api/profileApi");

describe("Intro to self evaluation", () => {
  it("calls on finish on button click", async () => {
    const onFinishMock = jest.fn();
    ProfileApi.getDependants.mockResolvedValue([{ id: 1, name: "A" }]);
    let intro;
    await act(async () => {
      intro = mount(<IntroOtherEvaluation onFinish={onFinishMock} />);
    });
    intro.update();
    intro.find("select").simulate("change", { target: { value: "A" } });
    intro.find("button").simulate("click");

    expect(onFinishMock).toHaveBeenCalledWith("A");
  });
});
