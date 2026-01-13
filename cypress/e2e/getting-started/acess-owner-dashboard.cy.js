describe("Access Owner Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/sign-in");
    cy.get('input[formControlName="username"]').type("owner2");
    cy.get('input[formControlName="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/sign-in");
    cy.wait(2000); // Wait for navigation to complete
  });

  it("should display profile link when logged in", () => {
    cy.get('a[routerLink="/profile"]').should("be.visible");
  });

  it("should navigate to profile page", () => {
    cy.get('a[routerLink="/profile"]').filter(":visible").click();
    cy.url().should("include", "/profile");
  });

  it("should display profile information", () => {
    cy.get('a[routerLink="/profile"]').filter(":visible").click();
    cy.wait(2000); // Wait for profile page to load
    cy.contains("owner"); // or whatever appears on profile page
    cy.contains("ROLE_OWNER");
  });

  it("should navigate to owner dashboard", () => {
    cy.get('a[routerLink="/profile"]').filter(":visible").click();
    cy.get("#owner-btn").filter(":visible").click();
    cy.wait(2000); // Wait for owner dashboard to load
    cy.get("#hotels-tab-btn").filter(":visible").click();
    cy.get("#view-rooms-btn").first().filter(":visible").click();
    cy.get("#edit-rooms-btn").filter(":visible").click();
    cy.wait(2000); // Wait for edit modal to open
    cy.get("#editPrice").clear().type("20");
    cy.wait(1000); // Wait for input to register
    cy.get("#update-room-btn").filter(":visible").click();
  });
});
