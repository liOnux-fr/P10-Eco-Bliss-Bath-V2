// Test de la faille XSS

describe("XSS vulnerability test", () => {
  before(() => {
    cy.initSession(); // Initialise la session
  });
  it("should not execute script in product opinion", () => {
    const title = "Test XSS";
    const comment = "<script>alert('XSS');</script>";
    const rating = Math.floor(Math.random() * 5); // Génère un nombre entre 0 et 4
    cy.visit(`${Cypress.env("baseUrl")}/#/`);
    cy.getBySel("nav-link-reviews").click();
    cy.getBySel("review-input-rating-images").find("img").eq(rating).click();
    cy.getBySel("review-input-title").type(title);
    cy.getBySel("review-input-comment").type(comment);
    cy.getBySel("review-submit").click();
    cy.on("window:alert", () => {
      throw new Error("XSS détecté : le script a été exécuté !");
    });
  });
});
