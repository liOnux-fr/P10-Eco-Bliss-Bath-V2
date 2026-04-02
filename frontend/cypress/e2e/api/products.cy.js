const apiProducts = `${Cypress.env("apiUrl")}/products`;

describe("Tests sur l'API /products", () => {
  let productIds = [];

  before(() => {
    // Récupère la liste des produits avant tous les tests
    cy.request("GET", apiProducts).then((response) => {
      expect(response.isOkStatusCode).to.be.true;
      expect(response.body).to.be.an("array").and.not.be.empty;
      productIds = response.body.map((product) => product.id);
    });
  });

  context("GET /products", () => {
    it("vérifie qu'au moins un produit existe", () => {
      expect(productIds).to.be.an("array").and.not.be.empty;
    });

    it("teste la fiche d'un produit aléatoire", () => {
      const randomIndex = Math.floor(Math.random() * productIds.length);
      const randomId = productIds[randomIndex];

      cy.request("GET", `${apiProducts}/${randomId}`).then((response) => {
        expect(response.isOkStatusCode).to.be.true;
        expect(response.body.id).to.eq(randomId);
        expect(response.body).to.have.all.keys(
          "id",
          "name",
          "availableStock",
          "skin",
          "aromas",
          "ingredients",
          "description",
          "price",
          "picture",
          "varieties",
        );
      });
    });
  });
});
