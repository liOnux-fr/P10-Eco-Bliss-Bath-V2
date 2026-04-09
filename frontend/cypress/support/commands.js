// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import credentials from "../fixtures/credentials.json";

// Command pour la connexion d'utilisateur
Cypress.Commands.add("connect", (username, password) => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      failOnStatusCode: false,
      body: { username, password },
    })
    .then((response) => {
      Cypress.env("status", response.status);
      Cypress.env("token", response.body.token);
      return response;
    });
});

// Command pour la persistance de la session
Cypress.Commands.add("initSession", () => {
  cy.session("session", () => {
    return cy.connect(credentials.username, credentials.password);
  });
});
