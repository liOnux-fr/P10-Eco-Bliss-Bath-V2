const apiProducts = `${Cypress.env("apiUrl")}/products`;

describe("Tests sur l'API /products", () => {
  let productIds = []; // crée le tableau vide des ID des produits

  before(() => {
    // Récupère la liste des produits avant tous les tests
    cy.request("GET", apiProducts).then((response) => {
      expect(response.status).to.eq(200); // vérifie le bon statut
      expect(response.body).to.be.an("array").and.not.be.empty; // vérifie que la réponse n'est pas vide
      productIds = response.body.map((product) => product.id); // récupère les ID des produits
    });
  });

  context("GET /products", () => {
    it("vérifie qu'au moins un produit existe", () => {
      expect(productIds).to.be.an("array").and.not.be.empty; // vérifie qu'il y a au moins 1 produit
    });

    it("teste la fiche d'un produit aléatoire", () => {
      const randomIndex = Math.floor(Math.random() * productIds.length); // génère un index aléatoire
      const randomId = productIds[randomIndex]; // sélectionne un produit au hasard par son ID

      cy.request("GET", `${apiProducts}/${randomId}`).then((response) => {
        expect(response.status).to.eq(200); // vérifie le bon statut
        expect(response.body.id).to.eq(randomId); // vérifie que la requête d'ID est conforme

        // Affichage des champs dans les logs Cypress
        const product = response.body;
        cy.log(`id: ${product.id}`);
        cy.log(`name: ${product.name}`);
        cy.log(`availableStock: ${product.availableStock}`);
        cy.log(`skin: ${product.skin}`);
        cy.log(`aromas: ${product.aromas}`);
        cy.log(`ingredients: ${product.ingredients}`);
        cy.log(`description: ${product.description}`);
        cy.log(`price: ${product.price}`);
        cy.log(`picture: ${product.picture}`);
        cy.log(`varieties: ${product.varieties}`);

        // Vérification des clés :
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
