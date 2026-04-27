// Tests fonctionnels du panier

describe("Tests fonctionnels du panier", () => {
  const apiUrl = Cypress.env("apiUrl");
  const apiOrders = `${apiUrl}/orders`;
  const apiProducts = `${apiUrl}/products`;

  // Utilisation directe du produit ID 5 (stock > 20 garanti par la base de tests)
  const productID = 5;
  const productPageUrl = `#/products/${productID}`;
  let productName;
  let initialStock;

  // Initialise la session et vide le panier avant chaque test
  beforeEach(() => {
    cy.initSession();
    cy.emptyCart();
    // Récupère les infos du produit ID 5 (nom et stock initial)
    cy.request("GET", `${apiProducts}/${productID}`).then((response) => {
      productName = response.body.name;
      initialStock = response.body.availableStock;
      cy.log(
        `Produit sélectionné : ${productName} (ID: ${productID}, Stock: ${initialStock})`,
      );
    });
  });

  // Test 1 : Ajout d'un produit au panier et vérification du stock
  it("teste l'ajout d'un produit au panier et vérifie la mise à jour du stock", () => {
    // 1. Va à la page du produit
    cy.visit(productPageUrl);
    cy.getBySel("detail-product-name").contains(productName);

    // 2. Saisi la quantité et ajoute au panier
    cy.getBySel("detail-product-quantity").clear().type(1);
    cy.getBySel("detail-product-add").click();

    // 3. Vérifie le panier via l'UI
    cy.visit("#/cart");
    cy.getBySel("cart-line-quantity").should("have.value", "1");

    // 4. Vérifie le panier via l'API
    cy.request({
      method: "GET",
      url: apiOrders,
      headers: { Authorization: `Bearer ${Cypress.env("token")}` },
    }).then((cartResponse) => {
      const productInCart = cartResponse.body.orderLines.find(
        (line) => line.product.id === productID,
      );
      expect(productInCart).to.exist;
      expect(productInCart.quantity).to.eq(1);
    });

    // 5. Retourne sur la page du produit et vérifie le stock
    cy.visit(productPageUrl);
    cy.getBySel("detail-product-stock").should("contain", initialStock - 1);
  });

  // Test 2 : Teste les valeurs de quantité invalides (négatif, 0, > 20)
  const invalidQuantities = ["-1", "0", "21"];

  invalidQuantities.forEach((value) => {
    it(`teste avec la quantité invalide : ${value}`, () => {
      cy.visit(productPageUrl);
      cy.getBySel("detail-product-quantity")
        .clear()
        .type(value)
        .should("have.class", "ng-invalid");
      cy.getBySel("detail-product-add").click();
      cy.url().should("not.include", "/cart");
    });
  });

  // Test 3 : Vérifie le champ de disponibilité du produit
  it("vérifie la présence du champ de disponibilité du produit", () => {
    cy.visit(productPageUrl);
    cy.getBySel("detail-product-stock").should("be.visible");
  });
});
