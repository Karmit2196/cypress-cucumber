import BasePage from './BasePage';
import users from '../fixtures/users.json';
import { generateRandomEmail, generateRandomName } from '../support/utils';
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants';
import { UserData } from '../support/interfaces';

class LoginPage extends BasePage {
  url: string;
  elements: any;

  constructor() {
    super();
    this.url = '/login';
    this.elements = {
      loginEmail: '[data-qa="login-email"]',
      loginPassword: '[data-qa="login-password"]',
      loginButton: '[data-qa="login-button"]',
      loginFormContainer: '.login-form',
      loginFormTitle: '.login-form h2',
      loginErrorMessage: '.login-form p',
      signupName: '[data-qa="signup-name"]',
      signupEmail: '[data-qa="signup-email"]',
      signupButton: '[data-qa="signup-button"]',
      signupFormContainer: '.signup-form',
      signupFormTitle: '.signup-form h2',
      signupErrorMessage: '.signup-form p',
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
      accountCreatedMessage: 'h2:contains("Account Created!")',
      continueButton: 'a[data-qa="continue-button"], .btn-success',
      deleteAccountButton: 'a[href="/delete_account"], .btn-danger',
    };
  }

  navigateToLogin() {
    return this.visit(this.url);
  }

  login(email: string, password: string) {
    if (email) {
      this.typeText(this.elements.loginEmail, email);
    } else {
      this.getElement(this.elements.loginEmail).clear();
    }
    if (password) {
      this.typeText(this.elements.loginPassword, password);
    } else {
      this.getElement(this.elements.loginPassword).clear();
    }
    this.clickElement(this.elements.loginButton);
    return this;
  }

  signup(name: string, email: string) {
    if (name) {
      this.typeText(this.elements.signupName, name);
    } else {
      this.getElement(this.elements.signupName).clear();
    }
    if (email) {
      this.typeText(this.elements.signupEmail, email);
    } else {
      this.getElement(this.elements.signupEmail).clear();
    }
    this.clickElement(this.elements.signupButton);
    return this;
  }

  completeRegistration(userData: UserData) {
    this.typeText(this.elements.password, userData.password);
    this.typeText(this.elements.firstName, userData.firstName);
    this.typeText(this.elements.lastName, userData.lastName);
    this.typeText(this.elements.address, userData.address);
    this.selectOption(this.elements.country, userData.country);
    this.typeText(this.elements.state, userData.state);
    this.typeText(this.elements.city, userData.city);
    this.typeText(this.elements.zipcode, userData.zipcode);
    this.typeText(this.elements.mobileNumber, userData.mobileNumber);
    this.getElement(this.elements.createAccountButton).first().click();
    return this;
  }

  quickRegistration(name: string, email: string, password: string) {
    const defaultUserData = users.validUser;
    this.signup(name, email);
    this.completeRegistration(defaultUserData);
    return this;
  }

  continueAfterAccountCreation() {
    this.clickElement(this.elements.continueButton);
    return this;
  }

  deleteAccount() {
    this.clickElement(this.elements.deleteAccountButton);
    return this;
  }

  clearLoginForm() {
    this.getElement(this.elements.loginEmail).clear();
    this.getElement(this.elements.loginPassword).clear();
    return this;
  }

  clearSignupForm() {
    this.getElement(this.elements.signupName).clear();
    this.getElement(this.elements.signupEmail).clear();
    return this;
  }

  assertLoginPageLoaded() {
    this.getElement(this.elements.loginFormTitle).should('contain', ASSERTION_TEXTS.LOGIN_FORM_TITLE);
    this.getElement(this.elements.signupFormTitle).should('contain', ASSERTION_TEXTS.SIGNUP_FORM_TITLE);
    return this;
  }

  assertLoginAndSignupFormsVisible() {
    this.isElementVisible(this.elements.loginEmail);
    this.isElementVisible(this.elements.loginPassword);
    this.isElementVisible(this.elements.loginButton);
    this.isElementVisible(this.elements.signupName);
    this.isElementVisible(this.elements.signupEmail);
    this.isElementVisible(this.elements.signupButton);
    return this;
  }

  assertLoginSuccessful() {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    cy.get('body', { timeout: 10000 }).should('contain', 'Logged in as');
    cy.wait(500);
    return this;
  }

  assertLoginFailed() {
    this.getElement(this.elements.loginErrorMessage).should('be.visible');
    return this;
  }

  assertSignupSuccessful() {
    this.getElement(this.elements.signupEmail).should('not.exist');
    cy.get('body').should('contain', 'Enter Account Information');
    return this;
  }

  assertSignupFailed() {
    this.getElement(this.elements.signupErrorMessage).should('be.visible');
    return this;
  }

  assertAccountCreated() {
    this.getElement(this.elements.accountCreatedMessage).should('be.visible');
    return this;
  }

  assertAccountDeleted() {
    cy.url().should('include', URL_PATHS.DELETE_ACCOUNT);
    return this;
  }

  assertEmailFieldValidation(type: string = 'email') {
    this.getElement(this.elements.loginEmail).should('have.attr', 'type', type);
    return this;
  }

  assertPasswordFieldValidation(type: string = 'password') {
    this.getElement(this.elements.loginPassword).should('have.attr', 'type', type);
    return this;
  }

  getLoginEmailValue() {
    return this.getElement(this.elements.loginEmail).invoke('val');
  }

  getSignupEmailValue() {
    return this.getElement(this.elements.signupEmail).invoke('val');
  }
}

export const loginPage = new LoginPage(); 