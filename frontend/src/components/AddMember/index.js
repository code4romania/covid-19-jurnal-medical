import React from "react";
import BasePage from "../BasePage";
import {
  Hero,
  Button,
  Input,
  Label,
  Select,
  RadioList
} from "@code4ro/taskforce-fe-components";
import StepsBar from "../StepsBar";
import SidebarLayout from "../SidebarLayout";
import "./AddMember.scss";
const AddMember = () => {
  //TODO: change with api endpoins responses when they are available
  const relationshipOptions = [
    { text: "", value: "" },
    { text: "Bunică", value: "1" }
  ];

  const options1 = [
    { key: true, value: "Da" },
    { key: false, value: "Nu" }
  ];

  const options2 = [
    { key: "1", value: "Auto izolare" },
    { key: "2", value: "Carantină la domiciliu" },
    { key: "3", value: "Carantină specializată" },
    { key: "4", value: "Niciuna" }
  ];

  const genderOptions = [
    { key: "", text: "" },
    { key: "1", text: "Feminin" },
    { key: "2", text: "Masculin" }
  ];

  var ageOptions = [...Array(100).keys()].map(index => ({
    text: index,
    value: index
  }));
  ageOptions[0].text = "";

  return (
    <BasePage>
      <Hero
        title="Ce pași ai de urmat"
        subtitle="Pentru a te putea ajuta iata ce ai la dispozitie in contul tau:"
        useFallbackIcon={true}
      />
      <StepsBar />
      <SidebarLayout>
        <form>
          <Hero
            title="Creează cont pentru un membru al familiei"
            subtitle="Înregistrează un membru al familiei care nu poate accesa platforma și ajută-l să își facă evaluarea zilnică a simptomelor COVID-19."
          />
          <Input label="Nume și prenume" type="text" required="true" />
          <div className="columns">
            <div className="column is-6">
              <Select
                label="Legătura familiala"
                options={relationshipOptions}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-3">
              <Select label="Vârstă" options={ageOptions} />
            </div>
            <div className="column is-3">
              <Select
                label="Gen"
                options={genderOptions}
                selectProps={{ className: "is-extended" }}
              />
            </div>
          </div>
          <Label text="Are condiții de sănătate preexistente?" />
          <p className="subtitle is-6">
            Spune-ne dacă suferă de anumte boli cronice, diabet, hipertensiune,
            etc
          </p>
          <Input label="" name="" />
          <Label text="Are anumite dizabilități?" />
          <p className="subtitle is-6">
            Spune-ne dacă sferă de anumite dizabilitati Ex locomotorii, mentale,
            de vorbire etc.
          </p>
          <RadioList label="" type="horizontal" options={options1} />
          <RadioList
            label="În ultima perioadă a fost în:"
            type="horizontal"
            options={options2}
          />

          <div className="columns">
            <div className="column is-4 is-offset-8">
              <Button
                type="primary"
                size="large"
                disabled="true"
                inputType="submit"
              >
                Adaugă
              </Button>
            </div>
          </div>
        </form>
      </SidebarLayout>
    </BasePage>
  );
};

export default AddMember;
