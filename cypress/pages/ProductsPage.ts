import BasePage from './BasePage';
import { measurePageLoadTime } from '../support/utils';
import { ASSERTION_TEXTS, URL_PATHS } from '../support/constants';

class ProductsPage extends BasePage {
  url: string;
  elements: { [key: string]: string };

  constructor() {
    super();
    this.url = '/products';
    this.elements = {
      productsTitle: '.title.text-center',
      searchProduct: '#search_product',
      submitSearch: '#submit_search',
      womenCategory: 'a[href="#Women"]',
      menCategory: 'a[href="#Men"]',
      kidsCategory: 'a[href="#Kids"]',
      brandPolo: 'a[href="/brand_products/Polo"]',
      brandHm: 'a[href="/brand_products/H&M"]',
      brandMadame: 'a[href="/brand_products/Madame"]',
      brandMastHarbour: 'a[href="/brand_products/Mast & Harbour"]',
      brandBabyhug: 'a[href="/brand_products/Babyhug"]',
      brandAllenSolly: 'a[href="/brand_products/Allen Solly Junior"]',
      brandKookieKids: 'a[href="/brand_products/Kookie Kids"]',
      brandBiba: 'a[href="/brand_products/Biba"]',
      productGrid: '.features_items',
      productCard: '.productinfo',
      productName: '.product-information h2',
      productPrice: '.product-information span span',
      productDescription: '.product-information p',
      productCategory: '.product-information p:contains("Category")',
      productAvailability: '.product-information p:contains("Availability")',
      productCondition: '.product-information p:contains("Condition")',
      productBrand: '.product-information p:contains("Brand")',
      addToCartButton: 'Add to cart',
      viewProductButton: 'View Product',
      addToWishlistButton: 'add-to-wishlist',
      productImage: '.product-details .view-product img',
      productQuantity: '#quantity',
      addToCartFromDetails: '.btn.btn-default.cart',
      pagination: '.pagination',
      nextPage: '.pagination .next',
      previousPage: '.pagination .prev',
      sortDropdown: 'sort',
      priceRange: 'price-range',
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
      writeYourReview: 'Write Your Review',
    };
  }

  navigateToProducts(): this {
    return this.visit(this.url);
  }

  searchProduct(searchTerm: string): this {
    this.typeText(this.elements.searchProduct, searchTerm);
    this.clickElement(this.elements.submitSearch);
    return this;
  }

  filterByCategory(category: string): this {
    switch (category.toLowerCase()) {
      case 'women':
        this.clickElement(this.elements.womenCategory);
        break;
      case 'men':
        this.clickElement(this.elements.menCategory);
        break;
      case 'kids':
        this.clickElement(this.elements.kidsCategory);
        break;
      default:
        throw new Error(`Unknown category: ${category}`);
    }
    return this;
  }

  filterByBrand(brand: string): this {
    switch (brand.toLowerCase()) {
      case 'polo':
        this.clickElement(this.elements.brandPolo);
        break;
      case 'h&m':
      case 'hm':
        this.clickElement(this.elements.brandHm);
        break;
      case 'madame':
        this.clickElement(this.elements.brandMadame);
        break;
      case 'mast & harbour':
      case 'mast-harbour':
        this.clickElement(this.elements.brandMastHarbour);
        break;
      case 'babyhug':
        this.clickElement(this.elements.brandBabyhug);
        break;
      case 'allen solly':
      case 'allen-solly':
        this.clickElement(this.elements.brandAllenSolly);
        break;
      case 'kookie kids':
      case 'kookie-kids':
        this.clickElement(this.elements.brandKookieKids);
        break;
      case 'biba':
        this.clickElement(this.elements.brandBiba);
        break;
      default:
        throw new Error(`Unknown brand: ${brand}`);
    }
    return this;
  }

  addProductToCart(productName: string): this {
    cy.get('.features_items .productinfo').contains(productName)
      .parents('.single-products')
      .find('.add-to-cart').first().click({ force: true });
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    return this;
  }

  viewProduct(productName: string): this {
    cy.get('.productinfo p').contains(productName)
      .parents('.single-products')
      .find('a[href*="/product_details/"]').first().click();
    return this;
  }

  addProductToWishlist(productName: string): this {
    cy.contains(productName)
      .parent()
      .find(`[data-qa="${this.elements.addToWishlistButton}"]`)
      .click();
    return this;
  }

  setProductQuantity(quantity: string): this {
    this.clearAndType(this.elements.productQuantity, quantity);
    return this;
  }

  addToCartFromDetails(productName?: string): this {
    this.getElement(this.elements.addToCartFromDetails).click();
    cy.get('.modal-content', { timeout: 10000 }).should('be.visible');
    return this;
  }

  clickViewCartOnModal(): this {
    cy.get('.modal-body a[href="/view_cart"]').click();
    return this;
  }

  clickContinueShoppingOnModal(): this {
    cy.get('button').contains('Continue Shopping').click();
    return this;
  }

  goToNextPage(): this {
    this.clickElement(this.elements.nextPage);
    return this;
  }

  goToPreviousPage(): this {
    this.clickElement(this.elements.previousPage);
    return this;
  }

  goToPage(pageNumber: number): this {
    cy.get(this.elements.pagination).contains(pageNumber.toString()).click();
    return this;
  }

  sortBy(sortOption: string): this {
    this.selectOption(this.elements.sortDropdown, sortOption);
    return this;
  }

  setPriceRange(minPrice: number, maxPrice: number): this {
    // Implementation for price range slider
    cy.get(this.elements.priceRange).invoke('val', [minPrice, maxPrice]).trigger('change');
    return this;
  }

  assertProductsPageLoaded(): this {
    this.getElement(this.elements.productsTitle).should('contain', ASSERTION_TEXTS.ALL_PRODUCTS_TITLE);
    return this;
  }

  assertProductExists(productName: string): this {
    cy.get(this.elements.productCard).should('contain', productName);
    return this;
  }

  assertProductNotExists(productName: string): this {
    cy.get(this.elements.productCard).should('not.contain', productName);
    return this;
  }

  assertSearchResultsContain(searchTerm: string): this {
    cy.get(this.elements.searchResultsMessage).invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
    });
    return this;
  }

  assertNoSearchResults(): this {
    cy.get(this.elements.noResultsMessage).should('be.visible');
    return this;
  }

  assertCategoryFiltered(category: string): this {
    cy.url().should('include', `/category_products/${category.toLowerCase()}`);
    return this;
  }

  assertBrandFiltered(brand: string): this {
    cy.url().should('include', `/brand_products/${brand.replace(/\s+/g, '%20')}`);
    return this;
  }

  getProductPrice(productName: string): Cypress.Chainable<string> {
    return cy.get('.productinfo.text-center').contains(productName)
      .parents('.product-image-wrapper')
      .find('h2').invoke('text');
  }

  getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.elements.productCard).its('length');
  }

  getProductNames(): Cypress.Chainable<string[]> {
    return cy.get(this.elements.productCard).invoke('text');
  }

  hasPagination(): Cypress.Chainable<boolean> {
    return cy.get(this.elements.pagination).should('exist');
  }

  getCurrentPage(): Cypress.Chainable<number> {
    return cy.get(this.elements.pagination).find('.active').invoke('text');
  }

  scrollToProduct(productName: string): this {
    cy.get('.productinfo.text-center').contains(productName).scrollIntoView();
    return this;
  }

  waitForProductsToLoad(): this {
    cy.get(this.elements.productGrid).should('be.visible');
    return this;
  }

  assertProductInCart(productName: string): this {
    cy.get(this.elements.productCard).should('contain', productName);
    return this;
  }

  assertOnProductsPage(): this {
    cy.url().should('include', URL_PATHS.PRODUCTS);
    return this;
  }

  assertOnSearchResultsPage(): this {
    cy.url().should('include', URL_PATHS.PRODUCTS);
    cy.get(this.elements.searchResultsMessage).should('be.visible');
    return this;
  }

  measurePageLoadTime(): this {
    measurePageLoadTime(5000, 'Products page');
    return this;
  }

  getProductCardByName(productName: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.productCard).contains(productName);
  }

  clickAddToCartByName(productName: string): this {
    cy.get('.productinfo.text-center').contains(productName)
      .parents('.product-image-wrapper')
      .find('a.add-to-cart').first().click({ force: true });
    return this;
  }

  clickViewProductByName(productName: string): this {
    cy.get('.productinfo.text-center').contains(productName)
      .parents('.product-image-wrapper')
      .find('a[href*="/product_details/"]').first().click({ force: true });
    return this;
  }

  getProductQuantityInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.productQuantityInput);
  }

  getReviewNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.reviewNameInput);
  }

  getReviewEmailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.reviewEmailInput);
  }

  getReviewTextarea(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.reviewTextarea);
  }

  getReviewForm(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.reviewForm);
  }

  getReviewSubmitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.elements.reviewSubmitButton);
  }

  getReviewSuccessMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('body').contains(this.elements.reviewSuccessMessage);
  }

  getWriteYourReview(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('body').contains(this.elements.writeYourReview);
  }

  getModalContent(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.modal-content');
  }
}

export const productsPage = new ProductsPage(); 