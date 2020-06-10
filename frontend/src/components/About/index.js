import React from "react";

import BasePage from "../BasePage";
import { Hero } from "@code4ro/taskforce-fe-components";
import BandaImage from "../../images/banda.png";
import SupportersImages from "../../images/supporters.png";

import "./about.css";

const About = () => {
  return (
    <BasePage>
      <div className="container">
        <Hero title="Despre proiect" subtitle="" useFallbackIcon={true} />
        <div className="content">
          <p>
            Starea de alertă poate fi dificil de gestionat. Avem din nou voie să
            ieșim din casă, dar urmând proceduri și reguli foarte clare. Riscul
            de a contracta virusul este foarte ridicat și este important să
            putem să ne monitorizăm starea cu ușurință și, de asemenea, este
            util să ne menținem un jurnal al ieșirilor
          </p>
          <p>
            Telefoanele de urgență sunt împovărate de numărul mare de apeluri,
            făcând astfel evaluarea situațiilor medicale la nivel național o
            problemă reală. Toți suntem în aceeași situație. Jurnal Medical este
            o soluție digitală cu ajutorul căreia, împreună, reducem
            suprasolicitarea numerelor de urgență, colectăm rapid informații de
            la o populație foarte mare, ne monitorizăm starea de sănătate pentru
            noi și pentru cei dragi și rămânem cu toții în siguranță.
          </p>
          <p>
            Jurnal Medical este un proiect dezvoltat în parteneriat cu Guvernul
            României prin Autoritatea pentru Digitalizarea României, cu
            colaborarea Ministerului Sănătății, de către organizația Code for
            Romania, în cadrul programului Code for Romania Task Force.
            Proiectul este administrat de Autoritatea pentru Digitalizarea
            României.
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
