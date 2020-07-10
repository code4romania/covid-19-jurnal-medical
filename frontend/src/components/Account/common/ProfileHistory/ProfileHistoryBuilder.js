import format from "date-fns/format";
import { ro } from "date-fns/locale";
const TRUE = "true";

const formatDateTimeForOuting = dateAsISOString => {
  return format(new Date(dateAsISOString), "d MMM HH:mm", { locale: ro });
};
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

  data.forEach(responseForm => {
    const form = getAnswers(responseForm.answers);

    result.temperature.push({
      date: responseForm.timestamp,
      temperature: form.hadFever.answer === TRUE ? 38 : 37
    });

    result.symptoms.push({
      date: responseForm.timestamp,
      soreThroat: form.hadSoreThroat.answer === TRUE,
      cough: form.hadCough.answer === TRUE,
      shortnessBreath: form.hadShortnessBreath.answer === TRUE,
      runningNose: form.hadRunningNose.answer === TRUE
    });

    if (form.hadOtherSymptoms.answer === TRUE) {
      result.otherSymptoms.push({
        date: responseForm.timestamp,
        otherSimptoms: form.otherSymptomsDescription.answer
      });
    }
    if (form.hasOuting.answer === TRUE) {
      result.outings.push({
        purpose: form.outingPurpose.answer,
        startTime: formatDateTimeForOuting(form.outingStartTime.answer),
        endTime: formatDateTimeForOuting(form.outingEndTime.answer),
        contact: form.positiveContact.answer === TRUE
      });
    }
  });

  const sortByDate = (a, b) => (a.date > b.date ? -1 : 1);
  result.outings = result.outings.sort((a, b) =>
    a.startTime > b.startTime ? -1 : 1
  );
  result.temperature = result.temperature.sort(sortByDate);
  result.symptoms = result.symptoms.sort(sortByDate);
  result.otherSymptoms = result.otherSymptoms.sort(sortByDate);

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
