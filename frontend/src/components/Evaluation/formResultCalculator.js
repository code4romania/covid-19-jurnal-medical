const formResultCalculator = (formState, options) => {
  const scoreForId = questionId => {
    return formState[questionId] ? 1 : 0;
  };

  const importantQuestionIds = [1, 3, 5, 7, 9, 20];
  const coronaLikelihoodScore = importantQuestionIds.reduce(
    (currentScore, currentId) => currentScore + scoreForId(currentId),
    0
  );

  let responseValue = "R3";

  if (coronaLikelihoodScore === 1) {
    responseValue = "R2";
  }

  if (coronaLikelihoodScore > 1) {
    responseValue = "R1";
  }

  const choosenResponse = options.find(
    option => option.value === responseValue
  );

  if (!choosenResponse) {
    return { label: "Mulțumim că ai completat formularul!", value: 0 };
  }

  return choosenResponse;
};

export default formResultCalculator;
