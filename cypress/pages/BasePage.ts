import { generateRandomEmail, generateRandomName } from '../support/utils';

export default class BasePage {
  constructor() {
    // The constructor is now empty as the baseUrl is accessed via the getter
  }

  visit(path: string = ''): this {
    cy.visit(path);
    return this;
  }

  waitForPageLoad(): this {
    cy.get('body').should('be.visible');
    return this;
  }

  getElement(selector: string): Cypress.Chainable {
    return cy.get(selector);
  }

  clickElement(selector: string): this {
    this.getElement(selector).click();
    return this;
  }

  typeText(selector: string, text: string): this {
    this.getElement(selector).type(text);
    return this;
  }

  clearAndType(selector: string, text: string): this {
    this.getElement(selector).clear().type(text);
    return this;
  }

  selectOption(selector: string, option: string): this {
    this.getElement(selector).select(option);
    return this;
  }

  isElementVisible(selector: string): Cypress.Chainable {
    return this.getElement(selector).should('be.visible');
  }

  elementExists(selector: string): Cypress.Chainable {
    return this.getElement(selector).should('exist');
  }

  scrollToElement(selector: string): this {
    this.getElement(selector).scrollIntoView();
    return this;
  }

  waitForElement(selector: string, timeout: number = 10000): this {
    this.getElement(selector).should('be.visible', { timeout });
    return this;
  }

  getElementText(selector: string): Cypress.Chainable<string> {
    return this.getElement(selector).invoke('text');
  }

  assertElementContainsText(selector: string, text: string): this {
    this.getElement(selector).should('contain', text);
    return this;
  }

  assertElementHasValue(selector: string, value: string): this {
    this.getElement(selector).should('have.value', value);
    return this;
  }

  takeScreenshot(name: string): this {
    cy.screenshot(name);
    return this;
  }

  waitForApi(method: string, url: string, alias: string): this {
    cy.intercept(method, url).as(alias);
    cy.wait(`@${alias}`);
    return this;
  }

  getRandomEmail(): string {
    return generateRandomEmail();
  }

  getRandomName(): string {
    return generateRandomName();
  }
} 