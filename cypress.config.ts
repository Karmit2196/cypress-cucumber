import { defineConfig } from 'cypress'
import createBundler from '@bahmutov/cypress-esbuild-preprocessor'
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor'
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild'

export default defineConfig({
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
      apiUrl: 'https://www.automationexercise.com/api',
      testUser: {
        email: 'test@example.com',
        password: 'test123'
      }
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: false,
      html: false,
      json: true
    },
    specPattern: 'cypress/e2e/**/*.feature',
    supportFile: 'cypress/support/e2e.ts',
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    setupNodeEvents(on, config) {
      // Add custom tasks
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
        table(message) {
          console.table(message)
          return null
        }
      })

      // Add cucumber preprocessor plugin
      addCucumberPreprocessorPlugin(on, config)

      // Add esbuild preprocessor for TypeScript support
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)],
      }))

      return config
    },
  },
}) 