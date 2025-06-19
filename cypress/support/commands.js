// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to login
Cypress.Commands.add('login', (email, password) => {
  cy.visit('/login')
  cy.get('[data-qa="login-email"]').type(email)
  cy.get('[data-qa="login-password"]').type(password)
  cy.get('[data-qa="login-button"]').click()
})

// Custom command to register
Cypress.Commands.add('register', (name, email, password) => {
  cy.visit('/signup')
  cy.get('[data-qa="signup-name"]').type(name)
  cy.get('[data-qa="signup-email"]').type(email)
  cy.get('[data-qa="signup-button"]').click()
  cy.get('[data-qa="password"]').type(password)
  cy.get('[data-qa="first_name"]').type('Test')
  cy.get('[data-qa="last_name"]').type('User')
  cy.get('[data-qa="address"]').type('123 Test Street')
  cy.get('[data-qa="country"]').select('United States')
  cy.get('[data-qa="state"]').type('Test State')
  cy.get('[data-qa="city"]').type('Test City')
  cy.get('[data-qa="zipcode"]').type('12345')
  cy.get('[data-qa="mobile_number"]').type('1234567890')
  cy.get('[data-qa="create-account"]').click()
})

// Custom command to add product to cart
Cypress.Commands.add('addToCart', (productName) => {
  cy.contains(productName).parent().find('[data-qa="add-to-cart"]').click()
})

// Custom command to search for products
Cypress.Commands.add('searchProduct', (searchTerm) => {
  cy.get('[data-qa="search-product"]').type(searchTerm)
  cy.get('[data-qa="submit-search"]').click()
})

// Custom command to wait for page load
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible')
  cy.get('[data-qa="loading"]').should('not.exist')
})

// Custom command to generate random email
Cypress.Commands.add('generateRandomEmail', () => {
  const timestamp = Date.now()
  return `test${timestamp}@example.com`
})

// Custom command to generate random name
Cypress.Commands.add('generateRandomName', () => {
  const timestamp = Date.now()
  return `TestUser${timestamp}`
})

// Custom command to check if element is visible and clickable
Cypress.Commands.add('clickIfVisible', (selector) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      cy.get(selector).should('be.visible').click()
    }
  })
})

// Custom command to scroll to element
Cypress.Commands.add('scrollToElement', (selector) => {
  cy.get(selector).scrollIntoView()
})

// Custom command to wait for API response
Cypress.Commands.add('waitForApi', (method, url, alias) => {
  cy.intercept(method, url).as(alias)
  cy.wait(`@${alias}`)
})

// Override visit command to add custom headers
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, {
    ...options,
    headers: {
      'User-Agent': 'Cypress Test Runner',
      ...options?.headers
    }
  })
}) 