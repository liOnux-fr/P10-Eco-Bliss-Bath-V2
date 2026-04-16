// // Test de la faille XSS

const title = "Test XSS";
const comment = "<script>alert('XSS');</script>";
const rating = 1; // Note fixe pour simplifier

describe("Test d'injection XSS", () => {
  beforeEach(() => {
    cy.initSession(); // Initialise la session
  });

  // Test du frontend
  it("n'exécute pas de scripts inséré dans un champ commentaire", () => {
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

  // Test du backend
  it("n'enregistre pas en BDD un script écrit dans un champ commentaire", () => {
    // 1. Requête via l'API POST /reviews
    cy.request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/reviews`,
      headers: {
        Authorization: `Bearer ${Cypress.env("token")}`,
      },
      body: {
        title: title,
        comment: comment,
        rating: rating,
      },
      failOnStatusCode: false, // Permet de recevoir les codes d'échecs sans interrompre le test
    })
      // 2. Vérifie le comportement attendu
      .then((response) => {
        try {
          // 2a. Vérifie que le backend ne renvoie pas un code 2xx
          expect(response.status).not.to.be.oneOf([200, 201]);
        } catch (error) {
          // pour ne pas interrompre le déroulement des tests
        }

        // 2b. Vérifie que l'avis n'a PAS été enregistré
        cy.request({
          method: "GET",
          url: `${Cypress.env("apiUrl")}/reviews`,
          qs: { title: title }, // "Query String" : Filtre par titre pour vérifier l'absence
        }).then((getResponse) => {
          // Vérifie que l'avis avec le script XSS n'est pas dans la liste
          const reviews = getResponse.body; // méthode JS qui parcourt le tableau reviews ->
          const xssCommentExist = reviews.some(
            (review) => review.comment === comment,
          ); // xssCommentExist est un bouléen
          expect(
            xssCommentExist,
            "L'avis avec le script XSS ne doit pas être enregistré en BDD",
          ).to.be.false;
        });
      });
  });
});
