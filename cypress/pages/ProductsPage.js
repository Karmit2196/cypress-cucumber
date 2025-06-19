import BasePage from './BasePage.js'

class ProductsPage extends BasePage {
  constructor() {
    super()
    this.url = '/products'
    
    // Page elements
    this.elements = {
      // Page header
      productsTitle: '.title',
      
      // Search and filter
      searchProduct: 'search-product',
      submitSearch: 'submit-search',
      
      // Categories
      womenCategory: 'category-women',
      menCategory: 'category-men',
      kidsCategory: 'category-kids',
      
      // Brands
      brandPolo: 'brand-polo',
      brandHm: 'brand-hm',
      brandMadame: 'brand-madame',
      brandMastHarbour: 'brand-mast-harbour',
      brandBabyhug: 'brand-babyhug',
      brandAllenSolly: 'brand-allen-solly',
      brandKookieKids: 'brand-kookie-kids',
      brandBiba: 'brand-biba',
      
      // Product grid
      productGrid: '.features_items',
      productCard: '.single-products',
      productName: '.product-information h2',
      productPrice: '.product-information span span',
      productDescription: '.product-information p',
      productCategory: '.product-information p:contains("Category")',
      productAvailability: '.product-information p:contains("Availability")',
      productCondition: '.product-information p:contains("Condition")',
      productBrand: '.product-information p:contains("Brand")',
      
      // Product actions
      addToCartButton: 'add-to-cart',
      viewProductButton: 'view-product',
      addToWishlistButton: 'add-to-wishlist',
      
      // Product details
      productImage: '.product-image',
      productQuantity: 'quantity',
      addToCartFromDetails: 'add-to-cart',
      
      // Pagination
      pagination: '.pagination',
      nextPage: '.pagination .next',
      previousPage: '.pagination .prev',
      
      // Sort and filter
      sortDropdown: 'sort',
      priceRange: 'price-range',
      
      // Messages
      noResultsMessage: '.no-results',
      searchResultsMessage: '.search-results'
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
    cy.contains(productName)
      .parent()
      .find(`[data-qa="${this.elements.addToCartButton}"]`)
      .click()
    return this
  }

  viewProduct(productName) {
    cy.contains(productName)
      .parent()
      .find(`[data-qa="${this.elements.viewProductButton}"]`)
      .click()
    return this
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
    this.clickElement(this.elements.addToCartFromDetails)
    return this
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
    this.getElement(this.elements.productsTitle).should('contain', 'All Products')
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
    cy.get(this.elements.searchResultsMessage).should('contain', searchTerm)
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
}

export default ProductsPage 