import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage } from '../pages/HomePage';
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants';

Given('I am on the home page', () => {
  homePage.navigateToHome();
});

Then('the home page should be loaded', () => {
  homePage.assertHomePageLoaded();
});

Then('a screenshot of the home page is taken', () => {
  if (homePage.takeScreenshot) homePage.takeScreenshot('home-page-loaded');
});

Then('all navigation links should be visible', () => {
  homePage.assertNavigationLinksVisible();
});

When('I click the products link', () => {
  homePage.clickProducts();
});

Then('I should be on the cart page', () => {
  cy.url().should('include', URL_PATHS.CART);
});

When('I click the signup/login link', () => {
  homePage.clickSignupLogin();
});

Then('I should be on the login page', () => {
  cy.url().should('include', URL_PATHS.LOGIN);
});

When('I search for product {string}', (searchTerm: string) => {
  homePage.searchProduct(searchTerm);
});

Then('the search results should contain {string}', (searchTerm: string) => {
  homePage.assertSearchResultsContain(searchTerm);
});

Then('no search results should be shown', () => {
  homePage.assertNoSearchResults();
});

Then('I should remain on the home page', () => {
  cy.url().should('include', URL_PATHS.HOME);
});

When('I click the women category', () => {
  homePage.clickWomenCategory();
});

When('I click the men category', () => {
  homePage.clickMenCategory();
});

When('I click the kids category', () => {
  homePage.clickKidsCategory();
});

Then('I should be on the category products page', () => {
  cy.url().should('include', URL_PATHS.CATEGORY_PRODUCTS);
});

Then('the page should contain {string}', (text: string) => {
  homePage.getBody().should('contain', text);
});

Then('there should be at least one featured product', () => {
  homePage.getFeaturedProductsCount().should('be.greaterThan', 0);
});

Then('a success modal should be visible', () => {
  homePage.getModalContent().should('be.visible');
});

Then('the modal should contain {string}', (text: string) => {
  homePage.getModalContent().should('contain', text);
});

When('I close the modal', () => {
  homePage.getModalCloseButton().click({ force: true });
});

When('I scroll to product {string}', (productName: string) => {
  homePage.scrollToProduct(productName);
});

Then('the product {string} should exist', (productName: string) => {
  homePage.productExists(productName);
});

When('I set the viewport to mobile', () => {
  cy.viewport(375, 667);
});

When('I set the viewport to tablet', () => {
  cy.viewport(768, 1024);
});

Then('the load time should be less than 5000 ms', () => {
  // This is a placeholder; actual timing logic should be implemented in the page object or utils
  // homePage.measurePageLoadTime(5000, 'Home Page');
});

Then('all images should be visible and have src attribute', () => {
  homePage.getImages().each(($img: JQuery<HTMLElement>) => {
    cy.wrap($img).should('be.visible');
    cy.wrap($img).should('have.attr', 'src');
  });
});

Then('all images should have alt text', () => {
  homePage.getImages().each(($img: JQuery<HTMLElement>) => {
    cy.wrap($img).should('have.attr', 'alt');
  });
});

Then('the page should have heading tags', () => {
  homePage.getHeadings().should('exist');
});

When('I subscribe to the newsletter with email {string}', (email: string) => {
  homePage.subscribeToNewsletter(email);
});

Then('the subscription should fail', () => {
  homePage.assertSubscriptionError();
});

Then('the scroll up button should be visible', () => {
  homePage.getElement("a[href='#top'] i.fa.fa-angle-up").should('be.visible');
});

When('I click the scroll up button', () => {
  homePage.clickScrollUp();
});

Then('the page should be scrolled to the top', () => {
  cy.window().its('scrollY').should('eq', 0);
});

When('I scroll to the bottom', () => {
  homePage.scrollToBottom();
});

When('I click the cart link', () => {
  homePage.clickCart();
});

Then('the price for product {string} should contain {string}', (productName: string, priceText: string) => {
  homePage.getProductPrice(productName).should('contain', priceText);
}); 