// Tests sur l'API /login : vérification de la connexion utilisateur

import { fakerFR } from "@faker-js/faker";
import { connect } from "../../support/connect";

describe("Tests sur l'API /login", () => {
  context("POST /login", () => {
    it("se connecte avec des identifiants valides", () => {
      // Initialise la session avec des identifiants valides

      cy.initSession().then(() => {
        const token = Cypress.env("token");
        expect(response.status).to.eq(200);
        expect(token).to.exist; // Vérifie que le token est disponible
      });
    });

    it("échoue avec des identifiants invalides", () => {
      // Tentative de connexion avec des identifiants invalides

      let badUsername = fakerFR.internet.email();
      let badPassword = fakerFR.internet.password();
      connect(badUsername, badPassword).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
});
