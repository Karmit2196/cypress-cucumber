import BasePage from './BasePage.js'

class LoginPage extends BasePage {
  constructor() {
    super()
    this.url = '/login'
    
    // Page elements
    this.elements = {
      // Login form
      loginEmail: 'login-email',
      loginPassword: 'login-password',
      loginButton: 'login-button',
      
      // Signup form
      signupName: 'signup-name',
      signupEmail: 'signup-email',
      signupButton: 'signup-button',
      
      // Registration form
      password: 'password',
      firstName: 'first_name',
      lastName: 'last_name',
      address: 'address',
      country: 'country',
      state: 'state',
      city: 'city',
      zipcode: 'zipcode',
      mobileNumber: 'mobile_number',
      createAccountButton: 'create-account',
      
      // Messages
      loginErrorMessage: 'login-error',
      signupErrorMessage: 'signup-error',
      accountCreatedMessage: 'account-created',
      
      // Navigation
      continueButton: 'continue-button',
      deleteAccountButton: 'delete-account',
      
      // Form labels
      loginFormTitle: '.login-form h2',
      signupFormTitle: '.signup-form h2'
    }
  }

  // Navigate to login page
  navigateToLogin() {
    return this.visit(this.url)
  }

  // Login functionality
  login(email, password) {
    this.typeText(this.elements.loginEmail, email)
    this.typeText(this.elements.loginPassword, password)
    this.clickElement(this.elements.loginButton)
    return this
  }

  // Signup functionality
  signup(name, email) {
    this.typeText(this.elements.signupName, name)
    this.typeText(this.elements.signupEmail, email)
    this.clickElement(this.elements.signupButton)
    return this
  }

  // Complete registration
  completeRegistration(userData) {
    this.typeText(this.elements.password, userData.password)
    this.typeText(this.elements.firstName, userData.firstName)
    this.typeText(this.elements.lastName, userData.lastName)
    this.typeText(this.elements.address, userData.address)
    this.selectOption(this.elements.country, userData.country)
    this.typeText(this.elements.state, userData.state)
    this.typeText(this.elements.city, userData.city)
    this.typeText(this.elements.zipcode, userData.zipcode)
    this.typeText(this.elements.mobileNumber, userData.mobileNumber)
    this.clickElement(this.elements.createAccountButton)
    return this
  }

  // Quick registration with default data
  quickRegistration(name, email, password) {
    const defaultUserData = {
      password: password,
      firstName: 'Test',
      lastName: 'User',
      address: '123 Test Street',
      country: 'United States',
      state: 'Test State',
      city: 'Test City',
      zipcode: '12345',
      mobileNumber: '1234567890'
    }
    
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
    this.getElement(this.elements.loginFormTitle).should('contain', 'Login to your account')
    this.getElement(this.elements.signupFormTitle).should('contain', 'New User Signup!')
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
    cy.url().should('include', '/')
    cy.get('body').should('contain', 'Logged in as')
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
    cy.url().should('include', '/delete_account')
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
}

export default LoginPage 