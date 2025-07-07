/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<Subject>;
    register(name: string, email: string, password: string): Chainable<Subject>;
    addToCart(productName: string): Chainable<Subject>;
    searchProduct(searchTerm: string): Chainable<Subject>;
    waitForPageLoad(): Chainable<Subject>;
    generateRandomEmail(): Chainable<Subject>;
    generateRandomName(): Chainable<Subject>;
    clickIfVisible(selector: string): Chainable<Subject>;
    scrollToElement(selector: string): Chainable<Subject>;
    waitForApi(method: string, url: string, alias: string): Chainable<Subject>;
  }
} 