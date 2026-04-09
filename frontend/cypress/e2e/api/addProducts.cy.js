// Tests sur l'API /orders/add : Ajout de produits au panier

const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`;

describe("Tests sur l'API /orders/add", () => {
  beforeEach(() => {
    cy.initSession(); // Gère la connexion et le stockage du token
  });

  context("PUT /orders/add", () => {
    // Test d'ajout d'un produit en stock

    it("ajoute un produit en stock", () => {
      cy.request({
        method: "PUT",
        url: apiOrdersAdd,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        body: { product: 5, quantity: 1 },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    // Test d'ajout d'un produit en rupture de stock
    it("ne peut ajouter un produit en rupture de stock", () => {
      cy.request({
        method: "PUT",
        url: apiOrdersAdd,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        failOnStatusCode: false,
        body: { product: 3, quantity: 1 },
      }).then((response) => {
        expect(response.status).not.to.eq(200);
      });
    });
  });
});
