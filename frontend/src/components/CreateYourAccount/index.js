import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Hero,
  Input,
  RadioList,
  Select
} from "@code4ro/taskforce-fe-components";
import BasePage from "../BasePage";
import SidebarLayout from "../SidebarLayout";
import "./styles.scss";

const CreateYourAccount = () => {
  const [form, setForm] = useState({
    fullName: { value: "", isValid: false, isDirty: false },
    age: { value: undefined, isValid: false, isDirty: false },
    gender: { value: 0, isValid: false, isDirty: false },
    preexistingMedicalCondition: { value: "", isValid: false, isDirty: false },
    quarantineStatus: { value: undefined, isValid: false, isDirty: false },
    agreeToTerms: { value: false, isValid: false, isDirty: false },
    isFormValid: false
  });

  const validation = (name, value) => {
    switch (name) {
      case "fullName":
        return !!value && value.length < 100;
      case "age":
        return !!+value && +value > 0 && +value < 100;
      case "gender":
        return +value !== 0;
      case "preexistingMedicalCondition":
        return !value || value.length < 500;
      case "quarantineStatus":
        return !!value;
      case "agreeToTerms":
        return value;
      default:
        return false;
    }
  };

  const submitForm = () => {};

  const handleOnChange = (e, val) => {
    const name = e.target.name;
    const value = val !== undefined ? val : e.target.value;
    const isValid = validation(name, value);

    let isFormValid = isValid;
    if (isValid) {
      Object.keys(form).forEach(k => {
        if (!isFormValid || k === "isFormValid") {
          return;
        } else if (k && k !== name) {
          isFormValid = form[k].isValid;
        }
      });
    }

    setForm(form => ({
      ...form,
      [name]: {
        value,
        isValid,
        isDirty: true
      },
      isFormValid
    }));
  };

  const handleQuarantineStatusChange = e => {
    setForm(form => ({
      ...form,
      quarantineStatus: {
        value: e,
        isValid: validation("quarantineStatus", e)
      }
    }));
  };

  const lifestyleOptions = [
    { key: "2", value: "Auto izolare" },
    { key: "3", value: "Carantină la domiciliu" },
    { key: "4", value: "Carantină specializată" },
    { key: "1", value: "Niciuna" }
  ];

  const genderOptions = [
    { value: "0", text: "", selected: true },
    { value: "1", text: "Feminin" },
    { value: "2", text: "Masculin" }
  ];

  const genderDdlProps = {
    onChange: function(el) {
      // fix for missing name
      el.target.name = "gender";
      handleOnChange(el);
    }
  };

  return (
    <BasePage>
      <SidebarLayout>
        <Hero
          title="Creează-ți cont"
          subtitle="Având cont poți efectua formularele de evaluare zilnic și poți înregistra în contul tău membrii familiei care nu au e-mail sau acces la un calculator."
          useFallbackIcon={true}
        />
        <form>
          <Input
            type="text"
            name="fullName"
            label="Nume și prenume"
            onChange={handleOnChange}
            color={
              !form.fullName.isValid && form.fullName.isDirty ? "danger" : ""
            }
          />
          <div className="columns">
            <div className="column is-one-quarter">
              <Input
                type="text"
                name="age"
                label="Vârstă"
                onChange={handleOnChange}
                color={!form.age.isValid && form.age.isDirty ? "danger" : ""}
              />
            </div>
            <div className="column gender-column is-one-quarter">
              <Select
                label="Gen"
                name="gender"
                options={genderOptions}
                selectProps={genderDdlProps}
              />
            </div>
          </div>
          <Input
            type="text"
            name="preexistingMedicalCondition"
            label="Ai condiții de sănătate preexistente?"
            secondaryLabel="Spune-ne dacă suferi de anumite boli cronice, diabet, hipertensiune etc."
            onChange={handleOnChange}
            color={
              !form.preexistingMedicalCondition.isValid &&
              form.preexistingMedicalCondition.isDirty
                ? "danger"
                : ""
            }
          />
          <div>
            <RadioList
              label={"În ultima perioadă ai fost în:"}
              name="quarantineStatus"
              type="horizontal"
              options={lifestyleOptions}
              onChange={handleQuarantineStatusChange}
            />
          </div>
          <div className="agree-to-terms-row">
            <Checkbox
              name="agreeToTerms"
              onChange={e => handleOnChange(e, e.target.checked)}
              defaultValue={form.agreeToTerms.value}
            >
              Prin această bifă iți exprimi acordul ca datele furnizate de tine
              prin acest formular să fie procesate exclusiv în scopul de a te
              pune în legătură cu un specialist care să te ajute cu problema
              pentru care cauți soluție.{" "}
              <a href="#">
                Aici puteți găsi regulamentul nostru cu privire la prelucrarea
                datelor cu caracter personal.
              </a>
            </Checkbox>
          </div>
          <div className="submit-button-row">
            <Button disabled={!form.isFormValid} onClick={submitForm}>
              CREEAZĂ CONT
            </Button>
          </div>
        </form>
      </SidebarLayout>
    </BasePage>
  );
};

export default CreateYourAccount;
