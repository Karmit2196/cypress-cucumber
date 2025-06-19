const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    pageLoadTimeout: 30000,
    watchForFileChanges: true,
    retries: {
      runMode: 1,
      openMode: 0
    },
    env: {
      environment: 'development',
      apiUrl: 'https://www.automationexercise.com/api',
      testUser: {
        email: 'dev-test@example.com',
        password: 'dev123'
      },
      logLevel: 'debug'
    },
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(`[DEV] ${message}`)
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