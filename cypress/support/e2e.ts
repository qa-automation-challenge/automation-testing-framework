import "@shelex/cypress-allure-plugin"

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('Minified React error')) {
    return false
  }

  return true
})