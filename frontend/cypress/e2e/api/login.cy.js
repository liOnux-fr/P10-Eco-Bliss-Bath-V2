// Tests sur l'API /login : vérification de la connexion utilisateur

import { fakerFR } from "@faker-js/faker";

describe("Tests sur l'API /login", () => {
  context("POST /login", () => {
    it("se connecte avec des identifiants valides", () => {
      // Initialise la session avec des identifiants valides

      cy.initSession().then(() => {
        expect(Cypress.env("status")).to.eq(200);
        expect(Cypress.env("token")).to.exist;
      });
    });

    it("échoue avec des identifiants invalides", () => {
      // Tentative de connexion avec des identifiants invalides

      let badUsername = fakerFR.internet.email();
      let badPassword = fakerFR.internet.password();
      cy.connect(badUsername, badPassword).then(() => {
        expect(Cypress.env("status")).to.eq(401);
      });
    });
  });
});
