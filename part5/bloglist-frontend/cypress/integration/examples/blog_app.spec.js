describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'newGuy',
      username: 'newGuy',
      password: 'new'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('login')

  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('newGuy')
      cy.get('#password').type('new')
      cy.get('#login-button').click()

      cy.contains('newGuy, login successful!')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('newGuy')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .contains('Wrong username or password, please try again.')
      cy.get('.error')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error')
        .should('have.css', 'border-style', 'solid')
    })
  })

})