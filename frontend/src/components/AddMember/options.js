export const options = {
  gender: [
    { value: "", text: "Genul", disabled: true, selected: true },
    { value: "1", text: "Feminin" },
    { value: "2", text: "Masculin" }
  ],
  county: [
    { value: "Alba", label: "Alba" },
    { value: "Arad", label: "Arad" },
    { value: "Argeș", label: "Argeș" },
    { value: "Bacău", label: "Bacău" },
    { value: "Bihor", label: "Bihor" },
    { value: "Bistrița-Năsăud", label: "Bistrița-Năsăud" },
    { value: "Botoșani", label: "Botoșani" },
    { value: "Brașov", label: "Brașov" },
    { value: "Brăila", label: "Brăila" },
    { value: "București", label: "București" },
    { value: "Buzău", label: "Buzău" },
    { value: "Caraș-Severin", label: "Caraș-Severin" },
    { value: "Cluj", label: "Cluj" },
    { value: "Constanța", label: "Constanța" },
    { value: "Covasna", label: "Covasna" },
    { value: "Călărași", label: "Călărași" },
    { value: "Dolj", label: "Dolj" },
    { value: "Dîmbovița", label: "Dîmbovița" },
    { value: "Galați", label: "Galați" },
    { value: "Giurgiu", label: "Giurgiu" },
    { value: "Gorj", label: "Gorj" },
    { value: "Harghita", label: "Harghita" },
    { value: "Hunedoara", label: "Hunedoara" },
    { value: "Ialomița", label: "Ialomița" },
    { value: "Iași", label: "Iași" },
    { value: "Ilfov", label: "Ilfov" },
    { value: "Maramureș", label: "Maramureș" },
    { value: "Mehedinți", label: "Mehedinți" },
    { value: "Mureș", label: "Mureș" },
    { value: "Neamț", label: "Neamț" },
    { value: "Olt", label: "Olt" },
    { value: "Prahova", label: "Prahova" },
    { value: "Satu Mare", label: "Satu Mare" },
    { value: "Sibiu", label: "Sibiu" },
    { value: "Suceava", label: "Suceava" },
    { value: "Sălaj", label: "Sălaj" },
    { value: "Teleorman", label: "Teleorman" },
    { value: "Timiș", label: "Timiș" },
    { value: "Tulcea", label: "Tulcea" },
    { value: "Vaslui", label: "Vaslui" },
    { value: "Vrancea", label: "Vrancea" },
    { value: "Vâcea", label: "Vâcea" }
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
