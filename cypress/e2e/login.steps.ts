/// <reference types="cypress" />
import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import users from '../fixtures/users.json';
import { loginPage } from '../pages/LoginPage';
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants';

let registeredEmail: string;
let registeredPassword: string;

Given('I am on the login page', () => {
  loginPage.navigateToLogin();
});

When('I register a new user', () => {
  const name = loginPage.getRandomName();
  const email = loginPage.getRandomEmail();
  const password = 'test123';
  registeredEmail = email;
  registeredPassword = password;
  const userData = {
    password,
    firstName: name.split(' ')[0] || name,
    lastName: name.split(' ')[1] || 'User',
    address: `Address ${Date.now()}`,
    country: 'United States',
    state: 'Test State',
    city: 'Test City',
    zipcode: `${Math.floor(10000 + Math.random() * 89999)}`,
    mobileNumber: `${Math.floor(1000000000 + Math.random() * 8999999999)}`
  };
  cy.log(`Registering with email: ${email}`);
  loginPage.signup(name, email)
    .waitForPageLoad()
    .completeRegistration(userData)
    .waitForPageLoad()
    .assertAccountCreated()
    .continueAfterAccountCreation()
    .waitForPageLoad();
});

When('I logout', () => {
  cy.contains('Logout', { timeout: 10000 }).should('be.visible').click({ force: true });
  cy.wait(1000);
});

When('I login with the same credentials', () => {
  loginPage.navigateToLogin();
  loginPage.login(registeredEmail, registeredPassword)
    .waitForPageLoad();
});

When('I login with email {string} and password {string}', (email: string, password: string) => {
  loginPage.login(email, password).waitForPageLoad();
});

Then('I should be logged in successfully', () => {
  loginPage.assertLoginSuccessful();
});

Then('I should see a login error', () => {
  loginPage.assertLoginFailed();
});

Then('I should remain on the login page', () => {
  cy.url().should('include', URL_PATHS.LOGIN);
});

When('I type {string} into the login email field', (email: string) => {
  loginPage.typeText(loginPage.elements.loginEmail, email);
});

When('I type {string} into the login password field', (password: string) => {
  loginPage.typeText(loginPage.elements.loginPassword, password);
});

When('I clear the login form', () => {
  loginPage.clearLoginForm();
});

Then('the login email field should be empty', () => {
  loginPage.getLoginEmailValue().should('eq', '');
});

When('I signup with name {string} and email {string}', (name: string, email: string) => {
  loginPage.signup(name, email).waitForPageLoad();
});

Then('I should see a signup error', () => {
  loginPage.assertSignupFailed();
});

When('I complete registration with valid data', () => {
  const name = loginPage.getRandomName();
  const email = loginPage.getRandomEmail();
  const userData = users.validUser;
  loginPage.signup(name, email)
    .waitForPageLoad()
    .completeRegistration(userData)
    .waitForPageLoad();
});

Then('I should see the account created message', () => {
  loginPage.assertAccountCreated();
});

When('I type {string} into the signup name field', (name: string) => {
  loginPage.typeText(loginPage.elements.signupName, name);
});

When('I type {string} into the signup email field', (email: string) => {
  loginPage.typeText(loginPage.elements.signupEmail, email);
});

When('I clear the signup form', () => {
  loginPage.clearSignupForm();
});

Then('the signup email field should be empty', () => {
  loginPage.getSignupEmailValue().should('eq', '');
});

Then('the email field should have type {string}', (type: string) => {
  loginPage.assertEmailFieldValidation(type);
});

Then('the password field should have type {string}', (type: string) => {
  loginPage.assertPasswordFieldValidation(type);
});

When('I click the login button', () => {
  loginPage.clickElement(loginPage.elements.loginButton).waitForPageLoad();
});

When('I delete the account', () => {
  loginPage.deleteAccount().waitForPageLoad();
});

Then('I should see the account deleted message', () => {
  loginPage.assertAccountDeleted();
});

Then('I should be on the login page', () => {
  cy.url().should('include', URL_PATHS.LOGIN);
}); 