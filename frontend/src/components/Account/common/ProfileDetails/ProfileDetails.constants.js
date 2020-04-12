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
  0: "feminin",
  1: "masculin"
};

const BOOL_DICT = {
  0: "Nu",
  1: "Da"
};

const FIELDS_DICT = {
  gender: GENDER_DICT
};

// TODO add dicts for other fields? (quarantineStatus, quarantineStatusOthers)
const fieldsWithDict = ["gender"];

const mapProfileDetails = data => {
  return Object.entries(FIELDS_LABELS).map(([key, label]) => {
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
