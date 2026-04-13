// Tests sur l'API /orders : vérification du panier utilisateur

const apiOrders = `${Cypress.env("apiUrl")}/orders`;

describe("Tests sur l'API /orders", () => {
  before(() => {
    cy.initSession(); // Initialise la session une seule fois avant les tests
  });

  context("GET /orders", () => {
    // Test si l'accès au panier est possible sans authentification
    /*Un 401 Unauthorized est similaire à la réponse 403 Forbidden,
    sauf qu'un code 403 est retourné lorsqu'une requête contient des identifiants valides,
    mais que le client n'a pas les permissions nécessaires pour effectuer une certaine action.*/

    it("renvoie une erreur 401 (non connecté) si accès au panier sans authentification", () => {
      cy.request({
        method: "GET",
        url: apiOrders,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });

    // Test pour lister les produits du panier après authentification
    it("récupère le panier en cours chez l'utilisateur connecté", () => {
      cy.request({
        method: "GET",
        url: apiOrders,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // vérifie le bon statut
        expect(response.body)
          .to.have.property("orderLines")
          .that.is.an("array"); // Vérifie que la réponse contient un tableau de 'n' ligne(s) de commande

        // Affiche le nombre de lignes de commande
        const orderLines = response.body.orderLines;
        const orderLineCount = orderLines.length;
        if (orderLineCount === 0) {
          cy.log("Le panier est vide.");
        } else {
          cy.log(`Le panier contient ${orderLineCount} ligne(s) de commande.`);
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
