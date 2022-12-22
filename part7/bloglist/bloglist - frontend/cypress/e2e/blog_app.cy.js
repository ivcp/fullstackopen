describe('Blogapp', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Ivo',
      username: 'tester',
      password: '12345',
    };
    const user2 = {
      name: 'User2',
      username: 'tester2',
      password: '12345',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.request('POST', 'http://localhost:3003/api/users/', user2);
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
        cy.login({ username: 'tester', password: '12345' });
      });

      it('A blog can be created', function () {
        cy.contains('add new blog').click();
        cy.get('#title').type('new blog test');
        cy.get('#author').type('John Doe');
        cy.get('#url').type('www.test.com');
        cy.get('#add-blog-btn').click();
        cy.contains('new blog test John Doe');
      });

      describe('some blogs exist', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'existing blog',
            author: 'John',
            url: 'www.blog.com',
          });
          cy.createBlog({
            title: 'second existing blog',
            author: 'Sam',
            url: 'www.blog.com',
          });
          cy.createBlog({
            title: 'third existing blog',
            author: 'John',
            url: 'www.blog.com',
          });
        });
        it('users can like blog', function () {
          cy.contains('existing blog John').as('blog');
          cy.get('@blog').contains('view').click();
          cy.get('@blog').contains('like').click();
          cy.get('@blog').contains('likes 1');
        });
        it('user who created blog can delete it', function () {
          cy.contains('third existing blog John').as('blog');
          cy.get('@blog').contains('view').click();
          cy.get('@blog').contains('remove').click();
          cy.get('@blog').should('not.exist');
        });
        it('user who did not create blog cannot delete it', function () {
          cy.contains('log out').click();
          cy.login({ username: 'tester2', password: '12345' });
          cy.contains('existing blog John').as('blog');
          cy.get('@blog').contains('view').click();
          cy.get('@blog').should('not.contain', 'remove');
        });

        it('blogs are ordered by likes', function () {
          cy.likeBlog('second existing blog Sam', 6);
          cy.likeBlog('existing blog John', 3);
          cy.contains('third existing blog John').contains('view').click();
          cy.get('.blog')
            .eq(0)
            .should('contain', 'second existing blog Sam')
            .and('contain', 'likes 6');
          cy.get('.blog')
            .eq(1)
            .should('contain', 'existing blog John')
            .and('contain', 'likes 3');
          cy.get('.blog')
            .eq(2)
            .should('contain', 'third existing blog')
            .and('contain', 'likes 0');
        });
      });
    });
  });
});
