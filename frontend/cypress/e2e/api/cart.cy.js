// AJOUTER COMMENTAIRES *************************************************************

import { connect } from "../../support/connect";
import credentials from "../../fixtures/credentials.json";

const apiOrders = `${Cypress.env("apiUrl")}/orders`;

describe("Tests sur l'API /orders", () => {
  context("GET /orders", () => {
    it("renvoie une erreur 401 ou 403 si accès au panier sans authentification", () => {
      cy.request({
        method: "GET",
        url: apiOrders,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.be.oneOf([401, 403]);
      });
    });

    it("récupère le panier en cours chez l'utilisateur connecté", () => {
      connect(credentials.username, credentials.password).then((response) => {
        expect(response.body.token).to.exist;
        const token = Cypress.env("token");

        cy.request({
          method: "GET",
          url: apiOrders,
          headers: {
            Authorization: "Bearer " + token, // Ajoute le token dans l'en-tête
          },
        }).then((response) => {
          expect(response.status).to.eq(200); // vérifie le bon statut

          // Vérifie que la réponse contient un tableau de 'n' ligne(s) de commande
          expect(response.body)
            .to.have.property("orderLines")
            .that.is.an("array");

          // Affiche le nombre de lignes de commande
          const orderLines = response.body.orderLines;
          const orderLineCount = orderLines.length;
          if (orderLineCount === 0) {
            cy.log("Le panier est vide.");
          } else {
            cy.log(
              `Le panier contient ${orderLineCount} ligne(s) de commande.`,
            );
            // Parcourt chaque ligne de commande pour afficher les détails des produits
            orderLines.forEach((orderLine, index) => {
              const product = orderLine.product;
              cy.log(`--- Produit ${index + 1} :`);
              cy.log(`ID : ${product.id}`);
              cy.log(`Nom : ${product.name}`);
              cy.log(`Description : ${product.description}`);
              cy.log(`Prix : ${product.price} €`);
              cy.log(`Quantité : ${orderLine.quantity}`);
              cy.log(`Image : ${product.picture}`);
            });
          }
        });
      });
    });
  });
});
