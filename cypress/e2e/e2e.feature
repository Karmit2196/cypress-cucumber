Feature: End-to-End Tests

  Scenario: Newsletter subscription functionality
    Given I am on the home page
    When I scroll to the bottom
    And I subscribe to the newsletter with a random email
    Then the subscription should be successful

  Scenario: Responsive design across different viewports
    When I test responsive design on "iphone-6"
    And I test responsive design on "ipad-2"
    And I test responsive design on "macbook-15"
    Then the home page should be loaded on all viewports

  Scenario: Navigate to products page
    Given I am on the home page
    When I navigate to the products page
    Then I should be on the products page

  Scenario: Test performance across different pages
    When I measure the home page load time
    And I navigate to the products page
    Then I should measure the products page load time

  Scenario: Submit contact us form successfully
    Given I am on the home page
    When I go to the contact us page
    Then I should be on the contact us page
    When I fill the contact form with name "Test User" and email "testuser@example.com" and subject "Test Subject" and message "This is a test message."
    And I submit the contact form
    And I accept the alert
    Then the contact form success message should be visible
    When I click the contact us home button
    Then I should be on the home page

  Scenario: Subscribe to newsletter from cart page
    Given I am on the products page
    When I add product "Blue Top" to the cart
    Then a success modal should be visible
    When I click view cart on the modal
    Then I should be on the cart page
    And the cart subscribe input should be visible
    And the cart subscribe button should be visible
    When I subscribe to the newsletter from cart with email "carttest@example.com"
    Then the cart subscription success should be visible

  Scenario: Add multiple products to cart and verify details
    Given I am on the products page
    When I add product "Blue Top" to the cart
    Then a success modal should be visible
    When I click continue shopping on the modal
    And I add product "Men Tshirt" to the cart
    Then a success modal should be visible
    When I click view cart on the modal
    Then I should be on the cart page
    And the cart should have 2 items
    And the cart should contain "Blue Top"
    And the cart should contain "Men Tshirt"
    And each cart item should have valid price, quantity, and total

  Scenario: Add product from details page with specific quantity and verify in cart
    Given I am on the products page
    When I view product "Blue Top"
    Then I should be on the product details page
    When I set the product quantity to "4"
    And I add the product to cart from details
    Then a success modal should be visible
    When I click view cart on the modal
    Then I should be on the cart page
    And the cart should contain "Blue Top"
    And the first cart item should have quantity "4"

  Scenario: Add product to cart and then remove it
    Given I am on the products page
    When I add product "Blue Top" to the cart
    Then a success modal should be visible
    When I click view cart on the modal
    Then I should be on the cart page
    And the cart should contain "Blue Top"
    When I remove the first item from the cart
    Then the cart should be empty
    And the cart empty message should be visible

  Scenario: Add review to a product and verify success message
    Given I am on the products page
    When I view product "Blue Top"
    Then I should be on the product details page
    When I scroll to the review section
    Then the review section should be visible
    When I fill the review form with name "Test Reviewer" and email "reviewer@example.com" and review "This is a great product! Highly recommended."
    And I submit the review form
    Then the review success message should be visible 