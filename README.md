# Cypress Automation Framework

A modern Cypress framework for the [AutomationExercise](https://www.automationexercise.com/) website, featuring best practices, maintainability, and robust CI/CD integration.

## Features
- **Page Object Model (POM)** for maintainable test code
- **Custom Commands** for reusable actions
- **Data-driven Testing** with fixtures
- **Cross-browser & Responsive Testing**
- **Comprehensive UI, API, and E2E coverage**
- **Mochawesome HTML reporting** (artifacts in CI)
- **GitHub Actions CI/CD** with scheduled/manual runs, artifact uploads, and run summaries

## Project Structure
```
cypress-framework/
├── cypress/
│   ├── e2e/         # Test files
│   ├── fixtures/    # Test data
│   ├── pages/       # Page Objects
│   ├── support/     # Custom commands,constants, utils
│   ├── screenshots/ # Failure screenshots (artifact)
│   ├── videos/      # Test videos (artifact)
│   └── results/     # Mochawesome reports (artifact)
├── .github/
│   └── workflows/
│       └── cypress-tests.yml
├── cypress.config.js
├── package.json
└── README.md
```

## Quick Start
1. **Clone & Install**
   ```bash
   git clone <repository-url>
   cd cypress-framework
   npm install
   ```
2. **Run Tests Locally**
   ```bash
   npm run test:smoke      # Smoke tests
   npm run test:regression # Full regression
   npx cypress open        # Interactive mode
   ```
3. **View Reports**
   - After running, open `cypress/results/mochawesome-report/mochawesome.html` for the HTML report.

## CI/CD (GitHub Actions)
- **Runs on schedule (weekly) and manually**
- **Artifacts:**
  - Screenshots (on failure)
  - Videos (all runs)
  - Mochawesome HTML report
- **Run summary** is posted to the Actions run summary
- **Notifications:**
  - Uses GitHub's default notification system (no custom email setup required)

## Best Practices
- Use POM for all page interactions
- Keep custom commands in `cypress/support/commands.js`
- Store test data in `cypress/fixtures/`
- Use fixtures and environment variables for data-driven and environment-specific tests
- Review artifacts and run summary in GitHub Actions for debugging
- Use utility functions in `cypress/support/utils.js` for common operations (e.g., random data generation, performance checks)
- Store reusable values and assertion texts in `cypress/support/constants.js` to keep tests maintainable and DRY

## Troubleshooting
- **Artifacts not found?** Ensure tests generate results and the workflow uploads the correct paths.
- **Need notifications?** Watch the repo or subscribe to Actions notifications in GitHub.

---
