// describe("HotelBook Application Tests", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:4200");
//   });

//   // Homepage Tests
//   it("should load the homepage", () => {
//     cy.url().should("eq", "http://localhost:4200/");
//   });

//   it("should display the main heading", () => {
//     cy.contains("HotelBook");
//   });
//   it("should display at least the search hotels section", () => {
//     cy.contains("Search Hotels");
//   });

//   // Navigation Tests
//   it("should navigate to sign in page", () => {
//     cy.contains("Sign In").click();
//     cy.url().should("include", "/sign-in");
//   });

//   // Login Form Tests
//   describe("Login Form", () => {
//     beforeEach(() => {
//       cy.visit("http://localhost:4200/sign-in");
//     });

//     it("should fill in the login form", () => {
//       cy.get('input[formControlName="username"]').type("client4");
//       cy.get('input[formControlName="password"]').type("123456");

//       cy.get('input[formControlName="username"]').should(
//         "have.value",
//         "client4"
//       );
//       cy.get('input[formControlName="password"]').should(
//         "have.value",
//         "123456"
//       );
//     });

//     it("should successfully login and navigate to profile", () => {
//       // Step 1: Login
//       cy.get('input[formControlName="username"]').type("client4");
//       cy.get('input[formControlName="password"]').type("123456");
//       cy.get('button[type="submit"]').click();

//       // Step 2: Wait for login to complete
//       cy.url().should("not.include", "/sign-in");

//       // Step 3: Now click on profile link (it's visible only after login)
//       cy.get('a[routerLink="/profile"]').filter(":visible").click();

//       // Step 4: Verify you're on profile page
//       cy.url().should("include", "/profile");
//     });
//   });

// Profile Tests (after login)
describe("Profile Access", () => {
  beforeEach(() => {
    // Login before each profile test
    cy.visit("http://localhost:4200/sign-in");
    cy.get('input[formControlName="username"]').type("client4");
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
    cy.contains("client4"); // or whatever appears on profile page
  });
});

describe("Access Owner Dashboard", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200/sign-in");
    cy.get('input[formControlName="username"]').type("admin");
    cy.get('input[formControlName="password"]').type("password123");
    cy.get('button[type="submit"]').click();
    cy.url().should("not.include", "/sign-in");
  });

  it("should navigate to owner dashboard", () => {
    // First navigate to profile page
    cy.get('a[routerLink="/profile"]').filter(":visible").click();
    cy.url().should("include", "/profile");

    // Then click Owner Dashboard button
    cy.contains("button", "Owner Dashboard").click();
    cy.url().s;
    hould("include", "/owner");
  });
});
