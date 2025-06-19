const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 20000,
    requestTimeout: 20000,
    responseTimeout: 20000,
    pageLoadTimeout: 60000,
    watchForFileChanges: false,
    retries: {
      runMode: 3,
      openMode: 0
    },
    env: {
      environment: 'production',
      apiUrl: 'https://www.automationexercise.com/api',
      testUser: {
        email: 'prod-test@example.com',
        password: 'prod123'
      },
      logLevel: 'error'
    },
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(`[PROD] ${message}`)
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