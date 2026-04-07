// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: true,
  env: {
    apiUrl: "http://localhost:8081", // Exemple
  },
  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on, config) {
      // Configuration des événements Node ici
    },
    //specPattern: "cypress/e2e/**/*.{js,jsx}", // Pour cibler les fichiers JS
  },
});
