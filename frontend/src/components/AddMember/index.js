import React, { useState } from "react";
import {
  Hero,
  Button,
  Input,
  Select,
  RadioList
} from "@code4ro/taskforce-fe-components";
import SidebarLayout from "../SidebarLayout";
import "./AddMember.scss";
export const AddMember = () => {
  const [preexistingConditions, setPreexistingConditions] = useState(false);
  const [disabilities, setDisabilities] = useState(false);
  const [female, setFemale] = useState(true);

  //TODO: change with api endpoints responses when they are available
  const options = {
    gender: [
      { key: "1", text: "Feminin" },
      { key: "2", text: "Masculin" }
    ],
    relationship: {
      female: [
        { text: "", value: "" },
        { text: "Bunică", value: "1" },
        { text: "Mamă", value: "2" },
        { text: "Fiica", value: "3" },
        { text: "Soră", value: "4" },
        { text: "Alt membru al familiei", value: "5" },
        { text: "Persoană în grijă", value: "6" }
      ],
      male: [
        { text: "", value: "" },
        { text: "Bunic", value: "1" },
        { text: "Tată", value: "2" },
        { text: "Fiu", value: "3" },
        { text: "Frate", value: "4" },
        { text: "Alt membru al familiei", value: "5" },
        { text: "Persoană în grijă", value: "6" }
      ]
    },
    yesNo: [
      { key: "true", value: "Da" },
      { key: "false", value: "Nu" }
    ],
    preexistingConditions: [
      { value: "1", text: "Boală cardiovasculară" },
      { value: "2", text: "Diabet" },
      { value: "3", text: "Boală pulmonară" },
      { value: "4", text: "Cancer" },
      { value: "5", text: "Altă boală cronică" }
    ],
    isolation: [
      { key: "1", value: "Auto izolare" },
      { key: "2", value: "Carantină la domiciliu" },
      { key: "3", value: "Carantină specializată" },
      { key: "4", value: "Niciuna" }
    ]
  };

  const toggleSex = event => {
    setFemale(event.target.value === "Feminin");
  };

  const togglePreexistingConditions = value => {
    setPreexistingConditions(value === "Da");
  };

  const toggleDisabilities = value => {
    setDisabilities(value === "Da");
  };

  const validateAge = event => {
    const value = parseInt(event.target.value.replace(/[^0-9]+/g, ""));
    // age range is between 0 and 110 - might be worth reconsidering?
    const boundedValue = Math.min(110, Math.max(0, value));

    event.target.value = isNaN(boundedValue) ? "" : boundedValue;
  };

  return (
    <SidebarLayout>
      <form>
        <div className="add-member">
          <Hero
            title="Creează cont pentru un membru al familiei"
            subtitle="Înregistrează un membru al familiei care nu poate accesa platforma și ajută-l să își facă evaluarea zilnică a simptomelor COVID-19."
          />
          <Input label="Nume și prenume" type="text" required={true} />
          <div className="columns">
            <div className="column is-3">
              <Input
                label="Vârstă"
                type="text"
                onChange={validateAge}
                required={true}
              />
            </div>
            <div className="column is-3">
              <Select
                label="Gen"
                options={options.gender}
                selectProps={{
                  onChange: toggleSex,
                  className: "is-extended"
                }}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-6">
              <Select
                label="Legătura familiala"
                options={
                  female
                    ? options.relationship.female
                    : options.relationship.male
                }
              />
            </div>
          </div>
          <RadioList
            label="Are condiții de sănătate preexistente?"
            description="Spune-ne dacă suferă de anumte boli cronice, diabet, hipertensiune, etc."
            type="horizontal"
            options={options.yesNo}
            onChange={togglePreexistingConditions}
            required={true}
          />
          {preexistingConditions && (
            <div className="column is-6 is-multiple">
              <Select
                label="Condiții de sănătate preexistente"
                options={options.preexistingConditions}
                selectProps={{ multiple: "multiple" }}
              />
            </div>
          )}
          <RadioList
            label="Are anumite dizabilități?"
            description="Spune-ne dacă sferă de anumite dizabilitati Ex locomotorii, mentale, de vorbire, etc."
            type="horizontal"
            options={options.yesNo}
            onChange={toggleDisabilities}
          />
          {disabilities && (
            <Input label="Dizabilități" type="text" required={true} />
          )}
          <RadioList
            label="În ultima perioadă a fost în:"
            type="horizontal"
            options={options.isolation}
          />

          <div className="columns">
            <div className="column is-4 is-offset-8">
              <Button type="primary" size="medium" inputType="submit">
                Adaugă
              </Button>
            </div>
          </div>
        </div>
      </form>
    </SidebarLayout>
  );
};

export default AddMember;
