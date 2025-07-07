import BasePage from './BasePage';
import users from '../fixtures/users.json';
import { CheckoutData, PaymentData } from '../support/interfaces';
import { expect } from 'chai';

class CartPage extends BasePage {
  url: string;
  elements: { [key: string]: string };

  constructor() {
    super();
    this.url = '/view_cart';
    this.elements = {
      cartTitle: '#cart_info .cart_description h4 a',
      cartTable: '#cart_info_table',
      cartRows: '#cart_info_table tbody tr',
      cartPrice: '.cart_price',
      cartQuantity: '.cart_quantity',
      cartTotal: '.cart_total',
      cartTotalPrice: '.cart_total_price',
      cartDeleteButton: '.cart_delete a',
      cartEmptyMessage: 'Cart is empty!',
      cartSubscribeInput: '#susbscribe_email',
      cartSubscribeButton: '#subscribe',
      cartSubscribeSuccess: 'You have been successfully subscribed!',
      removeButton: '.cart_quantity_delete',
      updateQuantity: 'quantity',
      updateCartButton: 'update-cart',
      subtotal: '.cart_total_price .cart_total',
      tax: '.cart_total_price .cart_total_tax',
      total: '.cart_total_price .cart_total_amount',
      proceedToCheckoutButton: '.btn.btn-default.check_out',
      continueShoppingButton: 'continue-shopping',
      checkoutForm: '.checkout-form',
      name: 'name',
      email: 'email',
      address: 'address',
      city: 'city',
      state: 'state',
      zipcode: 'zipcode',
      mobileNumber: 'mobile_number',
      country: 'country',
      cardName: '[data-qa="name-on-card"]',
      cardNumber: '[data-qa="card-number"]',
      cvc: '[data-qa="cvc"]',
      expiryMonth: '[data-qa="expiry-month"]',
      expiryYear: 'input[name="expiry_year"]',
      payAndConfirmButton: '#submit',
      orderConfirmation: '.order-confirmation',
      orderNumber: '.order-number',
      orderSuccess: '#success_message .alert-success',
      cartUpdatedMessage: '.cart-updated',
      homeButton: 'home',
      productsButton: 'products',
      cartInfoTable: '#cart_info_table',
      breadcrumb: '.breadcrumb',
    };
  }

  navigateToCart(): this {
    return this.visit(this.url);
  }

  getCartItems(): Cypress.Chainable {
    return cy.get(this.elements.cartItems);
  }

  getCartItemCount(): Cypress.Chainable {
    return cy.get(this.elements.cartItems).its('length');
  }

  getCartItemRow(productName: string): Cypress.Chainable {
    return cy.get(this.elements.cartInfoTable).contains('tr', productName);
  }

  removeItem(productName: string): this {
    cy.contains(productName)
      .parent()
      .parent()
      .find(`[data-qa="${this.elements.removeButton}"]`)
      .click();
    return this;
  }

  updateItemQuantity(productName: string, quantity: string): this {
    this.getCartItemRow(productName)
      .find('[data-qa="quantity"]')
      .clear()
      .type(quantity);
    return this;
  }

  updateCart(): this {
    this.clickElement(this.elements.updateCartButton);
    return this;
  }

  getProductPrice(productName: string): Cypress.Chainable {
    return cy.contains(productName)
      .parent()
      .parent()
      .find(this.elements.cartPrice)
      .invoke('text');
  }

  getProductQuantity(productName: string): Cypress.Chainable {
    return cy.contains(productName)
      .parent()
      .parent()
      .find(this.elements.cartQuantity)
      .invoke('text');
  }

  getProductTotal(productName: string): Cypress.Chainable {
    return cy.contains(productName)
      .parent()
      .parent()
      .find(this.elements.cartTotal)
      .invoke('text');
  }

  getSubtotal(): Cypress.Chainable {
    return cy.get(this.elements.subtotal).invoke('text');
  }

  getTax(): Cypress.Chainable {
    return cy.get(this.elements.tax).invoke('text');
  }

  getTotal(): Cypress.Chainable {
    return cy.get(this.elements.total).invoke('text');
  }

  proceedToCheckout(): this {
    this.clickElement(this.elements.proceedToCheckoutButton);
    return this;
  }

  continueShopping(): this {
    this.clickElement(this.elements.continueShoppingButton);
    return this;
  }

  fillCheckoutForm(checkoutData: CheckoutData): this {
    this.typeText(this.elements.name, checkoutData.name);
    this.typeText(this.elements.email, checkoutData.email);
    this.typeText(this.elements.address, checkoutData.address);
    this.typeText(this.elements.city, checkoutData.city);
    this.typeText(this.elements.state, checkoutData.state);
    this.typeText(this.elements.zipcode, checkoutData.zipcode);
    this.typeText(this.elements.mobileNumber, checkoutData.mobileNumber);
    this.selectOption(this.elements.country, checkoutData.country);
    return this;
  }

  fillPaymentForm(paymentData: PaymentData): this {
    this.typeText(this.elements.cardName, paymentData.cardName);
    this.typeText(this.elements.cardNumber, paymentData.cardNumber);
    this.typeText(this.elements.cvc, paymentData.cvc);
    this.selectOption(this.elements.expiryMonth, paymentData.expiryMonth);
    this.selectOption(this.elements.expiryYear, paymentData.expiryYear);
    return this;
  }

  payAndConfirm(): this {
    this.clickElement(this.elements.payAndConfirmButton);
    return this;
  }

  quickCheckout(): this {
    const defaultCheckoutData = {
      name: 'Test User',
      email: 'test@example.com',
      address: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      zipcode: '12345',
      mobileNumber: '1234567890',
      country: 'United States',
    };
    this.fillCheckoutForm(defaultCheckoutData);
    return this;
  }

  assertCartPageLoaded(): this {
    this.getElement(this.elements.cartTitle).should('be.visible');
    return this;
  }

  assertCartIsEmpty(): this {
    cy.get('body').should('contain', this.elements.cartEmptyMessage);
    return this;
  }

  assertCartHasItems(): this {
    this.getElement(this.elements.cartTable).should('be.visible');
    return this;
  }

  assertProductInCart(productName: string): this {
    cy.get(this.elements.cartTable).should('contain', productName);
    return this;
  }

  assertProductNotInCart(productName: string): this {
    cy.get(this.elements.cartTable).should('not.contain', productName);
    return this;
  }

  assertCartUpdated(): this {
    this.getElement(this.elements.cartUpdatedMessage).should('be.visible');
    return this;
  }

  assertOrderConfirmation(): this {
    this.getElement(this.elements.orderConfirmation).should('be.visible');
    return this;
  }

  assertOrderSuccess(): this {
    this.getElement(this.elements.orderSuccess).should('be.visible');
    return this;
  }

  assertProductQuantity(productName: string, expectedQuantity: string): this {
    this.getProductQuantity(productName).should('eq', expectedQuantity);
    return this;
  }

  assertProductPrice(productName: string, expectedPrice: string): this {
    this.getProductPrice(productName).should('eq', expectedPrice);
    return this;
  }

  assertTotalCalculation(): this {
    this.getSubtotal().then((subtotal) => {
      this.getTax().then((tax) => {
        this.getTotal().then((total) => {
          // Add calculation logic here
          expect(total).to.not.be.empty;
        });
      });
    });
    return this;
  }

  clearCart(): this {
    cy.get(this.elements.cartDeleteButton).each(($button) => {
      cy.wrap($button).click();
    });
    return this;
  }

  waitForCartToLoad(): this {
    this.getElement(this.elements.cartTable).should('be.visible');
    return this;
  }

  getOrderNumber(): Cypress.Chainable {
    return this.getElement(this.elements.orderNumber).invoke('text');
  }

  getCartItemQuantity(productName: string): Cypress.Chainable {
    return this.getProductQuantity(productName);
  }

  removeItemFromCart(productName: string): this {
    return this.removeItem(productName);
  }

  getCartTable(): Cypress.Chainable {
    return cy.get(this.elements.cartTable);
  }

  getCartRows(): Cypress.Chainable {
    return cy.get(this.elements.cartRows);
  }

  getCartPrice(): Cypress.Chainable {
    return cy.get(this.elements.cartPrice);
  }

  getCartQuantity(): Cypress.Chainable {
    return cy.get(this.elements.cartQuantity);
  }

  getCartTotal(): Cypress.Chainable {
    return cy.get(this.elements.cartTotal);
  }

  getCartTotalPrice(): Cypress.Chainable {
    return cy.get(this.elements.cartTotalPrice);
  }

  getCartDeleteButton(): Cypress.Chainable {
    return cy.get(this.elements.cartDeleteButton);
  }

  getCartEmptyMessage(): Cypress.Chainable {
    return cy.get('body').contains(this.elements.cartEmptyMessage);
  }

  getCartSubscribeInput(): Cypress.Chainable {
    return cy.get(this.elements.cartSubscribeInput);
  }

  getCartSubscribeButton(): Cypress.Chainable {
    return cy.get(this.elements.cartSubscribeButton);
  }

  getCartSubscribeSuccess(): Cypress.Chainable {
    return cy.get('body').contains(this.elements.cartSubscribeSuccess);
  }
}

export const cartPage = new CartPage(); 