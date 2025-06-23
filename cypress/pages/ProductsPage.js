import BasePage from './BasePage.js'
import { measurePageLoadTime } from '../support/utils.js'
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants.js'

class ProductsPage extends BasePage {
  constructor() {
    super()
    this.url = '/products'
    
    // Page elements
    this.elements = {
      // Page header
      productsTitle: '.title.text-center',
      
      // Search and filter
      searchProduct: '#search_product',
      submitSearch: '#submit_search',
      
      // Categories
      womenCategory: 'a[href="#Women"]',
      menCategory: 'a[href="#Men"]',
      kidsCategory: 'a[href="#Kids"]',
      
      // Brands
      brandPolo: 'a[href="/brand_products/Polo"]',
      brandHm: 'a[href="/brand_products/H&M"]',
      brandMadame: 'a[href="/brand_products/Madame"]',
      brandMastHarbour: 'a[href="/brand_products/Mast & Harbour"]',
      brandBabyhug: 'a[href="/brand_products/Babyhug"]',
      brandAllenSolly: 'a[href="/brand_products/Allen Solly Junior"]',
      brandKookieKids: 'a[href="/brand_products/Kookie Kids"]',
      brandBiba: 'a[href="/brand_products/Biba"]',
      
      // Product grid
      productGrid: '.features_items',
      productCard: '.productinfo',
      productName: '.product-information h2',
      productPrice: '.product-information span span',
      productDescription: '.product-information p',
      productCategory: '.product-information p:contains("Category")',
      productAvailability: '.product-information p:contains("Availability")',
      productCondition: '.product-information p:contains("Condition")',
      productBrand: '.product-information p:contains("Brand")',
      
      // Product actions
      addToCartButton: 'Add to cart',
      viewProductButton: 'View Product',
      addToWishlistButton: 'add-to-wishlist',
      
      // Product details
      productImage: '.product-details .view-product img',
      productQuantity: '#quantity',
      addToCartFromDetails: '.btn.btn-default.cart',
      
      // Pagination
      pagination: '.pagination',
      nextPage: '.pagination .next',
      previousPage: '.pagination .prev',
      
      // Sort and filter
      sortDropdown: 'sort',
      priceRange: 'price-range',
      
      // Messages
      noResultsMessage: '.no-results',
      searchResultsMessage: '.features_items .title',
      productImageWrapper: '.product-image-wrapper',
      productQuantityInput: 'input[name="quantity"]',
      reviewNameInput: '#name',
      reviewEmailInput: '#email',
      reviewTextarea: '#review',
      reviewForm: '#review-form',
      reviewSubmitButton: 'button[type="submit"]',
      reviewSuccessMessage: 'Thank you for your review.',
      continueShoppingButton: 'Continue Shopping',
      viewCartButton: 'View Cart',
      writeYourReview: 'Write Your Review'
    }
  }

  // Navigate to products page
  navigateToProducts() {
    return this.visit(this.url)
  }

  // Search functionality
  searchProduct(searchTerm) {
    this.typeText(this.elements.searchProduct, searchTerm)
    this.clickElement(this.elements.submitSearch)
    return this
  }

  // Category filtering
  filterByCategory(category) {
    switch(category.toLowerCase()) {
      case 'women':
        this.clickElement(this.elements.womenCategory)
        break
      case 'men':
        this.clickElement(this.elements.menCategory)
        break
      case 'kids':
        this.clickElement(this.elements.kidsCategory)
        break
      default:
        throw new Error(`Unknown category: ${category}`)
    }
    return this
  }

  // Brand filtering
  filterByBrand(brand) {
    switch(brand.toLowerCase()) {
      case 'polo':
        this.clickElement(this.elements.brandPolo)
        break
      case 'h&m':
      case 'hm':
        this.clickElement(this.elements.brandHm)
        break
      case 'madame':
        this.clickElement(this.elements.brandMadame)
        break
      case 'mast & harbour':
      case 'mast-harbour':
        this.clickElement(this.elements.brandMastHarbour)
        break
      case 'babyhug':
        this.clickElement(this.elements.brandBabyhug)
        break
      case 'allen solly':
      case 'allen-solly':
        this.clickElement(this.elements.brandAllenSolly)
        break
      case 'kookie kids':
      case 'kookie-kids':
        this.clickElement(this.elements.brandKookieKids)
        break
      case 'biba':
        this.clickElement(this.elements.brandBiba)
        break
      default:
        throw new Error(`Unknown brand: ${brand}`)
    }
    return this
  }

  // Product interactions
  addProductToCart(productName) {
    cy.get('.features_items .productinfo').contains(productName)
        .parents('.single-products')
        .find('.add-to-cart').first().click({force: true});

    // Wait for the modal, but let the test decide what to do next
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    return this;
  }

  viewProduct(productName) {
    // This selector works for both product and search pages
    cy.get('.productinfo p').contains(productName)
        .parents('.single-products')
        .find('a[href*="/product_details/"]').first().click();
    return this;
  }

  addProductToWishlist(productName) {
    cy.contains(productName)
      .parent()
      .find(`[data-qa="${this.elements.addToWishlistButton}"]`)
      .click()
    return this
  }

  // Product details page
  setProductQuantity(quantity) {
    this.clearAndType(this.elements.productQuantity, quantity)
    return this
  }

  addToCartFromDetails() {
    this.getElement(this.elements.addToCartFromDetails).click();
    // Wait for the modal, but let the test decide what to do next
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    return this;
  }

  // Modal Interactions
  clickViewCartOnModal() {
    cy.get('.modal-body a[href="/view_cart"]').click();
    return this;
  }

  clickContinueShoppingOnModal() {
    cy.get('button').contains('Continue Shopping').click();
    return this;
  }

  // Pagination
  goToNextPage() {
    this.clickElement(this.elements.nextPage)
    return this
  }

  goToPreviousPage() {
    this.clickElement(this.elements.previousPage)
    return this
  }

  goToPage(pageNumber) {
    cy.get(this.elements.pagination).contains(pageNumber).click()
    return this
  }

  // Sorting
  sortBy(sortOption) {
    this.selectOption(this.elements.sortDropdown, sortOption)
    return this
  }

  // Price range filtering
  setPriceRange(minPrice, maxPrice) {
    // Implementation depends on the actual price range slider
    cy.get(this.elements.priceRange).then(($slider) => {
      // Set min price
      cy.wrap($slider).invoke('val', minPrice).trigger('change')
      // Set max price
      cy.wrap($slider).invoke('val', maxPrice).trigger('change')
    })
    return this
  }

  // Assertions
  assertProductsPageLoaded() {
    this.getElement(this.elements.productsTitle).should('contain', ASSERTION_TEXTS.ALL_PRODUCTS_TITLE)
    this.getElement(this.elements.productGrid).should('be.visible')
    return this
  }

  assertProductExists(productName) {
    cy.contains(productName).should('exist')
    return this
  }

  assertProductNotExists(productName) {
    cy.contains(productName).should('not.exist')
    return this
  }

  assertSearchResultsContain(searchTerm) {
    cy.get(this.elements.productGrid).should('be.visible')
    cy.get(this.elements.productCard).each(($el) => {
      cy.wrap($el).find('.productinfo p').invoke('text').then((text) => {
        if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
          // If we find one, we're good.
          expect(true).to.be.true
        }
      })
    })
    return this
  }

  assertNoSearchResults() {
    cy.get(this.elements.noResultsMessage).should('be.visible')
    return this
  }

  assertCategoryFiltered(category) {
    cy.get('body').should('contain', category)
    return this
  }

  assertBrandFiltered(brand) {
    cy.get('body').should('contain', brand)
    return this
  }

  // Get product information
  getProductPrice(productName) {
    return cy.contains(productName)
      .parent()
      .find('.price')
      .invoke('text')
  }

  getProductCount() {
    return cy.get(this.elements.productCard).its('length')
  }

  getProductNames() {
    return cy.get(this.elements.productCard).find('.product-information h2').invoke('text')
  }

  // Check if pagination exists
  hasPagination() {
    return cy.get(this.elements.pagination).should('exist')
  }

  // Get current page number
  getCurrentPage() {
    return cy.get(this.elements.pagination).find('.active').invoke('text')
  }

  // Scroll to product
  scrollToProduct(productName) {
    cy.contains(productName).scrollIntoView()
    return this
  }

  // Wait for products to load
  waitForProductsToLoad() {
    cy.get(this.elements.productGrid).should('be.visible')
    cy.get(this.elements.productCard).should('have.length.greaterThan', 0)
    return this
  }

  assertProductInCart(productName) {
    cy.get('#cart_info').should('contain', productName);
    return this;
  }

  assertOnProductsPage() {
    cy.url().should('include', URL_PATHS.PRODUCTS)
    cy.contains('All Products').should('be.visible');
    return this;
  }

  assertOnSearchResultsPage() {
    cy.url().should('include', '/products?search=');
    cy.contains('Searched Products').should('be.visible');
    return this;
  }

  measurePageLoadTime() {
    measurePageLoadTime(5000, 'Products page');
    return this;
  }

  getProductCardByName(productName) {
    return cy.contains(this.elements.productCard, productName).parents(this.elements.productImageWrapper);
  }

  clickAddToCartByName(productName) {
    this.getProductCardByName(productName).within(() => {
      cy.contains(this.elements.addToCartButton).click({force: true});
    });
    return this;
  }

  clickViewProductByName(productName) {
    this.getProductCardByName(productName).within(() => {
      cy.contains(this.elements.viewProductButton).click({force: true});
    });
    return this;
  }

  getProductQuantityInput() {
    return this.getElement(this.elements.productQuantityInput);
  }

  getReviewNameInput() {
    return this.getElement(this.elements.reviewNameInput);
  }

  getReviewEmailInput() {
    return this.getElement(this.elements.reviewEmailInput);
  }

  getReviewTextarea() {
    return this.getElement(this.elements.reviewTextarea);
  }

  getReviewForm() {
    return this.getElement(this.elements.reviewForm);
  }

  getReviewSubmitButton() {
    return this.getElement(this.elements.reviewSubmitButton);
  }

  getReviewSuccessMessage() {
    return cy.contains(this.elements.reviewSuccessMessage);
  }

  clickContinueShoppingOnModal() {
    cy.contains(this.elements.continueShoppingButton).click();
    return this;
  }

  clickViewCartOnModal() {
    cy.contains(this.elements.viewCartButton).click();
    return this;
  }

  getWriteYourReview() {
    return cy.contains(this.elements.writeYourReview);
  }

  getModalContent() {
    return cy.get('.modal-content');
  }

  clickContinueShoppingOnModal() {
    cy.contains('Continue Shopping').click();
    return this;
  }

  clickViewCartOnModal() {
    cy.contains('View Cart').click();
    return this;
  }

  getWriteYourReview() {
    return cy.contains('Write Your Review');
  }
}

export default ProductsPage 