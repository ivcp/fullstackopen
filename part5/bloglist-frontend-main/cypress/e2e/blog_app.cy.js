describe('Blogapp', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Ivo',
      username: 'tester',
      password: '12345',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Log in to application');
    cy.get('form').contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('tester');
      cy.get('#password').type('12345');
      cy.get('#login-btn').click();

      cy.contains('Ivo logged in');
    });

    it('fails with wrong credentials', function () {
      cy.get('#username').type('tester');
      cy.get('#password').type('wrong password');
      cy.get('#login-btn').click();

      cy.get('.message')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.get('#username').type('tester');
        cy.get('#password').type('12345');
        cy.get('#login-btn').click();
      });

      it('A blog can be created', function () {
        cy.contains('add new blog').click();
        cy.get('#title').type('new blog test');
        cy.get('#author').type('John Doe');
        cy.get('#url').type('www.test.com');
        cy.get('#add-blog-btn').click();
        cy.contains('new blog test John Doe');
      });
    });
  });
});
