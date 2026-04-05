import credentials from "../../fixtures/credentials.json";
import { connect } from "../../support/connect";

const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`;

describe("Tests sur l'API /order/add", () => {
  context("PUT /order/add", () => {
    it("se connecte avec des identifiants valides et ajoute un produit", () => {
      // 1. Connexion pour obtenir un token
      connect(credentials.username, credentials.password).then((response) => {
        expect(response.body.token).to.exist;
        const token = Cypress.env("token");

        // 2. Préparation du produit à ajouter
        const product = {
          product: 4,
          quantity: 4,
        };

        // 3. Envoi de la requête PUT pour ajouter le produit
        cy.request({
          method: "PUT",
          url: apiOrdersAdd,
          headers: {
            Authorization: "Bearer " + token,
          },
          body: product,
        }).then((response) => {
          // 4. Vérification de la réponse
          expect(response.status).to.eq(200);
        });
      });
    });
  });
});
