import cities from "./cities";

export const options = {
  gender: [
    { value: "", text: "Genul", disabled: true, selected: true },
    { value: "1", text: "Feminin" },
    { value: "2", text: "Masculin" }
  ],
  county: Object.keys(cities).map(county => ({
    label: county,
    value: county
  })),
  relation: [
    { value: "", text: "Tip relație", disabled: true, selected: true },
    { value: "1", text: "Părinte" },
    { value: "2", text: "Copil" },
    { value: "3", text: "Bunic\\Bunică" },
    { value: "4", text: "Vecin\\Vecină" },
    { value: "5", text: "Altele" }
  ],
  city: [
    { value: "", text: "Localitate", disabled: true, selected: true },
    { value: "București", text: "București" }
  ],
  yesNo: [
    { value: true, text: "Da" },
    { value: false, text: "Nu" }
  ],
  preexistingMedicalCondition: [
    { value: "1", text: "O boală de inimă (boală cardiovasculară, inclusiv hipertensiune)"},
    { value: "2", text: "Diabet" },
    { value: "3", text: "O boală a plămânilor" },
    { value: "4", text: "Cancer" },
    { value: "5", text: "Altă boală cronică" },
    { 
      value: "6",
      text: "Niciuna de mai sus",
      mutuallyExclusive: true
    }
  ],
  quarantineStatus: [
    { value: "1", text: "Da, sunt în izolare, nu ies deloc din locuință" },
    {
      value: "2",
      text: "Stau mai mult pe acasă, dar mai ies atunci când este nevoie"
    },
    {
      value: "3",
      text: "Nu sunt în izolare și ies din locuință după program normal"
    },
    {
      value: "4",
      text: "Altă situație"
    }
  ]
};
