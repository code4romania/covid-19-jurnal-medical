import authDetails from "../support/authDetails.json";
import "../../public/env-config";

describe("Stam Acasa", function() {
  const API_URL = window._env_.REACT_APP_API_URL;
  const IDP_URL = window._env_.REACT_APP_IDP_URL;

  const BEARER_TOKEN = "something-really-secret";
  const mockLogin = () => {
    authDetails.access_token = BEARER_TOKEN;
    window.sessionStorage.setItem(
      `oidc.user:${IDP_URL}:js`,
      JSON.stringify(authDetails)
    );
  };

  describe("Main logged in journeys", () => {
    const stubProfile = data => {
      cy.routeUseAuth(
        {
          method: "GET",
          url: `${API_URL}/api/profile`,
          response: data
        },
        BEARER_TOKEN
      );
    };

    const stubDependants = data => {
      cy.routeUseAuth(
        {
          method: "GET",
          url: `${API_URL}/api/profile/family`,
          response: data
        },
        BEARER_TOKEN
      );
    };

    const stubFormResponses = (data, userId) => {
      cy.routeUseAuth(
        {
          method: "GET",
          url: `${API_URL}/api/form?id=${userId}`,
          response: data
        },
        BEARER_TOKEN
      );
    };
    beforeEach(() => {
      mockLogin();
      cy.server();
    });

    it("can create it's own profile", function() {
      cy.routeUseAuth(
        {
          method: "POST",
          url: `${API_URL}/api/profile`,
          response: "fixture:profile.json"
        },
        BEARER_TOKEN
      ).as("postProfile");
      stubProfile("");
      cy.visit("/");
      cy.visit("/account/me");
      cy.get("[name='nume']").type("Ion");
      cy.get("[name='surname']").type("Popescu");
      cy.get("[name='phoneNumber']").type("1234");
      cy.contains("Judet").click();
      cy.contains("Alba").click();
      cy.contains("Localitatea").click();
      cy.contains("Abrud").click();
      cy.get("[name='age']").type("41");
      cy.get("[name='gender']").select("1");
      cy.contains("Continuă").click();

      cy.get("[data-testid='smoker']")
        .contains("Da")
        .click();
      cy.get("[data-testid='preexistingMedicalCondition']")
        .contains("Diabet")
        .click();
      cy.contains("Continuă").click();

      cy.get("[data-testid='quarantineStatus']")
        .contains("Altă situație")
        .click();
      cy.get("[data-testid='livesWithOthers']")
        .contains("Da")
        .click();
      cy.get("[data-testid='quarantineStatusOthers']")
        .contains("Altă situație")
        .click();

      stubProfile("fixture:profile.json");
      cy.contains("Continuă").click();

      cy.wait("@postProfile")
        .its("requestBody")
        .should("deep.equal", {
          name: "Ion",
          surname: "Popescu",
          phoneNumber: "1234",
          county: "Alba",
          city: "Abrud",
          age: 41,
          gender: 1,
          preexistingMedicalCondition: "Diabet",
          quarantineStatus: 4,
          smoker: true,
          livesWithOthers: true,
          quarantineStatusOthers: 4
        });
    });

    it("shows the profile with history", function() {
      stubProfile("fixture:profile.json");
      stubDependants({});
      stubFormResponses("fixture:formAnswerHistory.json", "1");

      cy.visit("/account/me");

      cy.contains("Istoric deplasări");
      cy.get("table").contains("Plimbare");
      cy.get("table").contains("Cumparaturi");

      cy.contains("Tuse intensa?");

      cy.contains("Alte Simptome");
      cy.get("table").contains("durere de cap");
    });
  });
});
