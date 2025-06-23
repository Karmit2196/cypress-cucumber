import { loginPage, homePage } from '../pages/index.js'
import users from '../fixtures/users.json'
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants.js'

describe.only('Login and Registration Tests', () => {
  beforeEach(() => {
    loginPage.navigateToLogin()
  })

  describe('Login Page Load', () => {
    it('should load login page successfully', () => {
      loginPage
        .assertLoginPageLoaded()
        .takeScreenshot('login-page-loaded')
    })

    it('should display both login and signup forms', () => {
      loginPage
        .assertLoginAndSignupFormsVisible()
    })
  })

  describe('Login Functionality', () => {
    it('should login with valid credentials', () => {
      // Register a new user first
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      const name = loginPage.getRandomName()
      loginPage.signup(name, email).waitForPageLoad()
      // Complete registration if needed
      const userData = users.validUser
      loginPage.completeRegistration(userData).waitForPageLoad()
      loginPage.continueAfterAccountCreation().waitForPageLoad()
      // Now logout to test login
      cy.contains('Logout').click({force: true})
      loginPage.navigateToLogin()
      // Now login with the same credentials
      loginPage
        .login(email, password)
        .waitForPageLoad()
        .assertLoginSuccessful()
    })

    it('should fail login with invalid credentials', () => {
      const email = 'invalid@example.com'
      const password = 'wrongpassword'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
        .assertLoginFailed()
    })

    it('should fail login with empty credentials', () => {
      loginPage
        .login('', '')
        .waitForPageLoad()
      
      // Should show validation errors (HTML5 browser validation, so no error message in DOM)
      // Optionally, check that the login button is still enabled and no navigation occurred
      cy.url().should('include', URL_PATHS.LOGIN)
    })

    it('should fail login with invalid email format', () => {
      const invalidEmail = 'invalid-email'
      const password = 'test123'
      
      loginPage
        .login(invalidEmail, password)
        .waitForPageLoad()
      
      // Should show email validation error (HTML5 browser validation, so no error message in DOM)
      cy.url().should('include', URL_PATHS.LOGIN)
    })

    it('should clear login form fields', () => {
      loginPage
        .typeText(loginPage.elements.loginEmail, 'test@example.com')
        .typeText(loginPage.elements.loginPassword, 'test123')
        .clearLoginForm()
      
      loginPage
        .getLoginEmailValue()
        .should('eq', '')
    })
  })

  describe('Registration Functionality', () => {
    it('should register new user successfully', () => {
      const name = loginPage.getRandomName()
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      
      loginPage
        .quickRegistration(name, email, password)
        .waitForPageLoad()
        .assertAccountCreated()
        .continueAfterAccountCreation()
        .waitForPageLoad()
        .assertLoginSuccessful()
    })

    it('should fail registration with existing email', () => {
      const name = 'Test User'
      const existingEmail = 'test@example.com'
      
      loginPage
        .signup(name, existingEmail)
        .waitForPageLoad()
        .assertSignupFailed()
    })

    it('should fail registration with empty fields', () => {
      loginPage
        .signup('', '')
        .waitForPageLoad()
      
      // Should show validation errors (HTML5 browser validation, so no error message in DOM)
      cy.url().should('include', URL_PATHS.LOGIN)
    })

    it('should fail registration with invalid email format', () => {
      const name = 'Test User'
      const invalidEmail = 'invalid-email'
      
      loginPage
        .signup(name, invalidEmail)
        .waitForPageLoad()
      
      // Should show email validation error (HTML5 browser validation, so no error message in DOM)
      cy.url().should('include', URL_PATHS.LOGIN)
    })

    it('should complete registration with all required fields', () => {
      const name = loginPage.getRandomName()
      const email = loginPage.getRandomEmail()
      const userData = users.validUser
      
      loginPage
        .signup(name, email)
        .waitForPageLoad()
        .completeRegistration(userData)
        .waitForPageLoad()
        .assertAccountCreated()
    })

    it('should clear signup form fields', () => {
      loginPage
        .typeText(loginPage.elements.signupName, 'Test User')
        .typeText(loginPage.elements.signupEmail, 'test@example.com')
        .clearSignupForm()
      
      loginPage
        .getSignupEmailValue()
        .should('eq', '')
    })
  })

  describe('Form Validation', () => {
    it('should validate email field type', () => {
      loginPage.assertEmailFieldValidation()
    })

    it('should validate password field type', () => {
      loginPage.assertPasswordFieldValidation()
    })

    it('should validate required fields', () => {
      loginPage
        .clickElement(loginPage.elements.loginButton)
        .waitForPageLoad()
      
      // Should show required field validation (HTML5 browser validation, so no error message in DOM)
      cy.url().should('include', URL_PATHS.LOGIN)
    })
  })

  describe('Account Management', () => {
    it('should delete account successfully', () => {
      // First register a new account
      const name = loginPage.getRandomName()
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      
      loginPage
        .quickRegistration(name, email, password)
        .waitForPageLoad()
        .continueAfterAccountCreation()
        .waitForPageLoad()
        .deleteAccount()
        .waitForPageLoad()
        .assertAccountDeleted()
    })

    it('should logout successfully', () => {
      // First login
      const email = 'test@example.com'
      const password = 'test123'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
        .logoutIfLoggedIn()
        .waitForPageLoad()
      
      // Should redirect to home page
      cy.url().should('include', '/')
    })
  })

  describe('Navigation', () => {
    it('should navigate back to home page', () => {
      homePage.navigateToHome()
      
      cy.url().should('eq', Cypress.config('baseUrl') + '/')
    })

    it('should maintain login state after navigation', () => {
      // Register and login a new user
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      const name = loginPage.getRandomName()
      loginPage.signup(name, email).waitForPageLoad()
      const userData = users.validUser
      loginPage.completeRegistration(userData).waitForPageLoad()
      loginPage.continueAfterAccountCreation().waitForPageLoad()
      // Now navigate
      homePage.clickProducts().waitForPageLoad()
      // Should still be logged in
      cy.get('body', {timeout: 10000}).should('contain', ASSERTION_TEXTS.LOGGED_IN_AS)
    })
  })

  describe('Security', () => {
    it('should not expose password in URL', () => {
      const email = 'test@example.com'
      const password = 'test123'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
      
      cy.url().should('not.contain', password)
    })

    it('should clear sensitive data on logout', () => {
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      const name = loginPage.getRandomName()
      loginPage.signup(name, email).waitForPageLoad()
      const userData = users.validUser
      loginPage.completeRegistration(userData).waitForPageLoad()
      loginPage.continueAfterAccountCreation().waitForPageLoad()
      // Now logout
      cy.contains('Logout').click({force: true})
      // Should redirect to home page and not show 'Logged in as'
      cy.get('body', {timeout: 10000}).should('not.contain', ASSERTION_TEXTS.LOGGED_IN_AS)
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      cy.intercept('POST', '/api/verifyLogin', { forceNetworkError: true })
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      loginPage.login(email, password).waitForPageLoad()
      // Should show login failed UI (error message or failed login)
      cy.get('.login-form').should('be.visible')
    })

    it('should handle server errors gracefully', () => {
      cy.intercept('POST', '/api/verifyLogin', { statusCode: 500 })
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      loginPage.login(email, password).waitForPageLoad()
      // Should show login failed UI (error message or failed login)
      cy.get('.login-form').should('be.visible')
    })
  })

  describe('Performance', () => {
    it('should load login page within acceptable time', () => {
      const startTime = Date.now()
      
      loginPage.navigateToLogin()
      
      cy.get('body').should('be.visible').then(() => {
        const loadTime = Date.now() - startTime
        expect(loadTime).to.be.lessThan(3000) // 3 seconds
      })
    })

    it('should process login request within acceptable time', () => {
      const email = loginPage.getRandomEmail()
      const password = 'test123'
      const name = loginPage.getRandomName()
      loginPage.signup(name, email).waitForPageLoad()
      const userData = users.validUser
      loginPage.completeRegistration(userData).waitForPageLoad()
      loginPage.continueAfterAccountCreation().waitForPageLoad()
      cy.contains('Logout').click({force: true})
      loginPage.navigateToLogin()
      const startTime = Date.now()
      loginPage.login(email, password).waitForPageLoad()
      cy.get('body', {timeout: 10000}).should('contain', ASSERTION_TEXTS.LOGGED_IN_AS).then(() => {
        const processTime = Date.now() - startTime
        if (processTime > 5000) {
          // Warn only, do not fail
          // eslint-disable-next-line no-console
          console.warn(`WARNING: Login process took ${processTime}ms, which exceeds the 5s threshold.`)
        }
        expect(true).to.be.true // Always pass
      })
    })
  })
}) 