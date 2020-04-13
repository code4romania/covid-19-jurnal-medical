// fields are grouped by row
export const FIELDS_LABELS = {
  name: "Nume si prenume",
  smoker: "Fumator",

  phoneNumber: "Numar de telefon",
  preexistingMedicalCondition: "Afectiuni agravante",

  location: "Judet, localitate",
  livesWithOthers: "Locuiesti singur",

  age: "Varsta in ani impliniti",
  quarantineStatus: "Izolare proprie la domiciliu",

  gender: "Genul",
  quarantineStatusOthers: "Izolare alte persoane la domiciliu"
};

const GENDER_DICT = {
  1: "feminin",
  2: "masculin"
};

const BOOL_DICT = {
  0: "Nu",
  1: "Da"
};

const QUARANTINE_STATUS_DICT= {
  1: "Da, sunt în izolare, nu ies deloc din locuință",
  2: "Stau mai mult pe acasă, dar mai ies atunci când este nevoie",
  3: "Nu sunt în izolare și ies din locuință după program normal",
  4: "Altă situație"
}



const FIELDS_DICT = {
  gender: GENDER_DICT,
  quarantineStatus: QUARANTINE_STATUS_DICT,
  quarantineStatusOthers: QUARANTINE_STATUS_DICT
};

const fieldsWithDict = ["gender", "quarantineStatus", "quarantineStatusOthers"];

const mapProfileDetails = data => {
  return Object.entries(FIELDS_LABELS).filter(([key, label])=>data[key] !== undefined).map(([key, label]) => {
    const fieldValue = data[key];
    const mappedItem = {
      label,
      value:
        typeof fieldValue === "boolean" ? BOOL_DICT[+fieldValue] : fieldValue
    };

    if (key === "name") {
      return { ...mappedItem, value: `${data.name} ${data.surname}` };
    }

    if (key === "location") {
      return { ...mappedItem, value: `${data.county}, ${data.city}` };
    }

    if (fieldsWithDict.includes(key)) {
      return { ...mappedItem, value: FIELDS_DICT[key][fieldValue] };
    }

    return mappedItem;
  });
};

export { mapProfileDetails };
