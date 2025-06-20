describe('Website Inspection', () => {
  it('should inspect the home page structure', () => {
    cy.visit('https://www.automationexercise.com/')
    
    // Wait for page to load
    cy.get('body').should('be.visible')
    
    // Log the page title
    cy.title().then((title) => {
      cy.log('Page title:', title)
    })
    
    // Inspect header elements (don't fail if not found)
    cy.get('body').then(($body) => {
      const header = $body.find('header')
      cy.log('Header found:', header.length > 0)
      if (header.length > 0) {
        cy.log('Header HTML:', header.html().substring(0, 500))
      }
    })
    
    // Look for navigation elements (don't fail if not found)
    cy.get('body').then(($body) => {
      const nav = $body.find('nav')
      cy.log('Navigation found:', nav.length > 0)
    })
    
    // Look for common elements
    cy.get('a').then(($links) => {
      cy.log('Total links found:', $links.length)
      // Log first few links
      for (let i = 0; i < Math.min(10, $links.length); i++) {
        const text = $links.eq(i).text().trim()
        const href = $links.eq(i).attr('href')
        if (text) {
          cy.log(`Link ${i + 1}: "${text}" -> ${href}`)
        }
      }
    })
    
    // Look for buttons
    cy.get('button').then(($buttons) => {
      cy.log('Total buttons found:', $buttons.length)
      // Log first few buttons
      for (let i = 0; i < Math.min(10, $buttons.length); i++) {
        const text = $buttons.eq(i).text().trim()
        if (text) {
          cy.log(`Button ${i + 1}: "${text}"`)
        }
      }
    })
    
    // Look for forms
    cy.get('form').then(($forms) => {
      cy.log('Total forms found:', $forms.length)
    })
    
    // Look for input fields
    cy.get('input').then(($inputs) => {
      cy.log('Total inputs found:', $inputs.length)
      // Log input types
      for (let i = 0; i < Math.min(10, $inputs.length); i++) {
        const type = $inputs.eq(i).attr('type')
        const name = $inputs.eq(i).attr('name')
        const placeholder = $inputs.eq(i).attr('placeholder')
        cy.log(`Input ${i + 1}: type="${type}" name="${name}" placeholder="${placeholder}"`)
      }
    })
    
    // Look for specific elements by text content
    cy.get('body').then(($body) => {
      const products = $body.find(':contains("Products")')
      cy.log('Products elements found:', products.length)
      if (products.length > 0) {
        for (let i = 0; i < Math.min(3, products.length); i++) {
          cy.log(`Products element ${i + 1}:`, products.eq(i).text().trim(), products.eq(i).prop('tagName'))
        }
      }
    })
    
    cy.get('body').then(($body) => {
      const signup = $body.find(':contains("Signup")')
      cy.log('Signup elements found:', signup.length)
      if (signup.length > 0) {
        for (let i = 0; i < Math.min(3, signup.length); i++) {
          cy.log(`Signup element ${i + 1}:`, signup.eq(i).text().trim(), signup.eq(i).prop('tagName'))
        }
      }
    })
    
    cy.get('body').then(($body) => {
      const login = $body.find(':contains("Login")')
      cy.log('Login elements found:', login.length)
      if (login.length > 0) {
        for (let i = 0; i < Math.min(3, login.length); i++) {
          cy.log(`Login element ${i + 1}:`, login.eq(i).text().trim(), login.eq(i).prop('tagName'))
        }
      }
    })
    
    // Look for logo
    cy.get('img').then(($imgs) => {
      cy.log('Total images found:', $imgs.length)
      // Look for logo
      for (let i = 0; i < $imgs.length; i++) {
        const src = $imgs.eq(i).attr('src')
        const alt = $imgs.eq(i).attr('alt')
        if (src && (src.includes('logo') || alt && alt.toLowerCase().includes('logo'))) {
          cy.log('Logo found:', src, alt)
        }
      }
    })
    
    // Look for common class names
    cy.get('[class*="header"]').then(($header) => {
      cy.log('Header class elements found:', $header.length)
    })
    
    cy.get('[class*="nav"]').then(($nav) => {
      cy.log('Nav class elements found:', $nav.length)
    })
    
    cy.get('[class*="logo"]').then(($logo) => {
      cy.log('Logo class elements found:', $logo.length)
    })
    
    // Look for common IDs
    cy.get('#header').then(($header) => {
      cy.log('Header ID found:', $header.length > 0)
    })
    
    cy.get('#logo').then(($logo) => {
      cy.log('Logo ID found:', $logo.length > 0)
    })
    
    // Take a screenshot for manual inspection
    cy.screenshot('home-page-inspection')
  })
}) 