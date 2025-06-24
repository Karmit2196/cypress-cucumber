# Allure Reporting Integration

This Cypress framework is now integrated with Allure reporting for beautiful, detailed test reports.

## What is Allure?

Allure is a flexible, lightweight multi-language test reporting tool that provides detailed information about test execution. It generates beautiful HTML reports with:

- Test execution timeline
- Detailed test steps
- Screenshots and videos
- Environment information
- Test statistics and trends
- Failure analysis

## Available Scripts

### Test Execution with Allure Reports

```bash
# Run all tests and generate Allure report
npm run test:allure

# Run smoke tests and generate Allure report
npm run test:smoke:allure

# Run regression tests and generate Allure report
npm run test:regression:allure
```

### Allure Report Management

```bash
# Generate HTML report from allure-results
npm run allure:generate

# Serve report locally (opens in browser)
npm run allure:serve

# Open existing report
npm run allure:open
```

## How to Use Allure Reports

### 1. Local Development

1. Run tests with Allure:
   ```bash
   npm run test:smoke:allure
   ```

2. View the report:
   ```bash
   npm run allure:serve
   ```

### 2. GitHub Actions

When tests run in GitHub Actions:
- Allure results are generated automatically
- Reports are uploaded as artifacts
- You can download and view them from the Actions tab

### 3. Report Features

The Allure report includes:
- **Overview**: Test execution summary
- **Categories**: Failed, broken, skipped tests
- **Suites**: Test organization by spec files
- **Timeline**: Test execution timeline
- **Behaviors**: BDD-style test organization
- **Packages**: Test organization by package structure

## Allure Annotations in Tests

You can enhance your reports with Allure annotations:

```javascript
// Add description to test
describe('Login Functionality', () => {
  it('should login with valid credentials', () => {
    cy.allure().description('User should be able to login with valid email and password');
    // test code
  });
});

// Add severity
it('should display error for invalid login', () => {
  cy.allure().severity('critical');
  // test code
});

// Add step details
it('should complete checkout process', () => {
  cy.allure().step('Add item to cart', () => {
    // add to cart code
  });
  
  cy.allure().step('Proceed to checkout', () => {
    // checkout code
  });
});
```

## Configuration

### Allure Properties

The `allure.properties` file configures:
- Results and report directories
- Attachment handling
- File type inclusions/exclusions

### Cypress Configuration

Allure is configured in `cypress.config.js`:
- Plugin integration
- Environment variables
- Video recording enabled

## Report Structure

```
allure-results/          # Raw test results
allure-report/           # Generated HTML report
├── index.html          # Main report page
├── data/               # Report data
├── styles/             # CSS styles
└── scripts/            # JavaScript files
```

## Troubleshooting

### Common Issues

1. **No reports generated**: Ensure `allure-results` directory exists
2. **Missing screenshots**: Check if screenshots are being captured
3. **Report not opening**: Verify Allure commandline is installed

### Commands

```bash
# Clean and regenerate report
rm -rf allure-results allure-report
npm run test:allure

# Check Allure installation
npx allure --version
```

## Integration with CI/CD

The GitHub Actions workflow automatically:
1. Runs tests with Allure integration
2. Generates Allure reports
3. Uploads reports as artifacts
4. Makes reports available for download

## Best Practices

1. **Use descriptive test names**: They appear in the report
2. **Add screenshots on failure**: Automatically captured
3. **Use Allure annotations**: Enhance report details
4. **Regular report generation**: Keep reports up to date
5. **Archive old reports**: Manage storage efficiently 