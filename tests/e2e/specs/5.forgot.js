import faker from 'faker'

describe('Forgot Password', () => {
  it('Visits the forgot password url', () => {
    cy.visit('/forgot')
    cy.setLocaleToEN()
    cy.get('h1')
      .should('have.class', 'display-2')
      .and('contain', 'Forgot my password')
  })
  it('Displays errors when user does not exist', () => {
    cy.get('input[name=email]')
      .clear()
      .type(`${faker.internet.email()}{enter}`)

    cy.get('div.error')
      .should('be.visible')
      .and('contain', 'User does not exists')

    // and still be on the same URL
    cy.url().should('include', '/forgot')
  })
  it('Forgot password', () => {
    cy.get('input[name=email]')
      .clear()
      .type('admin@admin.com{enter}')

    cy.get('div.success')
      .should('be.visible')
      .and(
        'contain',
        'We have sent a message to admin@admin.com with instructions to recover your password'
      )
  })
})
