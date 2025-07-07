Feature: Home Page

  Background:
    Given I am on the home page

  Scenario: Load home page successfully
    Then the home page should be loaded
    And a screenshot of the home page is taken

  Scenario: Display all navigation links
    Then all navigation links should be visible

  Scenario: Navigate to products page
    When I click the products link
    Then I should be on the products page

  Scenario: Navigate to cart page
    When I click the cart link
    Then I should be on the cart page

  Scenario: Navigate to login page
    When I click the signup/login link
    Then I should be on the login page

  Scenario: Search for existing product
    When I search for product "dress"
    Then the search results should contain "dress"

  Scenario: Search with no results
    When I search for product "nonexistentproduct"
    Then no search results should be shown

  Scenario: Search with empty input
    When I search for product ""
    Then I should remain on the home page

  Scenario: Navigate to women category
    When I click the women category
    Then I should be on the category products page
    And the page should contain "Women"

  Scenario: Navigate to men category
    When I click the men category
    Then I should be on the category products page
    And the page should contain "Men"

  Scenario: Navigate to kids category
    When I click the kids category
    Then I should be on the category products page
    And the page should contain "Kids"

  Scenario: Display featured products
    Then there should be at least one featured product

  Scenario: Add product to cart from home page
    When I add product "Blue Top" to the cart
    Then a success modal should be visible
    And the modal should contain "Added!"
    When I close the modal

  Scenario: View product details
    When I view product "Blue Top"
    Then I should be on the product details page
    And the page should contain "Blue Top"

  Scenario: Display product prices
    Then the price for product "Blue Top" should contain "Rs."

  Scenario: Subscribe to newsletter with valid email
    When I scroll to the bottom
    And I subscribe to the newsletter with email "test@example.com"
    Then the subscription should be successful

  Scenario: Subscribe to newsletter with invalid email
    When I scroll to the bottom
    And I subscribe to the newsletter with email "invalid-email"
    Then the subscription should fail

  Scenario: Scroll to bottom and show scroll up button
    When I scroll to the bottom
    Then the scroll up button should be visible
    When I click the scroll up button
    Then the page should be scrolled to the top

  Scenario: Scroll to specific product
    When I scroll to product "Stylish Dress"
    Then the product "Stylish Dress" should exist

  Scenario: Display correctly on mobile viewport
    When I set the viewport to mobile
    Then the home page should be loaded
    And a screenshot of the home page is taken

  Scenario: Display correctly on tablet viewport
    When I set the viewport to tablet
    Then the home page should be loaded
    And a screenshot of the home page is taken

  Scenario: Load within acceptable time
    When I measure the home page load time
    Then the load time should be less than 5000 ms

  Scenario: All images loaded
    Then all images should be visible and have src attribute

  Scenario: Proper alt text for images
    Then all images should have alt text

  Scenario: Proper heading structure
    Then the page should have heading tags 