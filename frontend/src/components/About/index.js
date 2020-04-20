import React from "react";

import BasePage from "../BasePage";
import { Hero } from "@code4ro/taskforce-fe-components";
import BandaImage from "../../images/banda.png"
import SupportersImages from '../../images/supporters.png';

import './about.css';

const About = () => {
  return (
    <BasePage>
    <div className="container">
    <Hero title="Despre proiect" subtitle="" useFallbackIcon={true} />
      <div className="content">
        <p>
          Ești izolat la domiciliu iar telefoanele de urgență sunt împovărate 
          de numărul mare de apeluri, făcând astfel evaluarea situațiilor 
          medicale la nivel național o problemă reală. 
          Oare câți alții ca tine sunt în situația ta?
        </p>
        <p>
          Stăm Acasă este o soluție digitală cu ajutorul căreia reducem 
          suprasolicitarea numerelor de urgență, colectăm rapid informații 
          de la o populație foarte mare și vom facilita astfel o evaluare 
          constantă oferind sprijin în managementul cazurilor pentru autorități.
        </p>
        <p>
          Stăm Acasă este un proiect dezvoltat în parteneriat cu Guvernul României 
          prin Autoritatea pentru Digitalizarea României, cu colaborarea 
          Ministerului Sănătății, de către organizația Code for Romania, 
          în cadrul programului Code for Romania Task Force.
        </p>
        <div>
          <img
              src={BandaImage}
              alt="Code for Romania, ADR"
              className="logo-partnership"
            />
        </div>
        <div className="has-text-centered">
          <hr />
          <p>
            <b>Programul Code for Romania Task Force este susținut de:</b>
          </p>
          <div>
            <img
              src={SupportersImages}
              alt="ING Romanian American Foundation Fundația Vodafone România"
              className="logo-partnership"
            />
          </div>
        </div>
      </div>
    </div>
    </BasePage>
  );
};

export default About;
