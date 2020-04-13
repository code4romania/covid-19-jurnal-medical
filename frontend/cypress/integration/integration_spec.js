import authDetails from "../support/authDetails.json";
describe("Stam Acasa", function() {
  const API_URL = Cypress.env("API_URL");
  const IDP_URL = Cypress.env("IDP_URL");

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
      );
      stubProfile("");
      cy.visit("/");
      cy.visit("/account/me");
      cy.get("[name='nume'").type("Ion");
      cy.get("[name='surname'").type("Popescu");
      cy.get("[name='phoneNumber'").type("1234");
      cy.get("[name='county'").select("București");
      cy.get("[name='city'").select("București");
      cy.get("[name='age'").type("41");
      cy.get("[name='gender'").select("1");
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
      cy.get("[data-testid='quarantineStatusOther']")
        .contains("Altă situație")
        .click();

      stubProfile("fixture:profile.json");
      cy.contains("Continuă").click();
    });
  });
});
