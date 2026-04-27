// Tests sur l'API /orders/add : Ajout de produits au panier

// *** SWITCHER LES LIGNES PUT/POST DES QUE L'API SERA MODIFIÉE ***

const apiOrdersAdd = `${Cypress.env("apiUrl")}/orders/add`;

describe("Tests sur l'API /orders/add", () => {
  beforeEach(() => {
    cy.initSession(); // Gère la connexion et le stockage du token avant chaque test
  });

  //context("POST /orders/add", () => {
  context("PUT /orders/add", () => {
    // Test d'ajout du produit ID 5 (stock > 0 garanti par la base de tests)

    it("ajoute un produit en stock", () => {
      cy.request({
        //method: "POST",
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

    // Test d'ajout du produit ID 3 (stock en rupture garanti par la base de tests)
    it("ne peut pas ajouter un produit en rupture de stock", () => {
      cy.request({
        //method: "POST",
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
