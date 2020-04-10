import React from "react";
import IntroSelfEvaluation from "./introSelfEvaluation";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Intro to self evaluation", () => {
  it("calls on finish on button click", () => {
    const onFinishMock = jest.fn();
    render(<IntroSelfEvaluation onFinish={onFinishMock} />);
    fireEvent.click(screen.getByRole("button"));

    expect(onFinishMock).toHaveBeenCalledTimes(1);
  });
});
