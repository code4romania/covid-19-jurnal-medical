export const buildHistory = rawData => {
  const data = rawData.map(({ content }) => JSON.parse(content));
  if (!data) {
    return;
  }

  const result = { temperature: [], symptoms: [], otherSymptoms: [] };
  const yesAnswer = "0";
  let seedId = 100;

  data.forEach(({ RootElement: { answers: answersList, timestamp } }) => {
    const form = getAnswers(answersList);

    if (form.hadFever.answer === yesAnswer) {
      let feverDate = new Date(form.feverDate.answer).getTime() / 1000;
      result.temperature.push({
        date: feverDate,
        temperature: 38
      });
    }

    getSymptomsParameters(form).forEach(symptom =>
      tryAddSymptom(result.symptoms, symptom, ++seedId)
    );

    if (form.hadOtherSymptoms.answer === yesAnswer) {
      result.otherSymptoms.push({
        date: timestamp / 1000,
        otherSimptoms: form.otherSymptomsDescription.answer
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
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
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
  ] = answers;

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
    otherSymptomsDescription
  };
};

const tryAddSymptom = (symptoms, symptomParameter, id) => {
  if (symptomParameter.hadSymptom.answer !== "0") {
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
