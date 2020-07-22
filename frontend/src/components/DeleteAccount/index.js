import React, { useState } from "react";
import SidebarLayout from "../SidebarLayout";
import AccountApi from "../../api/accountApi";
import "./style.scss";
import { removeUser, getUser } from "../../api/auth";
const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorDeleting, setErrorDeleting] = useState(false);

  const fieldsFilled = password;

  const updatePassword = event => setPassword(event.target.value);

  const deleteProfile = async () => {
    try {
      setLoading(true);
      const user = await getUser();
      await AccountApi.deleteAccount(user.profile.email, password);
      setLoading(false);
      await removeUser();
    } catch {
      setErrorDeleting(true);
      setLoading(false);
    }
  };

  const buttonClasses = "button is-danger" + (loading ? " is-loading" : "");
  return (
    <SidebarLayout>
      <div>
        Contul tău va fi șters. Pentru a putea reutiliza această aplicație va
        trebui să îți refaci contul de utilizator. Informațiile pe care le-ai
        transmis până acum prin intermediul aplicației vor rămâne stocate în baza
        de date. Dacă dorești ca toate informațiile să fie eliminate din baza de
        date te rugăm să adresezi această cerere către:
        <p>Adresa: Strada Italiană, nr. 22, Sector 2, 020976, București</p>
        <p>E-mail: jurnalmedical@adr.gov.ro</p>
      </div>
      <form onSubmit={() => {}}>
        <div className="field">
          <label className="label">Parola</label>
          <input
            className="input is-medium"
            type="password"
            placeholder="Parola"
            value={password}
            onChange={updatePassword}
          />
        </div>
        <div className="field">
          <button
            className={buttonClasses}
            onClick={deleteProfile}
            disabled={!fieldsFilled || loading}
          >
            Șterge cont
          </button>
        </div>
      </form>
      <div className="notification is-warning" hidden={!errorDeleting}>
        <button className="delete" onClick={() => setErrorDeleting(false)} />
        Încercarea de ștergere a eșuat!
      </div>
    </SidebarLayout>
  );
};

export default DeleteAccount;
