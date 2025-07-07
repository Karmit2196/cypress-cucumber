Feature: Login and Registration

  Background:
    Given I am on the login page

  Scenario: Login with valid credentials
    When I register a new user
    And I logout
    And I login with the same credentials
    Then I should be logged in successfully

  Scenario: Login with invalid credentials
    When I login with email "invalid@example.com" and password "wrongpassword"
    Then I should see a login error

  Scenario: Login with empty credentials
    When I login with email "" and password ""
    Then I should remain on the login page

  Scenario: Login with invalid email format
    When I login with email "invalid-email" and password "test123"
    Then I should remain on the login page

  Scenario: Clear login form fields
    When I type "test@example.com" into the login email field
    And I type "test123" into the login password field
    And I clear the login form
    Then the login email field should be empty

  Scenario: Register new user successfully
    When I register a new user
    Then I should see the account created message
    And I should be logged in successfully

  Scenario: Register with existing email
    When I signup with name "Test User" and email "test@example.com"
    Then I should see a signup error

  Scenario: Register with empty fields
    When I signup with name "" and email ""
    Then I should remain on the login page

  Scenario: Register with invalid email format
    When I signup with name "Test User" and email "invalid-email"
    Then I should remain on the login page

  Scenario: Complete registration with all required fields
    When I complete registration with valid data
    Then I should see the account created message

  Scenario: Clear signup form fields
    When I type "Test User" into the signup name field
    And I type "test@example.com" into the signup email field
    And I clear the signup form
    Then the signup email field should be empty

  Scenario: Validate email field type
    Then the email field should have type "email"

  Scenario: Validate password field type
    Then the password field should have type "password"

  Scenario: Validate required fields
    When I click the login button
    Then I should remain on the login page

  Scenario: Delete account successfully
    When I register a new user
    And I delete the account
    Then I should see the account deleted message

  Scenario: Logout successfully
    When I login with email "test@example.com" and password "test123"
    And I logout
    Then I should be on the login page 