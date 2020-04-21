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
  let seedId = 100;

  data.forEach(({ RootElement: { answers: answersList, timestamp } }) => {
    const form = getAnswers(answersList);

    let feverDate =
      form.hadFever.answer === TRUE
        ? new Date(form.feverDate.answer).getTime()
        : timestamp;

    result.temperature.push({
      date: feverDate / 1000,
      temperature: form.hadFever.answer === TRUE ? 38 : 37
    });

    getSymptomsParameters(form).forEach(symptom =>
      tryAddSymptom(result.symptoms, symptom, ++seedId)
    );

    if (form.hadOtherSymptoms.answer === TRUE) {
      result.otherSymptoms.push({
        date: timestamp / 1000,
        otherSimptoms: form.otherSymptomsDescription.answer
      });
    }
    if (form.hasOuting.answer === TRUE) {
      result.outings.push({
        "Motivul deplasării": form.outingPurpose.answer,
        "Data/Ora plecării": form.outingStartTime.answer,
        "Data/Ora sosirii": form.outingEndTime.answer,
        "Contact cu pacient": form.positiveContact.answer === TRUE ? "Da" : "Nu"
      });
    }
  });

  return result;
};

const getSymptomsParameters = form => {
  return [
    {
      hadSymptom: form.hadSoreThroat,
      symptomDate: form.soreThroatDate,
      symptomName: "soreThroat"
    },
    {
      hadSymptom: form.hadCough,
      symptomDate: form.coughDate,
      symptomName: "cough"
    },
    {
      hadSymptom: form.hadShortnessBreath,
      symptomDate: form.shortnessBreathDate,
      symptomName: "shortnessBreath"
    },
    {
      hadSymptom: form.hadRunningNose,
      symptomDate: form.runningNoseDate,
      symptomName: "runningNose"
    }
  ];
};

const getAnswers = answers => {
  const answersById = Object.assign(
    {},
    ...answers.map(answer => ({ [answer.id]: answer }))
  );

  return {
    hadFever: answersById[1],
    feverDate: answersById[2],
    hadSoreThroat: answersById[3],
    soreThroatDate: answersById[4],
    hadCough: answersById[5],
    coughDate: answersById[6],
    hadShortnessBreath: answersById[7],
    shortnessBreathDate: answersById[8],
    hadRunningNose: answersById[9],
    runningNoseDate: answersById[10],
    hadOtherSymptoms: answersById[11],
    otherSymptomsDescription: answersById[12],
    hasOuting: answersById[16],
    outingPurpose: answersById[17],
    outingStartTime: answersById[18],
    outingEndTime: answersById[19],
    positiveContact: answersById[20]
  };
};

const tryAddSymptom = (symptoms, symptomParameter, id) => {
  if (symptomParameter.hadSymptom.answer !== TRUE) {
    return;
  }

  const date = new Date(symptomParameter.symptomDate.answer).getTime() / 1000;
  const symptomOnDate = symptoms.find(s => s.date === date);

  if (symptomOnDate) {
    symptomOnDate[symptomParameter.symptomName] = true;
  } else {
    let symptom = {
      id: id,
      date,
      soreThroat: false,
      cough: false,
      shortnessBreath: false,
      runningNose: false
    };
    symptom[symptomParameter.symptomName] = true;
    symptoms.push(symptom);
  }
};
