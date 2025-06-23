// Utility functions for Cypress tests

export function measurePageLoadTime(expectedMax = 5000, pageName = 'Page') {
  cy.window().then((win) => {
    const loadTime = win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart;
    cy.log(`${pageName} load time: ${loadTime}ms`);
    expect(loadTime).to.be.lessThan(expectedMax); // Assert load time is reasonable
  });
}

export function generateRandomEmail() {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
}

export function generateRandomName() {
  const timestamp = Date.now();
  return `TestUser${timestamp}`;
} 