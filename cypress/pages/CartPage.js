import BasePage from './BasePage.js'
import users from '../fixtures/users.json'

class CartPage extends BasePage {
  constructor() {
    super()
    this.url = '/view_cart'
    
    // Page elements
    this.elements = {
      // Page header
      cartTitle: '#cart_info .cart_description h4 a',
      
      // Cart table
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
      
      // Product actions
      removeButton: '.cart_quantity_delete',
      updateQuantity: 'quantity',
      updateCartButton: 'update-cart',
      
      // Cart summary
      subtotal: '.cart_total_price .cart_total',
      tax: '.cart_total_price .cart_total_tax',
      total: '.cart_total_price .cart_total_amount',
      
      // Checkout
      proceedToCheckoutButton: '.btn.btn-default.check_out',
      continueShoppingButton: 'continue-shopping',
      
      // Checkout form
      checkoutForm: '.checkout-form',
      name: 'name',
      email: 'email',
      address: 'address',
      city: 'city',
      state: 'state',
      zipcode: 'zipcode',
      mobileNumber: 'mobile_number',
      country: 'country',
      
      // Payment
      cardName: '[data-qa="name-on-card"]',
      cardNumber: '[data-qa="card-number"]',
      cvc: '[data-qa="cvc"]',
      expiryMonth: '[data-qa="expiry-month"]',
      expiryYear: 'input[name="expiry_year"]',
      payAndConfirmButton: '#submit',
      
      // Order confirmation
      orderConfirmation: '.order-confirmation',
      orderNumber: '.order-number',
      orderSuccess: '#success_message .alert-success',
      
      // Messages
      cartUpdatedMessage: '.cart-updated',
      
      // Navigation
      homeButton: 'home',
      productsButton: 'products',
      cartInfoTable: '#cart_info_table',
      breadcrumb: '.breadcrumb'
    }
  }

  // Navigate to cart page
  navigateToCart() {
    return this.visit(this.url)
  }

  // Cart item management
  getCartItems() {
    return cy.get(this.elements.cartItems)
  }

  getCartItemCount() {
    return cy.get(this.elements.cartItems).its('length')
  }

  getCartItemRow(productName) {
    return cy.get(this.elements.cartInfoTable).contains('tr', productName);
  }

  removeItem(productName) {
    cy.contains(productName)
      .parent()
      .parent()
      .find(`[data-qa="${this.elements.removeButton}"]`)
      .click()
    return this
  }

  updateItemQuantity(productName, quantity) {
    this.getCartItemRow(productName)
      .find('[data-qa="quantity"]')
      .clear()
      .type(quantity);
    return this;
  }

  updateCart() {
    this.clickElement(this.elements.updateCartButton)
    return this
  }

  // Cart information
  getProductPrice(productName) {
    return cy.contains(productName)
      .parent()
      .parent()
      .find(this.elements.productPrice)
      .invoke('text')
  }

  getProductQuantity(productName) {
    return cy.contains(productName)
      .parent()
      .parent()
      .find(this.elements.productQuantity)
      .invoke('text')
  }

  getProductTotal(productName) {
    return cy.contains(productName)
      .parent()
      .parent()
      .find(this.elements.productTotal)
      .invoke('text')
  }

  // Cart totals
  getSubtotal() {
    return cy.get(this.elements.subtotal).invoke('text')
  }

  getTax() {
    return cy.get(this.elements.tax).invoke('text')
  }

  getTotal() {
    return cy.get(this.elements.total).invoke('text')
  }

  // Navigation
  proceedToCheckout() {
    this.clickElement(this.elements.proceedToCheckoutButton)
    return this
  }

  continueShopping() {
    this.clickElement(this.elements.continueShoppingButton)
    return this
  }

  // Checkout form
  fillCheckoutForm(checkoutData) {
    this.typeText(this.elements.name, checkoutData.name)
    this.typeText(this.elements.email, checkoutData.email)
    this.typeText(this.elements.address, checkoutData.address)
    this.typeText(this.elements.city, checkoutData.city)
    this.typeText(this.elements.state, checkoutData.state)
    this.typeText(this.elements.zipcode, checkoutData.zipcode)
    this.typeText(this.elements.mobileNumber, checkoutData.mobileNumber)
    this.selectOption(this.elements.country, checkoutData.country)
    return this
  }

  // Payment form
  fillPaymentForm(paymentData) {
    this.typeText(this.elements.cardName, paymentData.cardName)
    this.typeText(this.elements.cardNumber, paymentData.cardNumber)
    this.typeText(this.elements.cvc, paymentData.cvc)
    this.selectOption(this.elements.expiryMonth, paymentData.expiryMonth)
    this.selectOption(this.elements.expiryYear, paymentData.expiryYear)
    return this
  }

  payAndConfirm() {
    this.clickElement(this.elements.payAndConfirmButton)
    return this
  }

  // Quick checkout with default data
  quickCheckout() {
    const defaultCheckoutData = {
      name: 'Test User',
      email: 'test@example.com',
      address: '123 Test Street',
      city: 'Test City',
      state: 'Test State',
      zipcode: '12345',
      mobileNumber: '1234567890',
      country: 'United States'
    }

    const defaultPaymentData = {
      cardName: 'Test User',
      cardNumber: '4111111111111111',
      cvc: '123',
      expiryMonth: '12',
      expiryYear: '2025'
    }

    this.proceedToCheckout()
    this.fillCheckoutForm(defaultCheckoutData)
    this.fillPaymentForm(defaultPaymentData)
    this.payAndConfirm()
    return this
  }

  // Assertions
  assertCartPageLoaded() {
    cy.get(this.elements.breadcrumb).should('contain.text', 'Shopping Cart')
    return this
  }

  assertCartIsEmpty() {
    this.getElement(this.elements.emptyCartMessage).should('be.visible')
    return this
  }

  assertCartHasItems() {
    this.getCartItemCount().should('be.greaterThan', 0)
    return this
  }

  assertProductInCart(productName) {
    cy.contains(productName).should('exist')
    return this
  }

  assertProductNotInCart(productName) {
    cy.contains(productName).should('not.exist')
    return this
  }

  assertCartUpdated() {
    this.getElement(this.elements.cartUpdatedMessage).should('be.visible')
    return this
  }

  assertOrderConfirmation() {
    this.getElement(this.elements.orderConfirmation).should('be.visible')
    return this
  }

  assertOrderSuccess() {
    this.getElement(this.elements.orderSuccess).should('be.visible')
    return this
  }

  // Validation
  assertProductQuantity(productName, expectedQuantity) {
    this.getProductQuantity(productName).should('eq', expectedQuantity)
    return this
  }

  assertProductPrice(productName, expectedPrice) {
    this.getProductPrice(productName).should('contain', expectedPrice)
    return this
  }

  assertTotalCalculation() {
    // Get subtotal, tax, and total
    this.getSubtotal().then((subtotal) => {
      this.getTax().then((tax) => {
        this.getTotal().then((total) => {
          // Convert to numbers and validate calculation
          const subtotalNum = parseFloat(subtotal.replace(/[^0-9.]/g, ''))
          const taxNum = parseFloat(tax.replace(/[^0-9.]/g, ''))
          const totalNum = parseFloat(total.replace(/[^0-9.]/g, ''))
          
          expect(totalNum).to.equal(subtotalNum + taxNum)
        })
      })
    })
    return this
  }

  // Utility methods
  clearCart() {
    this.getCartItems().each(($item) => {
      cy.wrap($item).find(`[data-qa="${this.elements.removeButton}"]`).click()
    })
    return this
  }

  waitForCartToLoad() {
    cy.get(this.elements.cartTable).should('be.visible')
    return this
  }

  // Get order number
  getOrderNumber() {
    return this.getElement(this.elements.orderNumber).invoke('text')
  }

  getCartItemQuantity(productName) {
    return this.getCartItemRow(productName).find('.cart_quantity_input');
  }

  removeItemFromCart(productName) {
    this.getCartItemRow(productName).find('.cart_delete a').click();
    return this;
  }

  getCartTable() {
    return this.getElement(this.elements.cartTable);
  }

  getCartRows() {
    return this.getElement(this.elements.cartRows);
  }

  getCartPrice() {
    return this.getElement(this.elements.cartPrice);
  }

  getCartQuantity() {
    return this.getElement(this.elements.cartQuantity);
  }

  getCartTotal() {
    return this.getElement(this.elements.cartTotal);
  }

  getCartTotalPrice() {
    return this.getElement(this.elements.cartTotalPrice);
  }

  getCartDeleteButton() {
    return this.getElement(this.elements.cartDeleteButton);
  }

  getCartEmptyMessage() {
    return cy.contains(this.elements.cartEmptyMessage);
  }

  getCartSubscribeInput() {
    return this.getElement(this.elements.cartSubscribeInput);
  }

  getCartSubscribeButton() {
    return this.getElement(this.elements.cartSubscribeButton);
  }

  getCartSubscribeSuccess() {
    return cy.contains(this.elements.cartSubscribeSuccess);
  }
}

export default CartPage 