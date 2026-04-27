// commands.js create various custom commands

import credentials from "../fixtures/credentials.json";

// Commande pour la connexion d'utilisateur
Cypress.Commands.add("connect", (username, password) => {
  return cy
    .request({
      method: "POST",
      url: `${Cypress.env("apiUrl")}/login`,
      failOnStatusCode: false,
      body: { username, password },
    })
    .then((response) => {
      Cypress.env("status", response.status); // stocke le status dans une variable Cypress
      if (response.status === 200 && response.body.token) {
        Cypress.env("token", response.body.token); // stocke le token dans une variable Cypress
        return cy.window().then((win) => {
          win.localStorage.setItem("user", response.body.token); // stocke le token dans le localStorage du navigateur
          return response;
        });
      }
      return response;
    });
});

// Commande pour la persistance de la session
Cypress.Commands.add("initSession", () => {
  cy.session("session", () => {
    return cy.connect(credentials.username, credentials.password);
  });
});

// Commande pour éviter d'écrire les "data-cy"
Cypress.Commands.add("getBySel", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

// Commande pour vider entièrement le panier
Cypress.Commands.add("emptyCart", () => {
  cy.request({
    method: "GET",
    url: `${Cypress.env("apiUrl")}/orders`,
    failOnStatusCode: false,
    headers: {
      Authorization: `Bearer ${Cypress.env("token")}`,
    },
  }).then((response) => {
    if (response.body.orderLines && response.status !== 404) {
      cy.wrap(response.body.orderLines).each((line) => {
        cy.request({
          method: "DELETE",
          url: `${Cypress.env("apiUrl")}/orders/${line.id}/delete`,
          headers: {
            Authorization: `Bearer ${Cypress.env("token")}`,
          },
        });
      });
    }
  });
});
