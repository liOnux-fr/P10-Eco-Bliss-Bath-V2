// AJOUTER COMMENTAIRES *************************************************************

import { fakerFR } from "@faker-js/faker";
import credentials from "../../fixtures/credentials.json";
import { connect } from "../../support/connect";

describe("Tests sur l'API /login", () => {
  context("POST /login", () => {
    it("se connecte avec des identifiants valides", () => {
      connect(credentials.username, credentials.password).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.token).to.exist;
      });
    });

    it("échoue avec des identifiants invalides", () => {
      let badUsername = fakerFR.internet.email();
      let badPassword = fakerFR.internet.password();

      connect(badUsername, badPassword).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  });
});
