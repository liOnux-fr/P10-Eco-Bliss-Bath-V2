import { fakerFR } from "@faker-js/faker";

describe("Tests de la connexion utilisateur", () => {
  const Url = "http://localhost:8081";
  const loginEndpoint = "/login";
  it("devrait permettre à un utilisateur de se connecter avec un email et un mot de passe valides", () => {
    const email = fakerFR.internet.email();
    const password = fakerFR.internet.password();
  });
});
