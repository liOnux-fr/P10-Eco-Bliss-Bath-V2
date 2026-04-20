<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis
Pour démarrer cet applicatif web vous devez avoir les outils suivants:
- Docker
- NodeJs

# Installation et démarrage
Clonez le projet pour le récupérer
``` 
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2
```
Pour démarrer l'API avec sa base de données.
```
docker compose up -d
```
Appuyez sur ctrl + cliquez sur le lien dans le terminal
[Swagger](http://localhost:8081/api/doc)

<br>

# Pour démarrer le frontend de l'applicatif
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Installez les dépendances du projet
```
npm i
ou
npm install (si vous préférez)
```
Démarrez le frontend
```
npm start
```
Appuyez sur ctrl + cliquez sur le lien dans le terminal
[http://localhost:4200/](http://localhost:4200/)

<br>

# Pour démarrer les tests avec Cypress
Rendez-vous dans le dossier frontend
```
cd ./frontend
```
Vérifiez que votre système d'exploitation et votre navigateur répondent aux exigences [Cypress docs](https://docs.cypress.io/app/get-started/install-cypress).

Exécutez la commande ci-dessous pour installer Cypress localement en tant que dépendance de développement :
```
npm install cypress --save-dev
```
Ouvrir Cypress avec cette commande puis choisir entre les tests de bout en bout (E2E) :
```
npx cypress open (en GUI)
ou
npx cypress run (en CLI)
```

<br>

# Pour générer les rapports de tests

Installer le rapporteur de test [mochawesome](https://www.npmjs.com/package/mochawesome) comme suit :
```
npm install --save-dev mochawesome
```
puis dans le fichier ```frontend/cypress.config.js``` en dessous de ```module.exports = defineConfig```, rajouter :
```
  reporter: 'cypress-mochawesome-reporter',
```
Les rapports seront générés automatiquement et accessibles à ```frontend/cypress/reports/html/index.html```
