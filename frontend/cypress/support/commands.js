Cypress.Commands.add("routeUseAuth", (options, token) => {
  options.onRequest = xhr => {
    expect(xhr.request.headers).contain({
      Authorization: `Bearer ${token}`
    });
  };

  cy.route(options);
});
