import BasePage from './BasePage';
import { measurePageLoadTime } from '../support/utils';
import { expect } from 'chai';

class HomePage extends BasePage {
  url: string;
  selectors: { [key: string]: string };

  constructor() {
    super();
    this.url = '/';
    this.selectors = {
      productsLink: "a[href='/products']",
      cartLink: "a[href='/view_cart']",
      signupLoginLink: "a[href='/login']",
      logo: "img[src='/static/images/home/logo.png']",
      searchInput: "input#search_product",
      searchButton: "button#submit_search",
      categoryPanelTitle: ".panel-title a",
      womenCategoryLink: "a[href='/category_products/1']",
      menCategoryLink: "a[href='/category_products/3']",
      kidsCategoryLink: "a[href='/category_products/4']",
      featuredProducts: '.features_items .product-image-wrapper',
      productInfo: '.productinfo.text-center',
      addToCartButton: 'a.add-to-cart',
      viewProductLink: 'a[href*="/product_details/"]',
      productPrice: 'h2',
      newsletterInput: '#susbscribe_email',
      newsletterButton: '#subscribe',
      newsletterSuccess: '#success-subscribe',
      contactUsName: 'input[data-qa="name"]',
      contactUsEmail: 'input[data-qa="email"]',
      contactUsSubject: 'input[data-qa="subject"]',
      contactUsMessage: 'textarea[data-qa="message"]',
      contactUsSubmit: 'input[type="submit"]',
      contactUsSuccess: 'Success! Your details have been submitted successfully.',
      contactUsHome: 'Home',
      scrollUpButton: "a[href='#top'] i.fa.fa-angle-up",
      searchResultsContainer: '.features_items',
      body: 'body',
      modalContent: '.modal-content',
      modalCloseButton: '.modal-content .btn-success',
    };
  }

  navigateToHome(): this {
    cy.visit(this.url);
    return this;
  }

  clickProducts(): this {
    cy.get(this.selectors.productsLink).click();
    return this;
  }

  clickCart(): this {
    cy.get(this.selectors.cartLink).first().click();
    return this;
  }

  clickSignupLogin(): this {
    cy.get(this.selectors.signupLoginLink).click();
    return this;
  }

  searchProduct(searchTerm: string): this {
    cy.visit('/products');
    if (searchTerm && searchTerm.trim() !== '') {
      cy.get(this.selectors.searchInput).clear().type(searchTerm);
      cy.get(this.selectors.searchButton).click();
    } else {
      cy.visit('/products');
    }
    return this;
  }

  expandCategory(categoryText: string): void {
    cy.visit('/products');
    cy.get(this.selectors.categoryPanelTitle).contains(categoryText).click();
  }

  clickWomenCategory(): this {
    this.expandCategory('Women');
    cy.get(this.selectors.womenCategoryLink).should('be.visible').click({ force: true });
    return this;
  }

  clickMenCategory(): this {
    this.expandCategory('Men');
    cy.get(this.selectors.menCategoryLink).should('be.visible').click({ force: true });
    return this;
  }

  clickKidsCategory(): this {
    this.expandCategory('Kids');
    cy.get(this.selectors.kidsCategoryLink).should('be.visible').click({ force: true });
    return this;
  }

  getFeaturedProductsCount(): Cypress.Chainable<number> {
    return cy.get(this.selectors.featuredProducts).its('length');
  }

  addProductToCart(productName: string): this {
    cy.get(this.selectors.productInfo).contains(productName)
      .parents(this.selectors.featuredProducts)
      .trigger('mouseover')
      .find(this.selectors.addToCartButton).first().click({ force: true });
    return this;
  }

  viewProduct(productName: string): this {
    cy.get(this.selectors.productInfo).contains(productName)
      .parents(this.selectors.featuredProducts)
      .find(this.selectors.viewProductLink).first().click({ force: true });
    return this;
  }

  getProductPrice(productName: string): Cypress.Chainable<string> {
    return cy.get(this.selectors.productInfo).contains(productName)
      .parents(this.selectors.featuredProducts)
      .find(this.selectors.productPrice).invoke('text');
  }

  subscribeToNewsletter(email: string): this {
    this.getElement(this.selectors.newsletterInput).type(email);
    this.getElement(this.selectors.newsletterButton).click();
    return this;
  }

  assertSubscriptionSuccess(): this {
    cy.get(this.selectors.newsletterSuccess).should('be.visible');
    return this;
  }

  assertSubscriptionError(): this {
    cy.get(this.selectors.body).should('be.visible');
    return this;
  }

  scrollToBottom(): this {
    cy.scrollTo('bottom');
    return this;
  }

  clickScrollUp(): this {
    cy.get(this.selectors.scrollUpButton).click({ force: true });
    return this;
  }

  assertHomePageLoaded(): this {
    cy.get(this.selectors.logo).should('be.visible');
    cy.get(this.selectors.featuredProducts).should('exist');
    return this;
  }

  assertNavigationLinksVisible(): this {
    cy.get(this.selectors.productsLink).should('be.visible');
    cy.get(this.selectors.cartLink).should('be.visible');
    cy.get(this.selectors.signupLoginLink).should('be.visible');
    return this;
  }

  productExists(productName: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.productInfo).contains(productName).should('exist');
  }

  scrollToProduct(productName: string): this {
    cy.get(this.selectors.productInfo).contains(productName).scrollIntoView();
    return this;
  }

  assertSearchResultsContain(searchTerm: string): this {
    cy.get(this.selectors.searchResultsContainer).invoke('text').then((text) => {
      expect(text.toLowerCase()).to.include(searchTerm.toLowerCase());
    });
    return this;
  }

  assertNoSearchResults(): this {
    cy.get(this.selectors.searchResultsContainer).should('not.contain.text', 'dress');
    return this;
  }

  measurePageLoadTime(): this {
    measurePageLoadTime(5000, 'Home page');
    return this;
  }

  getBody(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.body);
  }

  getModalContent(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.modalContent);
  }

  getModalCloseButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.modalCloseButton);
  }

  getImages(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('img');
  }

  getHeadings(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('h1, h2, h3');
  }

  goToContactUs(): this {
    cy.visit('/contact_us');
    return this;
  }

  getContactUsNameInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.contactUsName);
  }

  getContactUsEmailInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.contactUsEmail);
  }

  getContactUsSubjectInput(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.contactUsSubject);
  }

  getContactUsMessageTextarea(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.contactUsMessage);
  }

  getContactUsSubmitButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.contactUsSubmit);
  }

  getContactUsSuccessMessage(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains(this.selectors.contactUsSuccess);
  }

  getContactUsHomeButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.contains('a', this.selectors.contactUsHome);
  }
}

export const homePage = new HomePage(); 