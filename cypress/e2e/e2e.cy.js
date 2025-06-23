import { loginPage, homePage, productsPage, cartPage } from '../pages/index.js'
import { generateRandomEmail } from '../support/utils.js';

context('End-to-End Tests', () => {

  describe('Newsletter Subscription Journey', () => {
    it('should demonstrate newsletter subscription functionality', () => {
      homePage.navigateToHome();
      homePage.scrollToBottom();
      const userEmail = generateRandomEmail();
      homePage.subscribeToNewsletter(userEmail);
      homePage.assertSubscriptionSuccess();
    });
  });

  describe('Responsive Design Journey', () => {
    it('should test responsive design across different viewports', () => {
      const viewports = ['iphone-6', 'ipad-2', 'macbook-15'];
      viewports.forEach(viewport => {
        cy.viewport(viewport);
        homePage.navigateToHome();
        homePage.assertHomePageLoaded();
      });
    });
  });

  describe('Basic Navigation Journey', () => {
    it('should navigate to products page', () => {
      homePage.navigateToHome();
      homePage.assertHomePageLoaded();
      cy.visit('/products');
      cy.url().should('include', '/products');
    });
  });

  describe('Performance Journey', () => {
    it('should test performance across different pages', () => {
      homePage.measurePageLoadTime();
      cy.visit('/products');
      productsPage.measurePageLoadTime();
    });
  });

 

  describe('Contact Us Form', () => {
    it('should submit the contact us form successfully', () => {
      homePage.navigateToHome();
      homePage.goToContactUs();
      cy.url().should('include', '/contact_us');
      homePage.getContactUsNameInput().type('Test User');
      homePage.getContactUsEmailInput().type('testuser@example.com');
      homePage.getContactUsSubjectInput().type('Test Subject');
      homePage.getContactUsMessageTextarea().type('This is a test message.');
      homePage.getContactUsSubmitButton().click();
      cy.on('window:confirm', () => true); // Accept alert
      homePage.getContactUsSuccessMessage().should('be.visible');
      homePage.getContactUsHomeButton().click();
      cy.url().should('eq', Cypress.config().baseUrl + '/');
    });
  });

  describe('Cart Page Subscription', () => {
    it('should subscribe to newsletter from cart page', () => {
      productsPage.navigateToProducts();
      productsPage.clickAddToCartByName('Blue Top');
      productsPage.getModalContent().should('be.visible');
      productsPage.clickViewCartOnModal();
      cy.url().should('include', '/view_cart');
      cartPage.getCartSubscribeInput().should('be.visible');
      cartPage.getCartSubscribeButton().should('be.visible');
      const email = 'carttest@example.com';
      cartPage.getCartSubscribeInput().type(email);
      cartPage.getCartSubscribeButton().click();
      cartPage.getCartSubscribeSuccess().should('be.visible');
    });
  });

  describe('Add Products in Cart', () => {
    it('should add multiple products to cart and verify details', () => {
      productsPage.navigateToProducts();
      productsPage.clickAddToCartByName('Blue Top');
      productsPage.getModalContent().should('be.visible');
      productsPage.clickContinueShoppingOnModal();
      productsPage.clickAddToCartByName('Men Tshirt');
      productsPage.getModalContent().should('be.visible');
      productsPage.clickViewCartOnModal();
      cy.url().should('include', '/view_cart');
      cartPage.getCartRows().should('have.length', 2);
      cartPage.getCartTable().should('contain', 'Blue Top');
      cartPage.getCartTable().should('contain', 'Men Tshirt');
      cartPage.getCartRows().each(($row) => {
        cy.wrap($row).within(() => {
          cartPage.getCartPrice().invoke('text').should('match', /Rs\. \d+/);
          cartPage.getCartQuantity().should('contain', '1');
          cartPage.getCartTotal().invoke('text').should('match', /Rs\. \d+/);
        });
      });
      cartPage.getCartTotalPrice().should('be.visible');
    });
  });

  describe('Verify Product quantity in Cart', () => {
    it('should add product from details page with specific quantity and verify in cart', () => {
      productsPage.navigateToProducts();
      productsPage.clickViewProductByName('Blue Top');
      cy.url().should('include', '/product_details');
      productsPage.getProductQuantityInput().clear().type('4');
      productsPage.addToCartFromDetails('Blue Top');
      productsPage.getModalContent().should('be.visible');
      productsPage.clickViewCartOnModal();
      cy.url().should('include', '/view_cart');
      cartPage.getCartTable().should('contain', 'Blue Top');
      cartPage.getCartRows().first().within(() => {
        cartPage.getCartQuantity().should('contain', '4');
      });
    });
  });

  describe('Remove Products From Cart', () => {
    it('should add product to cart and then remove it', () => {
      productsPage.navigateToProducts();
      productsPage.clickAddToCartByName('Blue Top');
      productsPage.getModalContent().should('be.visible');
      productsPage.clickViewCartOnModal();
      cy.url().should('include', '/view_cart');
      cartPage.getCartTable().should('contain', 'Blue Top');
      cartPage.getCartRows().first().within(() => {
        cartPage.getCartDeleteButton().click();
      });
      cartPage.getCartRows().should('not.exist');
      cartPage.getCartEmptyMessage().should('be.visible');
    });
  });

  describe('Add review on product', () => {
    it('should add a review to a product and verify success message', () => {
      productsPage.navigateToProducts();
      productsPage.clickViewProductByName('Blue Top');
      cy.url().should('include', '/product_details');
      productsPage.getWriteYourReview().scrollIntoView();
      productsPage.getWriteYourReview().should('be.visible');
      productsPage.getReviewNameInput().type('Test Reviewer');
      productsPage.getReviewEmailInput().type('reviewer@example.com');
      productsPage.getReviewTextarea().type('This is a great product! Highly recommended.');
      productsPage.getReviewForm().within(() => {
        productsPage.getReviewSubmitButton().click();
      });
      productsPage.getReviewSuccessMessage().should('be.visible');
    });
  });

}); 