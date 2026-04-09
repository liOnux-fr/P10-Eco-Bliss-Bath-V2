// Smoke test des pages produits

describe("Page d'un produit", () => {
  it("Présence du bouton d’ajout au panier en mode connecté", () => {
    cy.initSession().then(() => {
      expect(Cypress.env("status")).to.eq(200);
      expect(Cypress.env("token")).to.exist;
    });
    cy.visit("#/products");
    cy.getBySel("product-link").first().click();
    cy.getBySel("detail-product-add").should("be.visible");
  });
});
