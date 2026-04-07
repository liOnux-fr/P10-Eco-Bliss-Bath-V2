// Tests sur l'API /reviews : ajout d'un avis

const apiReviews = `${Cypress.env("apiUrl")}/reviews`;

describe("Tests sur l'API /reviews", () => {
  beforeEach(() => {
    cy.initSession();
  });

  context("POST /reviews", () => {
    it("se connecte avec des identifiants valides et ajoute un avis", () => {
      // 1. Préparation de l'avis à envoyer
      const review = {
        title: "Test d'avis",
        comment: "Lorem ipsum",
        rating: 1,
      };

      // 2. Envoi de la requête POST pour ajouter l'avis
      cy.request({
        method: "POST",
        url: apiReviews,
        headers: {
          Authorization: `Bearer ${Cypress.env("token")}`,
        },
        body: review,
      }).then((response) => {
        // 3. Vérification de la réponse
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("id"); // Vérifie que l'avis a bien un ID
        expect(response.body.title).to.eq(review.title);
        expect(response.body.comment).to.eq(review.comment);
        expect(response.body.rating).to.eq(review.rating);
      });
    });
  });
});
