import { generateRandomEmail, generateRandomName } from '../support/utils.js';

class BasePage {
  constructor() {
    this.baseUrl = Cypress.config('baseUrl')
  }

  // Navigate to page
  visit(path = '') {
    cy.visit(path)
    return this
  }

  // Wait for page to load
  waitForPageLoad() {
    cy.get('body').should('be.visible')
    return this
  }

  // Get element by selector (now supports any CSS selector)
  getElement(selector) {
    return cy.get(selector)
  }

  // Click element by selector
  clickElement(selector) {
    this.getElement(selector).click()
    return this
  }

  // Type text in element by selector
  typeText(selector, text) {
    this.getElement(selector).type(text)
    return this
  }

  // Clear and type text in element by selector
  clearAndType(selector, text) {
    this.getElement(selector).clear().type(text)
    return this
  }

  // Select option from dropdown by selector
  selectOption(selector, option) {
    this.getElement(selector).select(option)
    return this
  }

  // Check if element is visible
  isElementVisible(selector) {
    return this.getElement(selector).should('be.visible')
  }

  // Check if element exists
  elementExists(selector) {
    return this.getElement(selector).should('exist')
  }

  // Scroll to element
  scrollToElement(selector) {
    this.getElement(selector).scrollIntoView()
    return this
  }

  // Wait for element to be visible
  waitForElement(selector, timeout = 10000) {
    this.getElement(selector).should('be.visible', { timeout })
    return this
  }

  // Get text from element
  getElementText(selector) {
    return this.getElement(selector).invoke('text')
  }

  // Assert element contains text
  assertElementContainsText(selector, text) {
    this.getElement(selector).should('contain', text)
    return this
  }

  // Assert element has value
  assertElementHasValue(selector, value) {
    this.getElement(selector).should('have.value', value)
    return this
  }

  // Take screenshot
  takeScreenshot(name) {
    cy.screenshot(name)
    return this
  }

  // Wait for API response
  waitForApi(method, url, alias) {
    cy.intercept(method, url).as(alias)
    cy.wait(`@${alias}`)
    return this
  }

  // Get random email
  getRandomEmail() {
    return generateRandomEmail();
  }

  // Get random name
  getRandomName() {
    return generateRandomName();
  }
}

export default BasePage 