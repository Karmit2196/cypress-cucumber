import BasePage from './BasePage.js'

class HomePage extends BasePage {
  constructor() {
    super()
    this.url = '/'
    
    // Page elements
    this.elements = {
      // Navigation
      homeLink: 'home',
      productsLink: 'products',
      cartLink: 'cart',
      signupLoginLink: 'signup-login',
      testCasesLink: 'test-cases',
      apiTestingLink: 'api-testing',
      videoTutorialsLink: 'video-tutorials',
      contactUsLink: 'contact-us',
      
      // Header
      logo: 'logo',
      searchProduct: 'search-product',
      submitSearch: 'submit-search',
      
      // Categories
      womenCategory: 'category-women',
      menCategory: 'category-men',
      kidsCategory: 'category-kids',
      
      // Featured Products
      featuredProducts: '.features_items',
      addToCartButtons: '[data-qa="add-to-cart"]',
      viewProductLinks: '[data-qa="view-product"]',
      
      // Subscription
      subscriptionEmail: 'susbscribe_email',
      subscribeButton: 'subscribe',
      subscriptionSuccess: 'success-subscribe',
      
      // Footer
      footer: 'footer',
      scrollUpButton: 'scroll-up'
    }
  }

  // Navigate to home page
  navigateToHome() {
    return this.visit(this.url)
  }

  // Click on navigation links
  clickProducts() {
    return this.clickElement(this.elements.productsLink)
  }

  clickCart() {
    return this.clickElement(this.elements.cartLink)
  }

  clickSignupLogin() {
    return this.clickElement(this.elements.signupLoginLink)
  }

  clickTestCases() {
    return this.clickElement(this.elements.testCasesLink)
  }

  clickApiTesting() {
    return this.clickElement(this.elements.apiTestingLink)
  }

  clickVideoTutorials() {
    return this.clickElement(this.elements.videoTutorialsLink)
  }

  clickContactUs() {
    return this.clickElement(this.elements.contactUsLink)
  }

  // Search functionality
  searchProduct(searchTerm) {
    this.typeText(this.elements.searchProduct, searchTerm)
    this.clickElement(this.elements.submitSearch)
    return this
  }

  // Category navigation
  clickWomenCategory() {
    return this.clickElement(this.elements.womenCategory)
  }

  clickMenCategory() {
    return this.clickElement(this.elements.menCategory)
  }

  clickKidsCategory() {
    return this.clickElement(this.elements.kidsCategory)
  }

  // Featured products
  addProductToCart(productName) {
    cy.contains(productName)
      .parent()
      .find(this.elements.addToCartButtons)
      .click()
    return this
  }

  viewProduct(productName) {
    cy.contains(productName)
      .parent()
      .find(this.elements.viewProductLinks)
      .click()
    return this
  }

  // Subscription
  subscribeToNewsletter(email) {
    this.typeText(this.elements.subscriptionEmail, email)
    this.clickElement(this.elements.subscribeButton)
    return this
  }

  // Scroll functionality
  scrollToBottom() {
    cy.scrollTo('bottom')
    return this
  }

  scrollToTop() {
    cy.scrollTo('top')
    return this
  }

  clickScrollUp() {
    return this.clickElement(this.elements.scrollUpButton)
  }

  // Assertions
  assertHomePageLoaded() {
    this.getElement(this.elements.logo).should('be.visible')
    this.getElement(this.elements.featuredProducts).should('be.visible')
    return this
  }

  assertNavigationLinksVisible() {
    this.isElementVisible(this.elements.homeLink)
    this.isElementVisible(this.elements.productsLink)
    this.isElementVisible(this.elements.cartLink)
    this.isElementVisible(this.elements.signupLoginLink)
    this.isElementVisible(this.elements.testCasesLink)
    this.isElementVisible(this.elements.apiTestingLink)
    this.isElementVisible(this.elements.videoTutorialsLink)
    this.isElementVisible(this.elements.contactUsLink)
    return this
  }

  assertSubscriptionSuccess() {
    this.getElement(this.elements.subscriptionSuccess).should('be.visible')
    return this
  }

  assertSearchResultsContain(searchTerm) {
    cy.get('.features_items').should('contain', searchTerm)
    return this
  }

  assertNoSearchResults() {
    cy.get('.features_items').should('contain', 'No results found')
    return this
  }

  // Get featured products count
  getFeaturedProductsCount() {
    return cy.get(this.elements.featuredProducts).find('.col-sm-4').its('length')
  }

  // Check if product exists
  productExists(productName) {
    return cy.contains(productName).should('exist')
  }

  // Get product price
  getProductPrice(productName) {
    return cy.contains(productName)
      .parent()
      .find('.price')
      .invoke('text')
  }
}

export default HomePage 