// Utility functions for Cypress tests

/// <reference types="cypress" />
// Note: cy and expect are Cypress globals

export function measurePageLoadTime(expectedMax: number = 5000, pageName: string = 'Page'): void {
  cy.window().then((win: Window) => {
    const loadTime = win.performance.timing.domContentLoadedEventEnd - win.performance.timing.navigationStart;
    cy.log(`${pageName} load time: ${loadTime}ms`);
    expect(loadTime).to.be.lessThan(expectedMax); // Assert load time is reasonable
  });
}

export function generateRandomEmail(): string {
  const timestamp = Date.now();
  return `test${timestamp}@example.com`;
}

export function generateRandomName(): string {
  const timestamp = Date.now();
  return `TestUser${timestamp}`;
} 