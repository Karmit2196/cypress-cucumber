import BasePage from './BasePage.js'
import users from '../fixtures/users.json';
import { generateRandomEmail, generateRandomName } from '../support/utils.js';
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants.js';

class LoginPage extends BasePage {
  constructor() {
    super()
    this.url = '/login'
    
    // Page elements (confirmed from inspection)
    this.elements = {
      // Login form
      loginEmail: '[data-qa="login-email"]',
      loginPassword: '[data-qa="login-password"]',
      loginButton: '[data-qa="login-button"]',
      loginFormContainer: '.login-form',
      loginFormTitle: '.login-form h2',
      loginErrorMessage: '.login-form p',
      
      // Signup form
      signupName: '[data-qa="signup-name"]',
      signupEmail: '[data-qa="signup-email"]',
      signupButton: '[data-qa="signup-button"]',
      signupFormContainer: '.signup-form',
      signupFormTitle: '.signup-form h2',
      signupErrorMessage: '.signup-form p',
      
      // Registration form (to be updated if needed)
      password: 'input[name="password"]',
      firstName: 'input[name="first_name"]',
      lastName: 'input[name="last_name"]',
      address: 'input[name="address1"]',
      country: 'select[name="country"]',
      state: 'input[name="state"]',
      city: 'input[name="city"]',
      zipcode: 'input[name="zipcode"]',
      mobileNumber: 'input[name="mobile_number"]',
      createAccountButton: 'button[type="submit"]',
      
      // Messages (to be updated after inspecting error/success messages)
      accountCreatedMessage: 'h2:contains("Account Created!")', // Placeholder
      
      // Navigation
      continueButton: 'a[data-qa="continue-button"], .btn-success',
      deleteAccountButton: 'a[href="/delete_account"], .btn-danger',
    }
  }

  // Navigate to login page
  navigateToLogin() {
    return this.visit(this.url)
  }

  // Login functionality
  login(email, password) {
    if (email) {
      this.typeText(this.elements.loginEmail, email)
    } else {
      this.getElement(this.elements.loginEmail).clear()
    }
    if (password) {
      this.typeText(this.elements.loginPassword, password)
    } else {
      this.getElement(this.elements.loginPassword).clear()
    }
    this.clickElement(this.elements.loginButton)
    return this
  }

  // Signup functionality
  signup(name, email) {
    if (name) {
      this.typeText(this.elements.signupName, name)
    } else {
      this.getElement(this.elements.signupName).clear()
    }
    if (email) {
      this.typeText(this.elements.signupEmail, email)
    } else {
      this.getElement(this.elements.signupEmail).clear()
    }
    this.clickElement(this.elements.signupButton)
    return this
  }

  // Complete registration (update selectors based on Automation Exercise registration page)
  completeRegistration(userData) {
    // The registration form after signup uses these selectors:
    // input[name="password"], input[name="first_name"], input[name="last_name"], input[name="address1"], select[name="country"], input[name="state"], input[name="city"], input[name="zipcode"], input[name="mobile_number"]
    // Ensure all selectors are defined in this.elements
    this.typeText(this.elements.password, userData.password)
    this.typeText(this.elements.firstName, userData.firstName)
    this.typeText(this.elements.lastName, userData.lastName)
    this.typeText(this.elements.address, userData.address)
    this.selectOption(this.elements.country, userData.country)
    this.typeText(this.elements.state, userData.state)
    this.typeText(this.elements.city, userData.city)
    this.typeText(this.elements.zipcode, userData.zipcode)
    this.typeText(this.elements.mobileNumber, userData.mobileNumber)
    this.getElement(this.elements.createAccountButton).first().click()
    return this
  }

  // Quick registration with default data
  quickRegistration(name, email, password) {
    const defaultUserData = users.validUser;
    
    this.signup(name, email)
    this.completeRegistration(defaultUserData)
    return this
  }

  // Continue after account creation
  continueAfterAccountCreation() {
    this.clickElement(this.elements.continueButton)
    return this
  }

  // Delete account
  deleteAccount() {
    this.clickElement(this.elements.deleteAccountButton)
    return this
  }

  // Clear form fields
  clearLoginForm() {
    this.getElement(this.elements.loginEmail).clear()
    this.getElement(this.elements.loginPassword).clear()
    return this
  }

  clearSignupForm() {
    this.getElement(this.elements.signupName).clear()
    this.getElement(this.elements.signupEmail).clear()
    return this
  }

  // Assertions
  assertLoginPageLoaded() {
    this.getElement(this.elements.loginFormTitle).should('contain', ASSERTION_TEXTS.LOGIN_FORM_TITLE)
    this.getElement(this.elements.signupFormTitle).should('contain', ASSERTION_TEXTS.SIGNUP_FORM_TITLE)
    return this
  }

  assertLoginAndSignupFormsVisible() {
    this.isElementVisible(this.elements.loginEmail)
    this.isElementVisible(this.elements.loginPassword)
    this.isElementVisible(this.elements.loginButton)
    this.isElementVisible(this.elements.signupName)
    this.isElementVisible(this.elements.signupEmail)
    this.isElementVisible(this.elements.signupButton)
    return this
  }

  assertLoginSuccessful() {
    cy.url().should('eq', Cypress.config().baseUrl + '/')
    cy.get('body', {timeout: 10000}).should('contain', 'Logged in as')
    cy.wait(500) // Give time for UI to update
    return this
  }

  assertLoginFailed() {
    this.getElement(this.elements.loginErrorMessage).should('be.visible')
    return this
  }

  assertSignupSuccessful() {
    this.getElement(this.elements.signupEmail).should('not.exist')
    cy.get('body').should('contain', 'Enter Account Information')
    return this
  }

  assertSignupFailed() {
    this.getElement(this.elements.signupErrorMessage).should('be.visible')
    return this
  }

  assertAccountCreated() {
    this.getElement(this.elements.accountCreatedMessage).should('be.visible')
    return this
  }

  assertAccountDeleted() {
    cy.url().should('include', URL_PATHS.DELETE_ACCOUNT)
    return this
  }

  // Validation methods
  assertEmailFieldValidation() {
    this.getElement(this.elements.loginEmail).should('have.attr', 'type', 'email')
    return this
  }

  assertPasswordFieldValidation() {
    this.getElement(this.elements.loginPassword).should('have.attr', 'type', 'password')
    return this
  }

  // Get form values
  getLoginEmailValue() {
    return this.getElement(this.elements.loginEmail).invoke('val')
  }

  getSignupEmailValue() {
    return this.getElement(this.elements.signupEmail).invoke('val')
  }

  // Check if user is logged in
  isUserLoggedIn() {
    return cy.get('body').then(($body) => {
      return $body.text().includes('Logged in as')
    })
  }

  // Logout if logged in
  logoutIfLoggedIn() {
    this.isUserLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        cy.get('a[href="/logout"]').click()
      }
    })
    return this
  }

  assertEmailExistsError() {
    cy.contains('Email Address already exist!').should('be.visible');
    return this;
  }

  generateRandomUser() {
    const randomString = Math.random().toString(36).substring(2, 10);
    return {
      name: generateRandomName(),
      email: generateRandomEmail(),
      password: `password_${randomString}`,
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test St',
      country: 'United States',
      state: 'California',
      city: 'Los Angeles',
      zipcode: '90001',
      mobileNumber: '1234567890'
    };
  }
}

export default LoginPage 