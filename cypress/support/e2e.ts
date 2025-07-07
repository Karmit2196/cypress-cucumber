/// <reference types="cypress" />

// Import commands.js using ES2015 syntax:
import './commands';

// Global before hook
beforeEach(() => {
  // Clear cookies and localStorage before each test
  cy.clearCookies();
  cy.clearLocalStorage();
  
  // Set viewport
  cy.viewport(1280, 720);
});

// Global after hook
afterEach(() => {
  // Take screenshot on failure
  if (Cypress.currentTest.state === 'failed') {
    cy.screenshot(`${Cypress.currentTest.title} - failed`);
  }
});

// Handle uncaught exceptions
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
}); 