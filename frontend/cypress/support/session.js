import credentials from "../fixtures/credentials.json";

// Commande pour se connecter et stocker le token :
Cypress.Commands.add("connect", (username, password) => {
  const apiLogin = `${Cypress.env("apiUrl")}/login`;
  return cy
    .request({
      method: "POST",
      url: apiLogin,
      failOnStatusCode: false,
      body: { username, password },
    })
    .then((response) => {
      if (response.status === 200) {
        Cypress.env("token", response.body.token); // stocke le token
      }
      return response;
    });
});

// Commande pour initialiser la session :
Cypress.Commands.add("initSession", () => {
  cy.session("connect", () => {
    cy.connect(credentials.username, credentials.password);
  });
});
