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
            Starea de alertă poate fi dificil de gestionat. Avem voie să ieșim
            din casă, dar urmând proceduri și reguli foarte clare. Riscul de a
            contracta virusul este foarte ridicat și este important să putem să
            ne monitorizăm starea cu ușurință și, de asemenea, este util să ne
            menținem un jurnal al ieșirilor.
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
            Jurnal Medical este o soluție digitală ale cărei principale
            beneficii, pentru cetățenii României și autoritățile sanitare
            deopotrivă, sunt:
            <ol>
              <li>atenuarea suprasolicitării numerelor de urgență;</li>
              <li>
                colectarea rapidă, constantă și în timp real a informațiilor
                relevante; de la comunități mari de cetățeni din toată țara;
              </li>
              <li>
                monitorizarea consistentă a stării de sănătate pentru
                utilizatorii platformei și pentru cei dragi lor, astfel încât să
                rămânem cu toții în siguranță.
              </li>
            </ol>
          </p>

          <p>
            Jurnal Medical este o aplicație web în care fiecare cetățean român,
            indiferent de localitate, se poate înscrie pentru a-și monitoriza
            starea de sănătate. Contul de utilizator poate fi creat prin
            intermediul site-ului. După înregistrare, utilizatorul va avea
            posibilitatea de a completa datele aferente profilului său, pe cele
            ale membrilor familiei sau ale altor persoane pe care le are în
            grijă, urmând ca apoi să completeze formularele recurente de
            monitorizare.
          </p>

          <p>
            Datele completate de utilizatorii aplicației sunt monitorizate de
            Institutul Național de Sănătate Publică și de Direcțiile de Sănătate
            Publică din toată țara, astfel încât potențialele focare să poată fi
            monitorizate și gestionate, și pentru ca noi toți să ne putem
            proteja mai bine de pericol.
          </p>

          <p>
            Jurnal Medical este un proiect dezvoltat prin parteneriat de
            Guvernul României, prin Autoritatea pentru Digitalizarea României,
            cu participarea Ministerului Sănătății și de către organizația Code
            for Romania, în cadrul programului Code for Romania Task Force.
            Platforma este administrată de Autoritatea pentru Digitalizarea
            României. Pentru orice intrebare, ne puteți contacta la adresa
            <a href="mailto:jurnalmedical@adr.gov.ro">
              jurnalmedical@adr.gov.ro
            </a>
            .
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
