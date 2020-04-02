import React from "react";
import {
  Hero,
  Button,
  Input,
  Select,
  RadioList
} from "@code4ro/taskforce-fe-components";
import SidebarLayout from "../SidebarLayout";
import "./AddMember.scss";
class AddMember extends React.Component {
  constructor(props) {
    super(props);

    this.toggleSex = this.toggleSex.bind(this);
    this.togglePreexistingConditions = this.togglePreexistingConditions.bind(
      this
    );
    this.toggleDisabilities = this.toggleDisabilities.bind(this);

    //TODO: change with api endpoins responses when they are available
    this.options = {
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

    this.state = {
      showPreexistingConditions: false,
      showDisabilities: false,
      useMaleOptions: false,
      female: true
    };
  }

  toggleSex(event) {
    this.setState({ female: event.target.value === "Feminin" });
  }

  togglePreexistingConditions(value) {
    this.setState({ showPreexistingConditions: value === "Da" });
  }

  toggleDisabilities(value) {
    this.setState({ showDisabilities: value === "Da" });
  }

  validateAge(event) {
    const value = parseInt(event.target.value.replace(/[^0-9]+/g, ""));
    // age range is between 0 and 110 - might be worth reconsidering?
    const boundedValue = Math.min(110, Math.max(0, value));

    event.target.value = isNaN(boundedValue) ? "" : boundedValue;
  }

  render() {
    return (
      <SidebarLayout>
        <form>
          <div className="override-is-2">
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
                  onChange={this.validateAge}
                  required={true}
                />
              </div>
              <div className="column is-3">
                <Select
                  label="Gen"
                  options={this.options.gender}
                  selectProps={{
                    onChange: this.toggleSex,
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
                    this.state.female
                      ? this.options.relationship.female
                      : this.options.relationship.male
                  }
                />
              </div>
            </div>
            <RadioList
              label="Are condiții de sănătate preexistente?"
              description="Spune-ne dacă suferă de anumte boli cronice, diabet, hipertensiune, etc."
              type="horizontal"
              options={this.options.yesNo}
              onChange={this.togglePreexistingConditions}
              required={true}
            />
            {this.state.showPreexistingConditions && (
              <div className="column is-6 is-multiple">
                <Select
                  label="Condiții de sănătate preexistente"
                  options={this.options.preexistingConditions}
                  selectProps={{ multiple: "multiple" }}
                />
              </div>
            )}
            <RadioList
              label="Are anumite dizabilități?"
              description="Spune-ne dacă sferă de anumite dizabilitati Ex locomotorii, mentale, de vorbire, etc."
              type="horizontal"
              options={this.options.yesNo}
              onChange={this.toggleDisabilities}
            />
            {this.state.showDisabilities && (
              <Input label="Dizabilități" type="text" required={true} />
            )}
            <RadioList
              label="În ultima perioadă a fost în:"
              type="horizontal"
              options={this.options.isolation}
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
  }
}

export default AddMember;
