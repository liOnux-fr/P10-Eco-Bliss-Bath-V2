// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "mochawesome",
  allowCypressEnv: true,
  env: {
    apiUrl: "http://localhost:8081",
  },
  e2e: {
    baseUrl: "http://localhost:4200",
    // specPattern: "cypress/e2e/**/*.{js}", // Pour cibler les fichiers JS
    experimentalSessionAndOrigin: true, // Active cy.session
    setupNodeEvents(on, config) {
      // Configuration des événements Node ici
      return config;
    },
  },
});
