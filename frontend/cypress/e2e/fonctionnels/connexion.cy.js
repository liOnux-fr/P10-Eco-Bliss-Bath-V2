// Tests fonctionnels de la connexion

describe("Tests fonctionnels de la connexion", () => {
  it("Étapes pour se connecter", () => {
    Cypress.env("token", null);
    cy.visit("#/");
    cy.getBySel("nav-link-login").should("be.visible");
    cy.getBySel("nav-link-login").click();
    cy.getBySel("login-input-username").should("be.visible");
    cy.getBySel("login-input-password").should("be.visible");
    cy.getBySel("login-submit").should("be.visible");
    cy.fixture("credentials.json").then((credentials) => {
      cy.getBySel("login-input-username").type(credentials.username); // entre le nom d'utilisateur
      cy.getBySel("login-input-password").type(credentials.password); // entre le mot de passe
      cy.getBySel("login-submit").click(); // clique sur le bouton de connexion
      cy.window().its("localStorage").invoke("getItem", "user").should("exist"); // vérifie la présence d'un token
      cy.getBySel("nav-link-cart").should("be.visible"); // vérifie que le lien vers le panier soit visible
    });
  });
});
