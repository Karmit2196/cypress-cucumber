import HomePage from '../pages/HomePage.js'

describe('Home Page Tests', () => {
  const homePage = new HomePage()

  beforeEach(() => {
    homePage.navigateToHome()
  })

  describe('Page Load and Navigation', () => {
    it('should load home page successfully', () => {
      homePage
        .assertHomePageLoaded()
        .takeScreenshot('home-page-loaded')
    })

    it('should display all navigation links', () => {
      homePage
        .assertNavigationLinksVisible()
    })

    it('should navigate to products page', () => {
      homePage
        .clickProducts()
        .waitForPageLoad()
      
      cy.url().should('include', '/products')
    })

    it('should navigate to cart page', () => {
      homePage
        .clickCart()
        .waitForPageLoad()
      
      cy.url().should('include', '/view_cart')
    })

    it('should navigate to login page', () => {
      homePage
        .clickSignupLogin()
        .waitForPageLoad()
      
      cy.url().should('include', '/login')
    })
  })

  describe('Search Functionality', () => {
    it('should search for existing product', () => {
      const searchTerm = 'dress'
      
      homePage
        .searchProduct(searchTerm)
        .waitForPageLoad()
        .assertSearchResultsContain(searchTerm)
    })

    it('should handle search with no results', () => {
      const searchTerm = 'nonexistentproduct'
      
      homePage
        .searchProduct(searchTerm)
        .waitForPageLoad()
        .assertNoSearchResults()
    })

    it('should handle empty search', () => {
      homePage
        .searchProduct('')
        .waitForPageLoad()
      
      // Should stay on home page or show all products
      cy.url().should('include', '/')
    })
  })

  describe('Category Navigation', () => {
    it('should navigate to women category', () => {
      homePage
        .clickWomenCategory()
        .waitForPageLoad()
      
      cy.url().should('include', '/category_products')
      cy.get('body').should('contain', 'Women')
    })

    it('should navigate to men category', () => {
      homePage
        .clickMenCategory()
        .waitForPageLoad()
      
      cy.url().should('include', '/category_products')
      cy.get('body').should('contain', 'Men')
    })

    it('should navigate to kids category', () => {
      homePage
        .clickKidsCategory()
        .waitForPageLoad()
      
      cy.url().should('include', '/category_products')
      cy.get('body').should('contain', 'Kids')
    })
  })

  describe('Featured Products', () => {
    it('should display featured products', () => {
      homePage
        .getFeaturedProductsCount()
        .should('be.greaterThan', 0)
    })

    it('should add product to cart from home page', () => {
      const productName = 'Blue Top'
      
      homePage
        .addProductToCart(productName)
        .waitForPageLoad()
      
      // Should show success message
      cy.get('body').should('contain', 'Added!')
    })

    it('should view product details', () => {
      const productName = 'Blue Top'
      
      homePage
        .viewProduct(productName)
        .waitForPageLoad()
      
      cy.url().should('include', '/product_details')
      cy.get('body').should('contain', productName)
    })

    it('should display product prices', () => {
      homePage
        .getProductPrice('Blue Top')
        .should('contain', 'Rs.')
    })
  })

  describe('Subscription', () => {
    it('should subscribe to newsletter with valid email', () => {
      const email = 'test@example.com'
      
      homePage
        .scrollToBottom()
        .subscribeToNewsletter(email)
        .waitForPageLoad()
        .assertSubscriptionSuccess()
    })

    it('should handle subscription with invalid email', () => {
      const invalidEmail = 'invalid-email'
      
      homePage
        .scrollToBottom()
        .subscribeToNewsletter(invalidEmail)
        .waitForPageLoad()
      
      // Should show error message
      cy.get('body').should('contain', 'Please enter a valid email')
    })
  })

  describe('Scroll Functionality', () => {
    it('should scroll to bottom and show scroll up button', () => {
      homePage
        .scrollToBottom()
        .waitForElement('scroll-up')
        .clickScrollUp()
      
      // Should scroll back to top
      cy.window().its('scrollY').should('eq', 0)
    })

    it('should scroll to specific product', () => {
      const productName = 'Stylish Dress'
      
      homePage
        .scrollToProduct(productName)
        .productExists(productName)
    })
  })

  describe('Responsive Design', () => {
    it('should display correctly on mobile viewport', () => {
      cy.viewport(375, 667)
      
      homePage
        .assertHomePageLoaded()
        .takeScreenshot('home-page-mobile')
    })

    it('should display correctly on tablet viewport', () => {
      cy.viewport(768, 1024)
      
      homePage
        .assertHomePageLoaded()
        .takeScreenshot('home-page-tablet')
    })
  })

  describe('Performance', () => {
    it('should load within acceptable time', () => {
      const startTime = Date.now()
      
      homePage.navigateToHome()
      
      cy.get('body').should('be.visible').then(() => {
        const loadTime = Date.now() - startTime
        expect(loadTime).to.be.lessThan(5000) // 5 seconds
      })
    })

    it('should have all images loaded', () => {
      homePage.navigateToHome()
      
      cy.get('img').each(($img) => {
        cy.wrap($img).should('be.visible')
        cy.wrap($img).should('have.attr', 'src')
      })
    })
  })

  describe('Accessibility', () => {
    it('should have proper alt text for images', () => {
      homePage.navigateToHome()
      
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt')
      })
    })

    it('should have proper heading structure', () => {
      homePage.navigateToHome()
      
      // Check for h1, h2, h3 tags
      cy.get('h1, h2, h3').should('exist')
    })
  })
}) 