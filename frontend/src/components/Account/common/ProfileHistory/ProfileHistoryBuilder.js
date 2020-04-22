const TRUE = "true";

export const buildHistory = rawData => {
  const data = rawData.map(({ content }) => JSON.parse(content));
  if (!data) {
    return;
  }

  const result = {
    temperature: [],
    symptoms: [],
    otherSymptoms: [],
    outings: []
  };

  data.forEach(({ RootElement: { answers: answersList, timestamp } }) => {
    const form = getAnswers(answersList);

    const formTimestampInSeconds = Math.floor(timestamp / 1000);

    result.temperature.push({
      date: formTimestampInSeconds,
      temperature: form.hadFever.answer === TRUE ? 38 : 37
    });

    result.symptoms.push({
      date: formTimestampInSeconds,
      soreThroat: form.hadSoreThroat.answer === TRUE,
      cough: form.hadCough.answer === TRUE,
      shortnessBreath: form.hadShortnessBreath.answer === TRUE,
      runningNose: form.hadRunningNose.answer === TRUE
    });

    if (form.hadOtherSymptoms.answer === TRUE) {
      result.otherSymptoms.push({
        date: formTimestampInSeconds,
        otherSimptoms: form.otherSymptomsDescription.answer
      });
    }
    if (form.hasOuting.answer === TRUE) {
      result.outings.push({
        "Motivul deplasării": form.outingPurpose.answer,
        "Data/Ora plecării": form.outingStartTime.answer,
        "Data/Ora sosirii": form.outingEndTime.answer,
        "Contact cu pacient": form.positiveContact.answer === TRUE
      });
    }
  });

  return result;
};

const getAnswers = answers => {
  const answersById = Object.assign(
    {},
    ...answers.map(answer => ({ [answer.id]: answer }))
  );

  return {
    hadFever: answersById[1],
    hadSoreThroat: answersById[3],
    hadCough: answersById[5],
    hadShortnessBreath: answersById[7],
    hadRunningNose: answersById[9],
    hadOtherSymptoms: answersById[11],
    otherSymptomsDescription: answersById[12],
    hasOuting: answersById[16],
    outingPurpose: answersById[17],
    outingStartTime: answersById[18],
    outingEndTime: answersById[19],
    positiveContact: answersById[20]
  };
};
