import formResultCalculator from "./formResultCalculator";

describe("Logic determining form results", () => {
  const options = [
    { label: "Ok", value: "R3" },
    { label: "Maybe", value: "R2" },
    { label: "Not Ok", value: "R1" }
  ];

  const allAnswersNegative = {
    1: false,
    3: false,
    5: false,
    7: false,
    9: false,
    20: false
  };

  it("Everything is good", () => {
    expect(formResultCalculator(allAnswersNegative, options).label).toEqual(
      "Ok"
    );
  });

  it("One symptom or contacted a positive person then maybe", () => {
    const hasOneSyptom = { ...allAnswersNegative, 5: true };

    expect(formResultCalculator(hasOneSyptom, options).label).toEqual("Maybe");
  });

  it("More then one symptom then not ok", () => {
    const moreSyptoms = { ...allAnswersNegative, 5: true, 20: true };

    expect(formResultCalculator(moreSyptoms, options).label).toEqual("Not Ok");
  });

  it("Default response when expected values are not present", () => {
    const moreSyptoms = { ...allAnswersNegative, 5: true, 20: true };

    expect(formResultCalculator(moreSyptoms, []).label).toEqual("Mulțumim");
  });
});
