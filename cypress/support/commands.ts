/// <reference types="cypress" />

// Custom command to login
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login');
  cy.get('[data-qa="login-email"]').type(email);
  cy.get('[data-qa="login-password"]').type(password);
  cy.get('[data-qa="login-button"]').click();
});

// Custom command to register
Cypress.Commands.add('register', (name: string, email: string, password: string) => {
  cy.visit('/signup');
  cy.get('[data-qa="signup-name"]').type(name);
  cy.get('[data-qa="signup-email"]').type(email);
  cy.get('[data-qa="signup-button"]').click();
  cy.get('[data-qa="password"]').type(password);
  cy.get('[data-qa="first_name"]').type('John');
  cy.get('[data-qa="last_name"]').type('Doe');
  cy.get('[data-qa="address"]').type('123 Test St');
  cy.get('[data-qa="state"]').type('Test State');
  cy.get('[data-qa="city"]').type('Test City');
  cy.get('[data-qa="zipcode"]').type('12345');
  cy.get('[data-qa="mobile_number"]').type('1234567890');
  cy.get('[data-qa="create-account"]').click();
});

// Custom command to add product to cart
Cypress.Commands.add('addToCart', (productName: string) => {
  cy.get('.product-information').contains(productName).parent().find('.btn-default').click();
});

// Custom command to search for products
Cypress.Commands.add('searchProduct', (searchTerm: string) => {
  cy.get('#search_product').type(searchTerm);
  cy.get('#submit_search').click();
});

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  cy.wait(1000);
});

// Custom command to generate random email
Cypress.Commands.add('generateRandomEmail', () => {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
});

// Custom command to generate random name
Cypress.Commands.add('generateRandomName', () => {
  const timestamp = Date.now();
  return `TestUser${timestamp}`;
});

// Custom command to check if element is visible and clickable
Cypress.Commands.add('clickIfVisible', (selector: string) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      cy.get(selector).click();
    }
  });
});

// Custom command to scroll to element
Cypress.Commands.add('scrollToElement', (selector: string) => {
  cy.get(selector).scrollIntoView();
});

// Custom command to wait for API response
Cypress.Commands.add('waitForApi', (method: string, url: string, alias: string) => {
  cy.intercept(method, url).as(alias);
});

// Override visit command to add custom behavior
Cypress.Commands.overwrite('visit', (originalFn, url: string, options?: any) => {
  // Add custom logic here if needed
  return originalFn(url, options);
}); 