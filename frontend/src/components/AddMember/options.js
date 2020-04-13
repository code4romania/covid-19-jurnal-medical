export const options = {
  gender: [
    { value: "", text: "Genul", disabled: true, selected: true },
    { value: "1", text: "Feminin" },
    { value: "2", text: "Masculin" }
  ],
  county: [
    { value: 1, label: "Dolj" },
    { value: 2, label: "Bacău" },
    { value: 3, label: "Harghita" },
    { value: 4, label: "Bistrița-Năsăud" },
    { value: 5, label: "Dîmbovița" },
    { value: 6, label: "Suceava" },
    { value: 7, label: "Botoșani" },
    { value: 8, label: "Brașov" },
    { value: 9, label: "București" },
    { value: 10, label: "Brăila" },
    { value: 11, label: "Hunedoara" },
    { value: 12, label: "Teleorman" },
    { value: 13, label: "Covasna" },
    { value: 14, label: "Tulcea" },
    { value: 15, label: "Timiș" },
    { value: 16, label: "Buzău" },
    { value: 17, label: "Prahova" },
    { value: 18, label: "Ilfov" },
    { value: 19, label: "Neamț" },
    { value: 20, label: "Cluj" },
    { value: 21, label: "Alba" },
    { value: 22, label: "Giurgiu" },
    { value: 23, label: "Argeș" },
    { value: 24, label: "Călărași" },
    { value: 25, label: "Bihor" },
    { value: 26, label: "Iași" },
    { value: 27, label: "Vâcea" },
    { value: 28, label: "Vrancea" },
    { value: 29, label: "Arad" },
    { value: 30, label: "Ialomița" },
    { value: 31, label: "Caraș-Severin" },
    { value: 32, label: "Galați" },
    { value: 33, label: "Gorj" },
    { value: 34, label: "Constanța" },
    { value: 35, label: "Satu Mare" },
    { value: 36, label: "Maramureș" },
    { value: 37, label: "Mehedinți" },
    { value: 38, label: "Sălaj" },
    { value: 39, label: "Vaslui" },
    { value: 40, label: "Mureș" },
    { value: 41, label: "Sibiu" },
    { value: 42, label: "Olt" }
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
    { value: "București", label: "București1" },
    { value: "București1", label: "București2" },
    { value: "București2", label: "București3" },
    { value: "București3", label: "București4" }

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
