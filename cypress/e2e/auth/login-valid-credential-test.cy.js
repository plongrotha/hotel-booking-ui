const {
  log,
} = require("@angular-devkit/build-angular/src/builders/ssr-dev-server");

describe("Access Owner Dashboard", () => {
  it("should login successfully and navigate to the profile page", () => {
    const username = "admin";
    const password = "password123";
    const users = [
      { username: "client", password: "123456" },
      { username: "admin", password: "password123" },
      { username: "owner", password: "123456" },
    ];
    cy.visit("http://localhost:4200/sign-in");
    cy.wait(1000);
    cy.get("#username-input").type(users[1].username);
    cy.wait(1000);
    cy.get("#password-input").type(users[1].password);
    cy.wait(1000);
    cy.get("#sign-in-submit-btn").click();
    cy.wait(1000);
    cy.url().should("include", "/profile");

    // Cypress does not support if/else directly; use .then() for conditional logic
    cy.get("body").then(($body) => {
      if ($body.text().includes("ROLE_ADMIN")) {
        cy.contains("Admin Dashboard").should("be.visible").click();
        cy.wait(1000);
        cy.url().should("include", "/admin");
      } else if ($body.text().includes("ROLE_OWNER")) {
        cy.contains("Owner Dashboard").should("be.visible").click();
        cy.wait(1000);
        cy.url().should("include", "/owner");
      }
    });
  });
});
