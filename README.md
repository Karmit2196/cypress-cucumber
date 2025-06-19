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
- **Multi-Environment Support** - Dev, QA, and Production configurations
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
├── cypress.config.js          # Default Cypress configuration
├── cypress.config.dev.js      # Development environment config
├── cypress.config.qa.js       # QA environment config
├── cypress.config.prod.js     # Production environment config
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

### Environment-Specific Commands

#### Development Environment
```bash
# Run all tests in dev environment
npm run test:dev

# Run specific test categories in dev
npm run test:home:dev
npm run test:login:dev
npm run test:api:dev
npm run test:e2e:dev

# Run in different browsers in dev
npm run test:chrome:dev
npm run test:firefox:dev
npm run test:edge:dev

# Run responsive tests in dev
npm run test:mobile:dev
npm run test:tablet:dev
npm run test:desktop:dev
```

#### QA Environment
```bash
# Run all tests in qa environment
npm run test:qa

# Run specific test categories in qa
npm run test:home:qa
npm run test:login:qa
npm run test:api:qa
npm run test:e2e:qa

# Run in different browsers in qa
npm run test:chrome:qa
npm run test:firefox:qa
npm run test:edge:qa

# Run responsive tests in qa
npm run test:mobile:qa
npm run test:tablet:qa
npm run test:desktop:qa
```

#### Production Environment
```bash
# Run all tests in prod environment
npm run test:prod

# Run specific test categories in prod
npm run test:home:prod
npm run test:login:prod
npm run test:api:prod
npm run test:e2e:prod

# Run in different browsers in prod
npm run test:chrome:prod
npm run test:firefox:prod
npm run test:edge:prod

# Run responsive tests in prod
npm run test:mobile:prod
npm run test:tablet:prod
npm run test:desktop:prod
```

### Test Type Commands

#### Smoke Tests
```bash
# Run smoke tests (home and login)
npm run test:smoke
npm run test:smoke:dev
npm run test:smoke:qa
npm run test:smoke:prod
```

#### Regression Tests
```bash
# Run all tests
npm run test:regression
npm run test:regression:dev
npm run test:regression:qa
npm run test:regression:prod
```

#### UI Tests
```bash
# Run UI tests (home, login, e2e)
npm run test:ui
npm run test:ui:dev
npm run test:ui:qa
npm run test:ui:prod
```

#### API Tests
```bash
# Run API tests
npm run test:api:all
npm run test:api:all:dev
npm run test:api:all:qa
npm run test:api:all:prod
```

### Browser-Specific Commands
```bash
# Run tests in specific browsers
npm run test:chrome
npm run test:firefox
npm run test:edge

# Run tests in specific browsers for specific environments
npm run test:chrome:dev
npm run test:firefox:qa
npm run test:edge:prod
```

### Responsive Testing
```bash
# Run tests with different viewports
npm run test:mobile
npm run test:tablet
npm run test:desktop

# Run responsive tests for specific environments
npm run test:mobile:dev
npm run test:tablet:qa
npm run test:desktop:prod
```

### CI/CD Commands
```bash
# Run tests in CI environment
npm run test:ci
npm run test:ci:dev
npm run test:ci:qa
npm run test:ci:prod

# Run tests with recording
npm run test:record

# Run tests in parallel
npm run test:parallel
```

## 🔧 Environment Configurations

### Development Environment (`cypress.config.dev.js`)
- **Base URL**: `https://www.automationexercise.com`
- **Video Recording**: Enabled
- **Retry Logic**: 1 retry for failed tests
- **Timeouts**: Shorter timeouts for faster feedback
- **Log Level**: Debug
- **Watch Mode**: Enabled

### QA Environment (`cypress.config.qa.js`)
- **Base URL**: `https://www.automationexercise.com`
- **Video Recording**: Disabled
- **Retry Logic**: 2 retries for failed tests
- **Timeouts**: Medium timeouts for stability
- **Log Level**: Info
- **Watch Mode**: Disabled

### Production Environment (`cypress.config.prod.js`)
- **Base URL**: `https://www.automationexercise.com`
- **Video Recording**: Disabled
- **Retry Logic**: 3 retries for failed tests
- **Timeouts**: Longer timeouts for reliability
- **Log Level**: Error only
- **Watch Mode**: Disabled

## 🚀 GitHub Actions Integration

The framework includes a comprehensive GitHub Actions workflow that automatically runs tests on:

### Triggers
- **Push to main/develop branches**
- **Pull requests to main/develop branches**
- **Scheduled daily runs at 2 AM UTC**
- **Manual workflow dispatch**

### Workflow Features
- **Parallel execution** across multiple browsers and environments
- **Matrix strategy** for comprehensive testing
- **Artifact upload** for screenshots and videos
- **PR comments** with test results
- **Environment-specific configurations**
- **Manual trigger with environment and test type selection**

### Manual Workflow Dispatch
You can manually trigger the workflow with specific parameters:
1. Go to Actions tab in GitHub
2. Select "Cypress Tests" workflow
3. Click "Run workflow"
4. Choose environment (dev/qa/prod)
5. Choose test type (smoke/regression/ui/api/e2e)

### Workflow Jobs
1. **cypress-run**: Runs tests in dev and qa environments
2. **cypress-prod**: Runs tests in production (only on main branch)
3. **cypress-manual**: Handles manual workflow triggers
4. **test-results**: Generates test summaries and PR comments

## 📋 Test Categories

### 1. Home Page Tests (`home.cy.js`)
- Page load and navigation
- Search functionality
- Category navigation
- Featured products
- Newsletter subscription
- Responsive design
- Performance testing
- Accessibility testing

### 2. Login/Registration Tests (`login.cy.js`)
- User registration flow
- Login functionality
- Form validation
- Account management
- Security testing
- Error handling
- Performance testing

### 3. API Tests (`api.cy.js`)
- Products API
- User management API
- Cart API
- Brands API
- Categories API
- Error handling
- Performance testing
- Data validation

### 4. End-to-End Tests (`e2e.cy.js`)
- Complete user journeys
- Guest user shopping
- Product search and filtering
- Account lifecycle
- Newsletter subscription
- Responsive design
- Error scenarios
- Performance testing
- Cross-browser compatibility
- Accessibility testing

## 🏗️ Page Object Model

### BasePage Class
The `BasePage` class provides common functionality for all page objects:
- Navigation methods
- Element interactions
- Assertions
- Screenshot capabilities
- API waiting utilities

### Page Classes
Each page has its own class with specific methods:

#### HomePage
- Navigation to different sections
- Search functionality
- Category filtering
- Product interactions
- Newsletter subscription

#### LoginPage
- User registration
- Login/logout functionality
- Form validation
- Account management

#### ProductsPage
- Product browsing
- Search and filtering
- Category and brand filtering
- Product interactions
- Pagination

#### CartPage
- Cart management
- Checkout process
- Order confirmation
- Payment processing

## 🔧 Custom Commands

The framework includes several custom commands for common operations:

```javascript
// Login with credentials
cy.login(email, password)

// Register new user
cy.register(name, email, password)

// Add product to cart
cy.addToCart(productName)

// Search for products
cy.searchProduct(searchTerm)

// Generate random email
cy.generateRandomEmail()

// Generate random name
cy.generateRandomName()

// Wait for API response
cy.waitForApi(method, url, alias)
```

## 📊 Test Data Management

### Fixtures
- `testData.json` - Contains test data for UI tests
- `apiEndpoints.json` - Contains API endpoint configurations

### Usage
```javascript
cy.fixture('testData').then((data) => {
  const user = data.users.validUser
  // Use user data in tests
})
```

## ⚙️ Configuration

### Environment Variables
Each environment has its own configuration:

```javascript
// Development
env: {
  environment: 'development',
  apiUrl: 'https://www.automationexercise.com/api',
  testUser: {
    email: 'dev-test@example.com',
    password: 'dev123'
  },
  logLevel: 'debug'
}

// QA
env: {
  environment: 'qa',
  apiUrl: 'https://www.automationexercise.com/api',
  testUser: {
    email: 'qa-test@example.com',
    password: 'qa123'
  },
  logLevel: 'info'
}

// Production
env: {
  environment: 'production',
  apiUrl: 'https://www.automationexercise.com/api',
  testUser: {
    email: 'prod-test@example.com',
    password: 'prod123'
  },
  logLevel: 'error'
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
- Enabled in development environment
- Disabled in QA and production for performance

### Console Logs
- Custom logging for debugging
- API request/response logging
- Environment-specific log levels

### GitHub Actions Artifacts
- Screenshots uploaded on failure
- Videos uploaded for all runs
- Test results summary in PR comments

## 🔍 Debugging

### Debug Mode
```bash
npx cypress open --config debug=true
```

### Environment-Specific Debugging
```bash
# Debug in development environment
npm run cypress:open:dev

# Debug in QA environment
npm run cypress:open:qa

# Debug in production environment
npm run cypress:open:prod
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
8. **Environment-Specific Configurations** - Tailor settings per environment
9. **GitHub Actions Integration** - Automated testing pipeline

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
   - Disable video recording in production
   - Use headless mode
   - Optimize test data

4. **Environment-specific issues**
   - Check environment configuration
   - Verify environment variables
   - Use appropriate timeouts

### Debug Commands
```bash
# Run specific test with debug info
npx cypress run --spec "cypress/e2e/home.cy.js" --config debug=true

# Run tests in specific environment
npm run test:home:dev
npm run test:home:qa
npm run test:home:prod

# Open Cypress in debug mode for specific environment
npm run cypress:open:dev
npm run cypress:open:qa
npm run cypress:open:prod
```

## 📝 Contributing

1. Follow the existing code structure
2. Add proper documentation
3. Include both positive and negative test cases
4. Maintain test data in fixtures
5. Use descriptive test names
6. Test in all environments before submitting

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For questions or issues:
1. Check the troubleshooting section
2. Review the test documentation
3. Create an issue with detailed information
4. Check GitHub Actions logs for CI/CD issues

---

**Happy Testing! 🧪✨** 