// Tests sur l'API /products/{id} : retourne une fiche produit

const apiProducts = `${Cypress.env("apiUrl")}/products/3`;

describe("Tests sur l'API /products/{id}", () => {
  // Test sur le produit ID 3 présent dans la base de tests
  it("doit retourner la fiche du produit 3", () => {
    cy.request("GET", apiProducts).then((response) => {
      expect(response.status).to.eq(200); // vérifie le bon statut
      expect(response.body.id).to.eq(3); // vérifie que la requête d'ID est conforme
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
    });
  });
});
