import { options } from "../components/AddMember/options";

export const mapPreExistMedCondTexts = values =>
  options.preexistingMedicalCondition
    .filter(cond => values.includes(cond.value))
    .map(cond => cond.text);

export const mapPreExistMedCondValues = values =>
  options.preexistingMedicalCondition
    .filter(cond => values.includes(cond.text))
    .map(cond => cond.value);
