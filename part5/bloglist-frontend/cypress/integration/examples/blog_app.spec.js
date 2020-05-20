describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tester',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3000/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login from is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function(){
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('tester is logged in')
    })

    it('logout succesfully', function(){
      cy.contains('logout').click()
      cy.contains('login')
    })

    it('fails with wrong credentials', function(){
      cy.contains('login').click()
      cy.get('#username').type('wrongCredentials')
      cy.get('#password').type('wrongCredentials')
      cy.get('#login-button').click()
      cy.contains('login')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function(){
      cy.contains('post new').click()
      cy.get('input:first').type('test note created')
      cy.contains('save').click()
      cy.contains('test note created')
    })

    it('like can be clicked', function(){
      cy.contains('post new').click()
      cy.get('input:first').type('test note created')
      cy.contains('save').click()
      cy.contains('more').click()
      cy.contains('like').click()
    })
  })
})