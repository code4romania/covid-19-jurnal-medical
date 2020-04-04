import mockApi from "../api";
import EvaluationApi from "./EvaluationApi";

jest.mock("../api");

describe("EvaluationApi", () => {
  it("sends self evaluation form results", () => {
    const formResults = { someField: "someValue" };
    EvaluationApi.sendSelfEvaluationResults("some-id", formResults);

    expect(mockApi.post).toHaveBeenCalledWith(
      "http://localhost:5008/api/form?id=some-id",
      formResults
    );
  });
});
