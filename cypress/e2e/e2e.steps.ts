import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { homePage } from '../pages/HomePage';
import { productsPage } from '../pages/ProductsPage';
import { cartPage } from '../pages/CartPage';
import { generateRandomEmail } from '../support/utils';
import { URL_PATHS } from '../support/constants';

When('I subscribe to the newsletter with a random email', () => {
  const userEmail = generateRandomEmail();
  homePage.subscribeToNewsletter(userEmail);
});

Then('the subscription should be successful', () => {
  homePage.assertSubscriptionSuccess();
});

When('I test responsive design on {string}', (viewport: string) => {
  cy.viewport(viewport);
  homePage.navigateToHome();
  homePage.assertHomePageLoaded();
});

Then('the home page should be loaded on all viewports', () => {
  // This step is handled in the previous steps
});

When('I navigate to the products page', () => {
  cy.visit('/products');
});

When('I measure the home page load time', () => {
  homePage.measurePageLoadTime();
});

Then('I should measure the products page load time', () => {
  productsPage.measurePageLoadTime();
});

When('I go to the contact us page', () => {
  homePage.goToContactUs();
});

Then('I should be on the contact us page', () => {
  cy.url().should('include', '/contact_us');
});

When('I fill the contact form with name {string} and email {string} and subject {string} and message {string}', (name: string, email: string, subject: string, message: string) => {
  homePage.getContactUsNameInput().type(name);
  homePage.getContactUsEmailInput().type(email);
  homePage.getContactUsSubjectInput().type(subject);
  homePage.getContactUsMessageTextarea().type(message);
});

When('I submit the contact form', () => {
  homePage.getContactUsSubmitButton().click();
});

When('I accept the alert', () => {
  cy.on('window:confirm', () => true);
});

Then('the contact form success message should be visible', () => {
  homePage.getContactUsSuccessMessage().should('be.visible');
});

When('I click the contact us home button', () => {
  homePage.getContactUsHomeButton().click();
});

Then('I should be on the home page', () => {
  cy.url().should('eq', Cypress.config().baseUrl + '/');
});

Given('I am on the products page', () => {
  productsPage.navigateToProducts();
});

Then('the cart subscribe input should be visible', () => {
  cartPage.getCartSubscribeInput().should('be.visible');
});

Then('the cart subscribe button should be visible', () => {
  cartPage.getCartSubscribeButton().should('be.visible');
});

When('I subscribe to the newsletter from cart with email {string}', (email: string) => {
  cartPage.getCartSubscribeInput().type(email);
  cartPage.getCartSubscribeButton().click();
});

Then('the cart subscription success should be visible', () => {
  cartPage.getCartSubscribeSuccess().should('be.visible');
});

When('I click continue shopping on the modal', () => {
  productsPage.clickContinueShoppingOnModal();
});

Then('the cart should have {int} items', (count: number) => {
  cartPage.getCartRows().should('have.length', count);
});

Then('the cart should contain {string}', (productName: string) => {
  cartPage.getCartTable().should('contain', productName);
});

Then('each cart item should have valid price, quantity, and total', () => {
  cartPage.getCartRows().each(($row: JQuery<HTMLElement>) => {
    cy.wrap($row).within(() => {
      cartPage.getCartPrice().invoke('text').should('match', /Rs\. \d+/);
      cartPage.getCartQuantity().should('contain', '1');
      cartPage.getCartTotal().invoke('text').should('match', /Rs\. \d+/);
    });
  });
  cartPage.getCartTotalPrice().should('be.visible');
});

When('I set the product quantity to {string}', (quantity: string) => {
  productsPage.getProductQuantityInput().clear().type(quantity);
});

When('I add the product to cart from details', (productName: string) => {
  productsPage.addToCartFromDetails(productName);
});

Then('the first cart item should have quantity {string}', (quantity: string) => {
  cartPage.getCartRows().first().within(() => {
    cartPage.getCartQuantity().should('contain', quantity);
  });
});

When('I remove the first item from the cart', () => {
  cartPage.getCartRows().first().within(() => {
    cartPage.getCartDeleteButton().click();
  });
});

Then('the cart should be empty', () => {
  cartPage.getCartRows().should('not.exist');
});

Then('the cart empty message should be visible', () => {
  cartPage.getCartEmptyMessage().should('be.visible');
});

When('I scroll to the review section', () => {
  productsPage.getWriteYourReview().scrollIntoView();
});

Then('the review section should be visible', () => {
  productsPage.getWriteYourReview().should('be.visible');
});

When('I fill the review form with name {string} and email {string} and review {string}', (name: string, email: string, review: string) => {
  productsPage.getReviewNameInput().type(name);
  productsPage.getReviewEmailInput().type(email);
  productsPage.getReviewTextarea().type(review);
});

When('I submit the review form', () => {
  productsPage.getReviewForm().within(() => {
    productsPage.getReviewSubmitButton().click();
  });
});

Then('the review success message should be visible', () => {
  productsPage.getReviewSuccessMessage().should('be.visible');
});

When('I add product {string} to the cart', (productName: string) => {
  productsPage.clickAddToCartByName(productName);
});

When('I view product {string}', (productName: string) => {
  productsPage.clickViewProductByName(productName);
});

Then('I should be on the products page', () => {
  cy.url().should('include', '/products');
});

When('I click view cart on the modal', () => {
  // Assuming the modal has a button or link to view cart
  // You may need to update the selector based on your modal implementation
  cy.get('.modal').contains('View Cart').click({ force: true });
});

Then('I should be on the product details page', () => {
  cy.url().should('include', '/product_details/');
});

When('I click the signup/login link', () => {
  homePage.clickSignupLogin();
}); 