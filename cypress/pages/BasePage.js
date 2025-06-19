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

  // Get element by data-qa attribute
  getElement(dataQa) {
    return cy.get(`[data-qa="${dataQa}"]`)
  }

  // Click element by data-qa attribute
  clickElement(dataQa) {
    this.getElement(dataQa).click()
    return this
  }

  // Type text in element by data-qa attribute
  typeText(dataQa, text) {
    this.getElement(dataQa).type(text)
    return this
  }

  // Clear and type text in element by data-qa attribute
  clearAndType(dataQa, text) {
    this.getElement(dataQa).clear().type(text)
    return this
  }

  // Select option from dropdown by data-qa attribute
  selectOption(dataQa, option) {
    this.getElement(dataQa).select(option)
    return this
  }

  // Check if element is visible
  isElementVisible(dataQa) {
    return this.getElement(dataQa).should('be.visible')
  }

  // Check if element exists
  elementExists(dataQa) {
    return this.getElement(dataQa).should('exist')
  }

  // Scroll to element
  scrollToElement(dataQa) {
    this.getElement(dataQa).scrollIntoView()
    return this
  }

  // Wait for element to be visible
  waitForElement(dataQa, timeout = 10000) {
    this.getElement(dataQa).should('be.visible', { timeout })
    return this
  }

  // Get text from element
  getElementText(dataQa) {
    return this.getElement(dataQa).invoke('text')
  }

  // Assert element contains text
  assertElementContainsText(dataQa, text) {
    this.getElement(dataQa).should('contain', text)
    return this
  }

  // Assert element has value
  assertElementHasValue(dataQa, value) {
    this.getElement(dataQa).should('have.value', value)
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

  // Generate random email
  generateRandomEmail() {
    const timestamp = Date.now()
    return `test${timestamp}@example.com`
  }

  // Generate random name
  generateRandomName() {
    const timestamp = Date.now()
    return `TestUser${timestamp}`
  }
}

export default BasePage 