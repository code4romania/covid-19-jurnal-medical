import React from "react";
import IntroOtherEvaluation from "./introOtherEvaluation";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProfileApi from "../../api/profileApi";

jest.mock("../../api/profileApi");

describe("Intro to self evaluation", () => {
  it("calls on finish on button click", async () => {
    const onFinishMock = jest.fn();
    ProfileApi.getDependants.mockResolvedValue([
      { id: 1, name: "A", surname: "B" },
      { id: 2, name: "C", surname: "B" }
    ]);

    render(<IntroOtherEvaluation onFinish={onFinishMock} />);

    fireEvent.change(await screen.findByDisplayValue("A B"), {
      target: { value: "2" }
    });
    fireEvent.click(screen.getByRole("button"));

    expect(onFinishMock).toHaveBeenCalledWith("2");
  });
});
