// Tests fonctionnels du panier

describe("Tests fonctionnels du panier", () => {
  const apiUrl = Cypress.env("apiUrl");
  const apiOrders = `${apiUrl}/orders`;
  const apiProducts = `${apiUrl}/products`;

  let productID;
  let productName;
  let productPageUrl;
  let initialStock;

  // Initialise la session, vide le panier et sélectionne un produit valide avant chaque test
  beforeEach(() => {
    cy.initSession();
    cy.emptyCart();
    cy.request("GET", apiProducts).then((response) => {
      const products = response.body;
      const validProduct = products.find((p) => p.availableStock > 20); // Sélectionne un produit avec un stock > 20
      if (!validProduct) {
        // Affiche un message d'erreur et arrête le test si stock =< 20
        throw new Error(
          "Pour ce test, aucun produit avec un stock > 20 n'a été trouvé dans la base de données.",
        );
      }
      productID = validProduct.id;
      productName = validProduct.name;
      productPageUrl = `#/products/${productID}`;
      initialStock = validProduct.availableStock;
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
    cy.getBySel("cart-line-quantity").should("have.value", 1);

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
      cy.getBySel("detail-product-add").click(); // pas de message d'alerte si stock insufisant ?
      // cy.getBySel("detail-product-quantity").should("have.class", "ng-invalid"); // attendre que le champ reste invalide au lieu d'un cy.wait(500)
      cy.url().should("not.include", "/cart");
    });
  });

  // Test 3 : Vérifie le champ de disponibilité du produit
  it("vérifie la présence du champ de disponibilité du produit", () => {
    cy.visit(productPageUrl);
    cy.getBySel("detail-product-stock").should("be.visible");
  });
});
