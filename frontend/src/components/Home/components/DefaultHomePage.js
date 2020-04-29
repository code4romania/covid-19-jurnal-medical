import React from "react";
import { Hero, SocialsShare } from "@code4ro/taskforce-fe-components";
import SidebarLayout from "../../SidebarLayout";
import { Constants } from "../../../config/constants";

class DefaultHomePage extends React.Component {
  shareableLink() {
    return window.location.host
      ? window.location.protocol + "//" + window.location.host
      : "https://stamacasa.ro";
  }

  render() {
    const link = this.shareableLink();
    return (
      <>
        <Hero title="Bine ai venit" subtitle="" useFallbackIcon={true} />
        <div className="content">
          <p>
            Ești izolat la domiciliu iar telefoanele de urgență sunt împovărate
            de numărul mare de apeluri, făcând astfel evaluarea situațiilor
            medicale la nivel național o problemă reală. Toți suntem în aceeași
            situație.
          </p>
          <p>
            Stăm acasă este o soluție digitală cu ajutorul căreia, împreună,
            reducem suprasolicitarea numerelor de urgență, colectăm rapid
            informații de la o populație foarte mare, ne monitorizăm starea de
            sănătate pentru noi și pentru cei dragi.
          </p>
        </div>
        <SocialsShare currentPage={link} />
        <SidebarLayout>
          <Hero title="Cum funcționează" />
          <div className="content">
            <p>
              Odată ce ți-ai creat un cont vei putea să îți construiești un
              profil pentru tine, respectiv membrii familiei tale sau alte
              persoane pe care le ai în grijă, cu ajutorul unui set inițial de
              întrebări.
            </p>
            <p>
              În fiecare zi vei primi notificare să completezi un chestionar de
              evaluare menit să te ajute să monitorizezi riscul unei potențiale
              infecții. Vei putea de asemenea să menții un istoric al tuturor
              ieșirilor din domiciliu ale tale sau ale membrilor familiei.
            </p>
            <p>
              Datele completate de toți utilizatorii aplicației sunt de asemenea
              monitorizate de Ministerul Sănătății și Direcțiile de Sănătate
              Publică pentru a putea gestiona potențiale focare și pentru a te
              putea proteja mai bine de pericol.
            </p>
          </div>
          <Hero title="Cum îmi creez un cont" />
          <div className="content">
            <p>
              Poți folosi această aplicație pentru a-ți monitoriza starea de
              sănătate după ce îți creezi un cont de utilizator{" "}
              <a
                href={`${Constants.idpUrl}/identity/account/register?returnUrl=${window.location}register-complete`}
              >
                aici
              </a>
              . După înregistrare vei putea să îți completezi profilul tău, pe
              al altor membri ai familiei sau al altor persoane pe care le ai în
              grijă și să completezi apoi formularele recurente de monitorizare.
            </p>
          </div>
        </SidebarLayout>
      </>
    );
  }
}
export default DefaultHomePage;
