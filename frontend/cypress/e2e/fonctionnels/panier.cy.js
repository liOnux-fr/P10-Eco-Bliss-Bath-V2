// Tests fonctionnels du panier

describe("Tests fonctionnels du panier", () => {
  beforeEach(() => {
    cy.initSession();
  });
  // Tests .....

  it("doit vider entièrement le panier", () => {
    cy.emptyCart();
  });

  it("teste l'ajout du produit 5 au panier", () => {
    cy.visit("#/products");
    cy.getBySel("product-link").eq(2).click();
    cy.getBySel("detail-product-name").contains("Poussière de lune");
    cy.getBySel("detail-product-add").click();
  });
});
