# Cypress Framework for AutomationExercise Website

A comprehensive Cypress testing framework designed specifically for testing the [AutomationExercise](https://www.automationexercise.com/) website. This framework follows advanced testing practices including Page Object Model, custom commands, and comprehensive test coverage.

## 🚀 Features

- **Page Object Model (POM)** - Organized and maintainable test structure
- **Custom Commands** - Reusable test utilities and helpers
- **Comprehensive Test Coverage** - UI, API, and E2E tests
- **Data-Driven Testing** - Fixtures for test data management
- **Advanced Configuration** - Retry logic, screenshots, and performance monitoring
- **Responsive Testing** - Cross-viewport compatibility testing
- **API Testing** - Complete REST API test coverage
- **Error Handling** - Robust error scenarios and edge cases
- **GitHub Actions Integration** - Automated CI/CD pipeline

## 📁 Project Structure

```
cypress-framework/
├── cypress/
│   ├── e2e/                    # Test files
│   │   ├── home.cy.js         # Home page tests
│   │   ├── login.cy.js        # Login/Registration tests
│   │   ├── api.cy.js          # API tests
│   │   └── e2e.cy.js          # End-to-end scenarios
│   ├── fixtures/              # Test data
│   │   ├── testData.json      # Test data for UI tests
│   │   └── apiEndpoints.json  # API endpoint configurations
│   ├── pages/                 # Page Object Models
│   │   ├── BasePage.js        # Base page class
│   │   ├── HomePage.js        # Home page interactions
│   │   ├── LoginPage.js       # Login/Registration page
│   │   ├── ProductsPage.js    # Products page interactions
│   │   └── CartPage.js        # Cart and checkout page
│   └── support/               # Support files
│       ├── e2e.js            # Global configurations
│       └── commands.js       # Custom commands
├── .github/
│   └── workflows/
│       └── cypress-tests.yml  # GitHub Actions workflow
├── cypress.config.js          # Cypress configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cypress-framework
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Open Cypress**
   ```bash
   npx cypress open
   ```

## 🧪 Running Tests

### Basic Commands

```bash
# Run all tests
npm run test

# Open Cypress Test Runner
npm run cypress:open

# Run tests in headless mode
npm run cypress:run
```

### Test Type Commands

#### Smoke Tests
```bash
# Run smoke tests (home and login)
npm run test:smoke
```

#### Regression Tests
```bash
# Run all tests
npm run test:regression
```

#### UI Tests
```bash
# Run UI tests (home, login, e2e)
npm run test:ui
```

#### API Tests
```bash
# Run API tests
npm run test:api:all
```

#### Specific Test Files
```bash
# Run specific test files
npm run test:home
npm run test:login
npm run test:api
npm run test:e2e
```

### Browser-Specific Commands
```bash
# Run tests in specific browsers
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run tests in headless mode
npm run test:headless
```

### Responsive Testing
```bash
# Run tests with different viewports
npm run test:mobile
npm run test:tablet
npm run test:desktop
```

### CI/CD Commands
```bash
# Run tests in CI environment
npm run test:ci

# Run tests with recording
npm run test:record

# Run tests in parallel
npm run test:parallel
```

## 🔧 Configuration

### Cypress Configuration (`cypress.config.js`)

The framework uses a single configuration file with the following settings:

```javascript
{
  baseUrl: 'https://www.automationexercise.com',
  viewportWidth: 1280,
  viewportHeight: 720,
  video: false,
  screenshotOnRunFailure: true,
  defaultCommandTimeout: 15000,
  requestTimeout: 15000,
  responseTimeout: 15000,
  pageLoadTimeout: 45000,
  retries: {
    runMode: 2,
    openMode: 0
  },
  env: {
    apiUrl: 'https://www.automationexercise.com/api',
    testUser: {
      email: 'test@example.com',
      password: 'test123'
    }
  }
}
```

## 🎯 Test Scenarios Covered

### UI Testing
- ✅ Page navigation and routing
- ✅ Form submissions and validation
- ✅ User interactions (click, type, select)
- ✅ Responsive design testing
- ✅ Accessibility testing
- ✅ Performance testing

### API Testing
- ✅ REST API endpoints
- ✅ CRUD operations
- ✅ Error handling
- ✅ Data validation
- ✅ Performance testing

### E2E Testing
- ✅ Complete user journeys
- ✅ Cross-browser compatibility
- ✅ Error scenarios
- ✅ Performance monitoring

## 📈 Reporting

### Screenshots
- Automatic screenshots on test failure
- Manual screenshots for specific scenarios
- Responsive design screenshots

### Video Recording
- Disabled for performance optimization

### Console Logs
- Custom logging for debugging
- API request/response logging

### GitHub Actions Artifacts
- Screenshots uploaded on failure
- Videos uploaded for all runs
- Test results summary in PR comments

## 🔍 Debugging

### Debug Mode
```bash
npx cypress open --config debug=true
```

### Custom Logging
```javascript
cy.task('log', 'Custom debug message')
cy.task('table', { key: 'value' })
```

## 🚀 Best Practices

1. **Page Object Model** - Keep tests maintainable and reusable
2. **Custom Commands** - Reduce code duplication
3. **Data-Driven Testing** - Use fixtures for test data
4. **Error Handling** - Test both positive and negative scenarios
5. **Performance Testing** - Monitor response times
6. **Accessibility Testing** - Ensure inclusive design
7. **Cross-Browser Testing** - Ensure compatibility
8. **GitHub Actions Integration** - Automated testing pipeline

## 🐛 Troubleshooting

### Common Issues

1. **Element not found**
   - Check if element selectors are correct
   - Verify page has loaded completely
   - Use `cy.wait()` for dynamic content

2. **Test flakiness**
   - Add proper waits and assertions
   - Use `cy.intercept()` for API calls
   - Implement retry logic

3. **Performance issues**
   - Disable video recording
   - Use headless mode
   - Optimize test data

### Debug Commands
```bash
# Run specific test with debug info
npx cypress run --spec "cypress/e2e/home.cy.js" --config debug=true

# Run tests in specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox

# Open Cypress in debug mode
npx cypress open
```

## 📝 Contributing

1. Follow the existing code structure
2. Add proper documentation
3. Include both positive and negative test cases
4. Maintain test data in fixtures
5. Use descriptive test names

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions, please open an issue in the GitHub repository. 