# Cypress + Cucumber Automation Framework

A modern Cypress framework for the [AutomationExercise](https://www.automationexercise.com/) website, featuring best practices, maintainability, and robust CI/CD integration. **This framework uses Cucumber (Gherkin) for Behavior-Driven Development (BDD) with Cypress.**

## Features
- **Cucumber (Gherkin) BDD**: Write tests in plain English using `.feature` files
- **Step Definitions**: Map Gherkin steps to Cypress code for reusability
- **Page Object Model (POM)** for maintainable test code
- **Custom Commands** for reusable actions
- **Data-driven Testing** with fixtures
- **Cross-browser & Responsive Testing**
- **Comprehensive UI, API, and E2E coverage**
- **Mochawesome HTML reporting** (artifacts in CI)
- **GitHub Actions CI/CD** with scheduled/manual runs, artifact uploads, and run summaries

## Project Structure
```
cypress-cucumber/
├── cypress/
│   ├── e2e/         # Feature files (.feature) and step definitions (.steps.ts)
│   ├── fixtures/    # Test data
│   ├── pages/       # Page Objects
│   ├── support/     # Custom commands, constants, utils
│   ├── screenshots/ # Failure screenshots (artifact)
│   ├── results/     # Mochawesome reports (artifact)
├── cypress.config.ts
├── package.json
└── README.md
```

## Quick Start
1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd cypress-cucumber
   npm install
   ```
2. **Run Cucumber (Gherkin) Tests Locally**
   ```bash
   npx cypress run --e2e           # Run all feature files headlessly
   npx cypress open                # Interactive mode (select feature files)
   # Or use npm scripts if defined
   ```
3. **View Reports**
   - After running, open `cypress/results/mochawesome-report/mochawesome.html` for the HTML report.

## Writing Cucumber (Gherkin) Tests
- Write your scenarios in `.feature` files under `cypress/e2e/`:
  ```gherkin
  Feature: Login functionality
    Scenario: Successful login
      Given I am on the login page
      When I enter valid credentials
      Then I should be logged in successfully
  ```
- Each step (Given/When/Then) is mapped to a step definition in a `.steps.ts` file in the same folder.

## Step Definitions
- Step definitions are written in TypeScript using the Cucumber preprocessor:
  ```ts
  import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
  import { loginPage } from '../pages/LoginPage';

  Given('I am on the login page', () => {
    loginPage.navigateToLogin();
  });
  When('I enter valid credentials', () => {
    loginPage.login('user', 'pass');
  });
  Then('I should be logged in successfully', () => {
    loginPage.assertLoginSuccessful();
  });
  ```
- Keep shared/global steps in `e2e.steps.ts` and feature-specific steps in their respective `.steps.ts` files.

## BDD Workflow
1. **Write Gherkin scenarios** in `.feature` files.
2. **Implement step definitions** in `.steps.ts` files.
3. **Run tests** using Cypress (see Quick Start above).
4. **Review reports and artifacts** for results and debugging.

## Best Practices
- Use POM for all page interactions
- Keep custom commands in `cypress/support/commands.ts`
- Store test data in `cypress/fixtures/`
- Use fixtures and environment variables for data-driven and environment-specific tests
- Review artifacts and run summary in GitHub Actions for debugging
- Use utility functions in `cypress/support/utils.ts` for common operations (e.g., random data generation, performance checks)
- Store reusable values and assertion texts in `cypress/support/constants.ts` to keep tests maintainable and DRY
- **Keep step definitions DRY**: Only one definition per step, avoid duplicates across files

## CI/CD (GitHub Actions)
- **Runs on schedule (weekly) and manually**
- **Artifacts:**
  - Screenshots (on failure)
  - Mochawesome HTML report
- **Run summary** is posted to the Actions run summary
- **Notifications:**
  - Uses GitHub's default notification system (no custom email setup required)

## Troubleshooting
- **Artifacts not found?** Ensure tests generate results and the workflow uploads the correct paths.
- **Step definition errors?** Ensure each step is defined only once, and that step files are picked up by the preprocessor.
- **Need notifications?** Watch the repo or subscribe to Actions notifications in GitHub.

---
