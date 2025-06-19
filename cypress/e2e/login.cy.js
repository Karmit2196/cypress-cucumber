import LoginPage from '../pages/LoginPage.js'
import HomePage from '../pages/HomePage.js'

describe('Login and Registration Tests', () => {
  const loginPage = new LoginPage()
  const homePage = new HomePage()

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
      const email = 'test@example.com'
      const password = 'test123'
      
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
      
      // Should show validation errors
      cy.get('body').should('contain', 'Please fill out this field')
    })

    it('should fail login with invalid email format', () => {
      const invalidEmail = 'invalid-email'
      const password = 'test123'
      
      loginPage
        .login(invalidEmail, password)
        .waitForPageLoad()
      
      // Should show email validation error
      cy.get('body').should('contain', 'Please enter a valid email')
    })

    it('should clear login form fields', () => {
      loginPage
        .typeText('login-email', 'test@example.com')
        .typeText('login-password', 'test123')
        .clearLoginForm()
      
      loginPage
        .getLoginEmailValue()
        .should('eq', '')
    })
  })

  describe('Registration Functionality', () => {
    it('should register new user successfully', () => {
      const name = loginPage.generateRandomName()
      const email = loginPage.generateRandomEmail()
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
      
      // Should show validation errors
      cy.get('body').should('contain', 'Please fill out this field')
    })

    it('should fail registration with invalid email format', () => {
      const name = 'Test User'
      const invalidEmail = 'invalid-email'
      
      loginPage
        .signup(name, invalidEmail)
        .waitForPageLoad()
      
      // Should show email validation error
      cy.get('body').should('contain', 'Please enter a valid email')
    })

    it('should complete registration with all required fields', () => {
      const name = loginPage.generateRandomName()
      const email = loginPage.generateRandomEmail()
      const userData = {
        password: 'test123',
        firstName: 'John',
        lastName: 'Doe',
        address: '123 Main Street',
        country: 'United States',
        state: 'California',
        city: 'Los Angeles',
        zipcode: '90210',
        mobileNumber: '1234567890'
      }
      
      loginPage
        .signup(name, email)
        .waitForPageLoad()
        .completeRegistration(userData)
        .waitForPageLoad()
        .assertAccountCreated()
    })

    it('should clear signup form fields', () => {
      loginPage
        .typeText('signup-name', 'Test User')
        .typeText('signup-email', 'test@example.com')
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
        .clickElement('login-button')
        .waitForPageLoad()
      
      // Should show required field validation
      cy.get('body').should('contain', 'Please fill out this field')
    })
  })

  describe('Account Management', () => {
    it('should delete account successfully', () => {
      // First register a new account
      const name = loginPage.generateRandomName()
      const email = loginPage.generateRandomEmail()
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
      const email = 'test@example.com'
      const password = 'test123'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
        .assertLoginSuccessful()
      
      // Navigate to different pages
      homePage
        .clickProducts()
        .waitForPageLoad()
      
      // Should still be logged in
      loginPage.isUserLoggedIn().should('be.true')
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
      const email = 'test@example.com'
      const password = 'test123'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
        .logoutIfLoggedIn()
        .waitForPageLoad()
      
      // Should clear cookies and localStorage
      cy.getCookies().should('have.length', 0)
    })
  })

  describe('Error Handling', () => {
    it('should handle network errors gracefully', () => {
      // Intercept network requests and simulate failure
      cy.intercept('POST', '/api/verifyLogin', { forceNetworkError: true })
      
      const email = 'test@example.com'
      const password = 'test123'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
      
      // Should show appropriate error message
      cy.get('body').should('contain', 'error')
    })

    it('should handle server errors gracefully', () => {
      // Intercept network requests and simulate server error
      cy.intercept('POST', '/api/verifyLogin', { statusCode: 500 })
      
      const email = 'test@example.com'
      const password = 'test123'
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
      
      // Should show appropriate error message
      cy.get('body').should('contain', 'error')
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
      const email = 'test@example.com'
      const password = 'test123'
      
      const startTime = Date.now()
      
      loginPage
        .login(email, password)
        .waitForPageLoad()
      
      cy.get('body').should('contain', 'Logged in as').then(() => {
        const processTime = Date.now() - startTime
        expect(processTime).to.be.lessThan(5000) // 5 seconds
      })
    })
  })
}) 