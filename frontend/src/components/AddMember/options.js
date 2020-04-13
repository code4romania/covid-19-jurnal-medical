export const options = {
  gender: [
    { value: "", text: "Genul", disabled: true, selected: true },
    { value: "1", text: "Feminin" },
    { value: "2", text: "Masculin" }
  ],
  county: [
    { value: "", text: "Judet", disabled: true, selected: true },
    { value: "București", text: "București" }
  ],
  relation: [
    { value: "", text: "Tip relație", disabled: true, selected: true },
    { value: "0", text: "Părinte" },
    { value: "1", text: "Copil" },
    { value: "2", text: "Bunic\\Bunică" },
    { value: "3", text: "Vecin\\Vecină" },
    { value: "4", text: "Altele" }
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
    {
      value: "O boală de inimă (boală cardiovasculară, inclusiv hipertensiune)",
      text: "O boală de inimă (boală cardiovasculară, inclusiv hipertensiune)"
    },
    { value: "Diabet", text: "Diabet" },
    { value: "O boală a plămânilor", text: "O boală a plămânilor" },
    { value: "Cancer", text: "Cancer" },
    { value: "Altă boală cronică", text: "Altă boală cronică" },
    { value: "Niciuna de mai sus", text: "Niciuna de mai sus" }
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
