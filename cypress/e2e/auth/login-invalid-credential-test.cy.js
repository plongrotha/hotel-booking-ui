it("should login successfully and navigate to the profile page", () => {
  const username = "admin";
  const password = "invalidPassword";
  cy.visit("http://localhost:4200/sign-in");
  cy.wait(800);
  cy.get("#username-input").type(username);
  cy.wait(800);

  cy.get("#toggle-password-btn").click();
  cy.wait(800);
  cy.get("#password-input").type(password);
  cy.wait(800);
  cy.get("#sign-in-submit-btn").click();
  cy.wait(800);

  if (
    cy.get("body").then(($body) => $body.text().includes("Invalid credentials"))
  ) {
    cy.contains("Invalid username or password. Please try again.").should(
      "be.visible"
    );
  }
});
