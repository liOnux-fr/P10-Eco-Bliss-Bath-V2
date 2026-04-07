// cypress/e2e/api/addProducts.cy.js
const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`;

describe("Tests sur l'API /orders/add", () => {
  beforeEach(() => {
    cy.initSession(); // Gère la connexion et le stockage du token
  });

  context("PUT /orders/add", () => {
    // Test d'ajout d'un produit en stock

    it("ajoute un produit en stock", () => {
      const product = { product: 3, quantity: 1 };
      cy.request({
        method: "PUT",
        url: apiOrdersAdd,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        body: product,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });

    it("ajoute un produit en rupture de stock", () => {
      // Test d'ajout d'un produit en rupture de stock

      const product = { product: 5, quantity: 1 };
      cy.request({
        method: "PUT",
        url: apiOrdersAdd,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        body: product,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
