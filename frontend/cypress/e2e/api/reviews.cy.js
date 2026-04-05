import credentials from "../../fixtures/credentials.json";
import { connect } from "../../support/connect";

const apiReviews = `${Cypress.env("apiUrl")}/reviews`;

describe("Tests sur l'API /reviews", () => {
  context("POST /reviews", () => {
    it("se connecte avec des identifiants valides et ajoute un avis", () => {
      // 1. Connexion pour obtenir un token
      connect(credentials.username, credentials.password).then((response) => {
        expect(response.body.token).to.exist;
        const token = Cypress.env("token");

        // 2. Préparation de l'avis à envoyer
        const review = {
          title: "Test d'avis",
          comment: "Lorem ipsum",
          rating: 4,
        };

        // 3. Envoi de la requête POST pour ajouter l'avis
        cy.request({
          method: "POST",
          url: apiReviews,
          headers: {
            Authorization: "Bearer " + token,
          },
          body: review,
        }).then((response) => {
          // 4. Vérification de la réponse
          expect(response.status).to.eq(200); // 201 = Created
          expect(response.body).to.have.property("id"); // Vérifie que l'avis a bien un ID
          expect(response.body.title).to.eq(review.title);
          expect(response.body.comment).to.eq(review.comment);
          expect(response.body.rating).to.eq(review.rating);
        });
      });
    });
  });
});
