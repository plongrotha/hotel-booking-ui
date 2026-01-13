describe("Access Owner Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/sign-in");
    cy.get('input[formControlName="username"]').type("owner2");
    cy.get('input[formControlName="password"]').type("123456");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/sign-in");
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
    cy.contains("owner"); // or whatever appears on profile page
    cy.contains("ROLE_OWNER");
  });

  it("should navigate to owner dashboard", () => {
    cy.get('a[routerLink="/profile"]').filter(":visible").click();
    cy.get("#owner-btn").filter(":visible").click();
    console.log("Clicked on Owner Dashboard button");
    cy.get("#hotels-tab-btn").filter(":visible").click();
    cy.get("#view-rooms-btn").first().filter(":visible").click();
    cy.get("#edit-rooms-btn").filter(":visible").click();
    cy.get("#editPrice").clear().type("20");
    cy.get("#update-room-btn").filter(":visible").click();
  });
});
