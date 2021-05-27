export const SYMPTOMS_HEADERS = [
  { label: "Data/Ora", field: "date" },
  {
    label: "Durere în gât și/sau dificultate în a înghiți?",
    field: "soreThroat"
  },
  { label: "Tuse intensă?", field: "cough" },
  { label: "Dificultate în a respira?", field: "shortnessBreath" },
  { label: "Îți curge nasul?", field: "runningNose" }
];

export const OTHER_SYMPTOMS_HEADERS = [
  { label: "Data/ora", field: "date" },
  { label: "Simptome semnalate", field: "otherSimptoms" }
];

export const OUTINGS_HEADERS = [
  { label: "Motivul deplasării", field: "purpose" },
  { label: "Data/Ora plecării", field: "startTime" },
  { label: "Data/Ora sosirii", field: "endTime" },
  { label: "Contact cu pacient", field: "contact" }
];

export const DESCRIPTION_TEXT = `
  Completează formularul zilnic de simptome care te ajută să menții un
  istoric al simptomelor sau al absenței acestora în perioada în care stai
  în izolare. Parcurge întrebările și răspunde cu atenție. Pe măsură ce
  completezi, această pagină se va popula cu istoricul răspunsurilor tale.
  Poți completa
`;
