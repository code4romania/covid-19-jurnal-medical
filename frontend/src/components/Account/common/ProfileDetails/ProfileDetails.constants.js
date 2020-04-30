// fields are grouped by row
export const FIELDS_LABELS = {
  name: "Nume și prenume",
  smoker: "Fumător",

  phoneNumber: "Număr de telefon",
  preexistingMedicalCondition: "Afecțiuni agravante",

  location: "Județ, localitate",
  livesWithOthers: "Locuiești singur",

  age: "Vârstă în ani împliniți",
  quarantineStatus: "Izolare proprie la domiciliu",

  gender: "Gen",
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

const QUARANTINE_STATUS_DICT = {
  1: "Da, sunt în izolare, nu ies deloc din locuință",
  2: "Stau mai mult pe acasă, dar mai ies atunci când este nevoie",
  3: "Nu sunt în izolare și ies din locuință după program normal",
  4: "Altă situație"
};

const FIELDS_DICT = {
  gender: GENDER_DICT,
  quarantineStatus: QUARANTINE_STATUS_DICT,
  quarantineStatusOthers: QUARANTINE_STATUS_DICT
};

const PREEXISTING_MEDICAL_CONDITION_MAP = {
  6: "Nu există"
};

const FIELDS_PARTIAL_MAP_DICT = {
  preexistingMedicalCondition: PREEXISTING_MEDICAL_CONDITION_MAP
};

const fieldsWithDict = ["gender", "quarantineStatus", "quarantineStatusOthers"];
const fieldsWithPartialMap = ["preexistingMedicalCondition"];

const mapProfileDetails = data => {
  return Object.entries(FIELDS_LABELS)
    .filter(([key]) => data[key] !== undefined)
    .map(([key, label]) => {
      const fieldValue = data[key];
      const mappedItem = {
        label,
        value:
          typeof fieldValue === "boolean" ? BOOL_DICT[+fieldValue] : fieldValue
      };

      if (key === "name") {
        return { ...mappedItem, value: `${data.surname} ${data.name}` };
      }

      if (key === "location") {
        return { ...mappedItem, value: `${data.county}, ${data.city}` };
      }

      if (fieldsWithDict.includes(key)) {
        return { ...mappedItem, value: FIELDS_DICT[key][+fieldValue] };
      }

      if (
        fieldsWithPartialMap.includes(key) &&
        FIELDS_PARTIAL_MAP_DICT[key][+fieldValue] !== undefined
      ) {
        return {
          ...mappedItem,
          value: FIELDS_PARTIAL_MAP_DICT[key][+fieldValue]
        };
      }

      return mappedItem;
    });
};

export { mapProfileDetails };
