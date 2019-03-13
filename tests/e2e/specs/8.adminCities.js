describe('Admin Cities', () => {
  it('List cities', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // url should be admin/cities
    cy.url().should('include', '/admin/cities')

    cy.get('div.v-toolbar__title').contains('Cities')
  })
  it('Create new city', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Click create new city
    cy.get('button.btnNewItem')
      .contains('New Item')
      .click()
    cy.get('div.dlgNewEditItem.v-dialog--active').should('be.visible')

    // Type new city and save
    cy.get('input[name=name]')
      .clear()
      .type('A New City')
    cy.get('button.btnSave').click()
    cy.get('div.success')
      .should('be.visible')
      .contains('Saved successfully')
  })
  it('Edit city', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Click and edit first element
    cy.get('td > span.v-tooltip.v-tooltip--bottom')
      .eq(0)
      .click()
    cy.get('input[name=name]')
      .clear()
      .type('A New City Edited')
    cy.get('button.btnSave').click()
    cy.get('div.success')
      .should('be.visible')
      .contains('Saved successfully')
  })
  it('Search city', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Search edited city
    cy.get('input[aria-label=Search]')
      .clear()
      .type('A New City Edited')
    cy.wait(1000)
    cy.get('table.v-datatable.v-table > tbody > tr').should('have.length', 1)
    cy.get('table.v-datatable.v-table > tbody > tr > td')
      .eq(1)
      .contains('A New City Edited')
  })
  it('Delete city', () => {
    cy.login()
    cy.setLocaleToEN()
    cy.visit('/admin/cities')

    // Click and edit first element
    cy.get('td > span.v-tooltip.v-tooltip--bottom')
      .eq(1)
      .click()
    cy.get('div.v-dialog.v-dialog--active').should('be.visible')
    cy.get('button > div.v-btn__content')
      .contains('Delete')
      .click()
  })
})
