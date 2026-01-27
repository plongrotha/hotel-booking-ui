describe("Client Hotel Booking Flow", () => {
  const username = "client";
  const password = "123456";
  const totalIterations = 5;

  const users = [
    { username: "client", password: "123456" },
    { username: "admin", password: "password123" },
    { username: "owner", password: "123456" },
  ];

  before(() => {
    cy.visit("localhost:4200/sign-in");
    cy.wait(800);
    cy.get("#username-input").type(username);
    cy.wait(800);
    cy.get("#password-input").type(password);
    cy.wait(800);
    cy.get("#sign-in-submit-btn").click();
    cy.wait(800);
    cy.url().should("include", "/profile");
  });

  for (let i = 1; i <= totalIterations; i++) {
    it(`Login and logout iteration ${i}`, () => {
      cy.visit("localhost:4200/sign-in");
      cy.wait(800);
      cy.get("#username-input").type(username);
      cy.wait(800);
      cy.get("#password-input").type(password);
      cy.wait(800);
      cy.get("#sign-in-submit-btn").click();
      cy.wait(800);
      cy.url().should("include", "/profile");
      cy.wait(800);
      // Logout
      cy.get("#logout-btn").click();
      cy.wait(800);
      cy.url().should("include", "/sign-in");
    });
  }
});
