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
  const [
    hadFever,
    feverDate,
    hadSoreThroat,
    soreThroatDate,
    hadCough,
    coughDate,
    hadShortnessBreath,
    shortnessBreathDate,
    hadRunningNose,
    runningNoseDate,
    hadOtherSymptoms,
    otherSymptomsDescription
  ] = answers.slice(0, 12);

  const [
    hasOuting,
    outingPurpose,
    outingStartTime,
    outingEndTime,
    positiveContact
  ] = answers.slice(15);

  return {
    hadFever,
    feverDate,
    hadSoreThroat,
    soreThroatDate,
    hadCough,
    coughDate,
    hadShortnessBreath,
    shortnessBreathDate,
    hadRunningNose,
    runningNoseDate,
    hadOtherSymptoms,
    otherSymptomsDescription,
    hasOuting,
    outingPurpose,
    outingStartTime,
    outingEndTime,
    positiveContact
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
