// AJOUTER COMMENTAIRES *************************************************************

const apiLogin = `${Cypress.env("apiUrl")}/login`;

export const connect = (username, password) => {
  return cy
    .request({
      method: "POST",
      url: apiLogin,
      failOnStatusCode: false,
      body: {
        username: username,
        password: password,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        Cypress.env("token", response.body.token);
      }
      return response;
    });
};
