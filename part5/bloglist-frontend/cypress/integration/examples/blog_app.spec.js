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

  describe.only('When logged in', function () {
    beforeEach(function() {
      cy.get('#username').type('newGuy')
      cy.get('#password').type('new')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Cypress tree')
      cy.get('#author').type('Tree hugger')
      cy.get('#url').type('www.HuggACypress.com')
      cy.get('#create-button').click()

      cy.contains('Cypress tree')
      cy.contains('Tree hugger')

    })

    it('User can like blog', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Cypress tree')
      cy.get('#author').type('Tree hugger')
      cy.get('#url').type('www.HuggACypress.com')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.get('#likes').contains(1)

    })

    it('Delete the blog', function() {
      cy.contains('New Blog').click()
      cy.get('#title').type('Cypress tree')
      cy.get('#author').type('Tree hugger')
      cy.get('#url').type('www.HuggACypress.com')
      cy.get('#create-button').click()

      cy.contains('view').click()

      cy.contains('Cypress tree')
      cy.get('#Remove-button').click()
      cy.get('html').should('not.have.value', 'Cypress tree')

    })
  })

})