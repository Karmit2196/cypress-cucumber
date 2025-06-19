import HomePage from '../pages/HomePage.js'
import LoginPage from '../pages/LoginPage.js'
import ProductsPage from '../pages/ProductsPage.js'
import CartPage from '../pages/CartPage.js'

describe('End-to-End Tests', () => {
  const homePage = new HomePage()
  const loginPage = new LoginPage()
  const productsPage = new ProductsPage()
  const cartPage = new CartPage()

  describe('Complete User Registration and Shopping Journey', () => {
    it('should complete full user registration and shopping flow', () => {
      // Step 1: Navigate to home page
      homePage.navigateToHome()
        .assertHomePageLoaded()

      // Step 2: Register new user
      const userName = loginPage.generateRandomName()
      const userEmail = loginPage.generateRandomEmail()
      const userPassword = 'test123'

      homePage.clickSignupLogin()
      loginPage.quickRegistration(userName, userEmail, userPassword)
        .waitForPageLoad()
        .assertAccountCreated()
        .continueAfterAccountCreation()
        .waitForPageLoad()
        .assertLoginSuccessful()

      // Step 3: Browse products
      homePage.clickProducts()
      productsPage.assertProductsPageLoaded()

      // Step 4: Search for products
      productsPage.searchProduct('dress')
        .waitForProductsToLoad()
        .assertSearchResultsContain('dress')

      // Step 5: Add product to cart
      productsPage.addProductToCart('Sleeveless Dress')
        .waitForPageLoad()

      // Step 6: View cart
      homePage.clickCart()
      cartPage.assertCartPageLoaded()
        .assertCartHasItems()
        .assertProductInCart('Sleeveless Dress')

      // Step 7: Proceed to checkout
      cartPage.proceedToCheckout()
        .waitForPageLoad()

      // Step 8: Complete checkout
      cartPage.quickCheckout()
        .waitForPageLoad()
        .assertOrderSuccess()

      // Step 9: Delete account
      cartPage.deleteAccount()
        .waitForPageLoad()
        .assertAccountDeleted()
    })
  })

  describe('Guest User Shopping Journey', () => {
    it('should allow guest user to browse and add products to cart', () => {
      // Step 1: Navigate to home page
      homePage.navigateToHome()
        .assertHomePageLoaded()

      // Step 2: Browse products without login
      homePage.clickProducts()
      productsPage.assertProductsPageLoaded()

      // Step 3: Filter by category
      productsPage.filterByCategory('Women')
        .waitForProductsToLoad()
        .assertCategoryFiltered('Women')

      // Step 4: Add multiple products to cart
      productsPage.addProductToCart('Blue Top')
        .waitForPageLoad()
      
      productsPage.addProductToCart('Men Tshirt')
        .waitForPageLoad()

      // Step 5: View cart
      homePage.clickCart()
      cartPage.assertCartPageLoaded()
        .assertCartHasItems()
        .assertProductInCart('Blue Top')
        .assertProductInCart('Men Tshirt')

      // Step 6: Update cart quantities
      cartPage.updateItemQuantity('Blue Top', '2')
        .updateCart()
        .waitForPageLoad()
        .assertProductQuantity('Blue Top', '2')

      // Step 7: Remove item from cart
      cartPage.removeItem('Men Tshirt')
        .waitForPageLoad()
        .assertProductNotInCart('Men Tshirt')
    })
  })

  describe('Product Search and Filter Journey', () => {
    it('should demonstrate comprehensive product search and filtering', () => {
      // Step 1: Navigate to products page
      productsPage.navigateToProducts()
        .assertProductsPageLoaded()

      // Step 2: Search for products
      productsPage.searchProduct('top')
        .waitForProductsToLoad()
        .assertSearchResultsContain('top')

      // Step 3: Filter by brand
      productsPage.filterByBrand('Polo')
        .waitForProductsToLoad()
        .assertBrandFiltered('Polo')

      // Step 4: Clear filters and search again
      productsPage.navigateToProducts()
      productsPage.searchProduct('dress')
        .waitForProductsToLoad()

      // Step 5: View product details
      productsPage.viewProduct('Sleeveless Dress')
        .waitForPageLoad()

      // Step 6: Add to cart from product details
      productsPage.setProductQuantity('3')
        .addToCartFromDetails()
        .waitForPageLoad()

      // Step 7: Verify cart
      homePage.clickCart()
      cartPage.assertProductInCart('Sleeveless Dress')
    })
  })

  describe('User Account Management Journey', () => {
    it('should demonstrate complete user account lifecycle', () => {
      // Step 1: Register new user
      const userName = loginPage.generateRandomName()
      const userEmail = loginPage.generateRandomEmail()
      const userPassword = 'test123'

      homePage.navigateToHome()
      homePage.clickSignupLogin()
      loginPage.quickRegistration(userName, userEmail, userPassword)
        .waitForPageLoad()
        .assertAccountCreated()
        .continueAfterAccountCreation()
        .waitForPageLoad()
        .assertLoginSuccessful()

      // Step 2: Browse and add products
      homePage.clickProducts()
      productsPage.addProductToCart('Blue Top')
        .waitForPageLoad()

      // Step 3: View cart while logged in
      homePage.clickCart()
      cartPage.assertCartHasItems()

      // Step 4: Logout
      loginPage.logoutIfLoggedIn()
        .waitForPageLoad()

      // Step 5: Login again
      homePage.clickSignupLogin()
      loginPage.login(userEmail, userPassword)
        .waitForPageLoad()
        .assertLoginSuccessful()

      // Step 6: Verify cart persistence
      homePage.clickCart()
      cartPage.assertProductInCart('Blue Top')

      // Step 7: Delete account
      cartPage.deleteAccount()
        .waitForPageLoad()
        .assertAccountDeleted()
    })
  })

  describe('Newsletter Subscription Journey', () => {
    it('should demonstrate newsletter subscription functionality', () => {
      // Step 1: Navigate to home page
      homePage.navigateToHome()
        .assertHomePageLoaded()

      // Step 2: Scroll to subscription section
      homePage.scrollToBottom()
        .waitForElement('susbscribe_email')

      // Step 3: Subscribe with valid email
      const email = 'test@example.com'
      homePage.subscribeToNewsletter(email)
        .waitForPageLoad()
        .assertSubscriptionSuccess()

      // Step 4: Try subscription with invalid email
      homePage.subscribeToNewsletter('invalid-email')
        .waitForPageLoad()

      // Should show error message
      cy.get('body').should('contain', 'Please enter a valid email')
    })
  })

  describe('Responsive Design Journey', () => {
    it('should test responsive design across different viewports', () => {
      // Test mobile viewport
      cy.viewport(375, 667)
      homePage.navigateToHome()
        .assertHomePageLoaded()
        .takeScreenshot('mobile-home')

      homePage.clickProducts()
      productsPage.assertProductsPageLoaded()
        .takeScreenshot('mobile-products')

      // Test tablet viewport
      cy.viewport(768, 1024)
      homePage.navigateToHome()
        .assertHomePageLoaded()
        .takeScreenshot('tablet-home')

      // Test desktop viewport
      cy.viewport(1280, 720)
      homePage.navigateToHome()
        .assertHomePageLoaded()
        .takeScreenshot('desktop-home')
    })
  })

  describe('Error Handling Journey', () => {
    it('should handle various error scenarios gracefully', () => {
      // Step 1: Test invalid login
      homePage.navigateToHome()
      homePage.clickSignupLogin()
      loginPage.login('invalid@example.com', 'wrongpassword')
        .waitForPageLoad()
        .assertLoginFailed()

      // Step 2: Test search with no results
      homePage.navigateToHome()
      homePage.searchProduct('nonexistentproduct')
        .waitForPageLoad()
        .assertNoSearchResults()

      // Step 3: Test empty cart
      homePage.clickCart()
      cartPage.assertCartIsEmpty()

      // Step 4: Test invalid product ID
      cy.request({
        method: 'GET',
        url: 'https://www.automationexercise.com/api/getProductDetailsById?id=99999',
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  describe('Performance Journey', () => {
    it('should test performance across different pages', () => {
      // Test home page load time
      const homeStartTime = Date.now()
      homePage.navigateToHome()
      cy.get('body').should('be.visible').then(() => {
        const homeLoadTime = Date.now() - homeStartTime
        expect(homeLoadTime).to.be.lessThan(5000)
      })

      // Test products page load time
      const productsStartTime = Date.now()
      productsPage.navigateToProducts()
      cy.get('body').should('be.visible').then(() => {
        const productsLoadTime = Date.now() - productsStartTime
        expect(productsLoadTime).to.be.lessThan(5000)
      })

      // Test cart page load time
      const cartStartTime = Date.now()
      cartPage.navigateToCart()
      cy.get('body').should('be.visible').then(() => {
        const cartLoadTime = Date.now() - cartStartTime
        expect(cartLoadTime).to.be.lessThan(5000)
      })
    })
  })

  describe('Cross-Browser Compatibility Journey', () => {
    it('should test basic functionality across different browsers', () => {
      // This test would be run with different browser configurations
      homePage.navigateToHome()
        .assertHomePageLoaded()

      homePage.clickProducts()
      productsPage.assertProductsPageLoaded()

      homePage.clickCart()
      cartPage.assertCartPageLoaded()
    })
  })

  describe('Accessibility Journey', () => {
    it('should test basic accessibility features', () => {
      homePage.navigateToHome()

      // Check for proper heading structure
      cy.get('h1, h2, h3').should('exist')

      // Check for alt text on images
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt')
      })

      // Check for proper form labels
      homePage.clickSignupLogin()
      cy.get('label').should('exist')

      // Check for keyboard navigation
      cy.get('body').tab()
      cy.focused().should('exist')
    })
  })
}) 