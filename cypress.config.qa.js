const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    pageLoadTimeout: 45000,
    watchForFileChanges: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      environment: 'qa',
      apiUrl: 'https://www.automationexercise.com/api',
      testUser: {
        email: 'qa-test@example.com',
        password: 'qa123'
      },
      logLevel: 'info'
    },
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(`[QA] ${message}`)
          return null
        },
        table(message) {
          console.table(message)
          return null
        }
      })
    },
  },
}) 