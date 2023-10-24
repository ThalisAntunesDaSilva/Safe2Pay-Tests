

describe('Safe2pay - tests',{ env: {hideCredentials: true}}, () => {
    it('Create users', () => {
      cy.createUser().then((response) => {
        assert.equal(response.status, 200);
    
      });
    });

  
    it('Create post', () => {
      cy.createPost().then((response) => {
        assert.equal(response.status, 200);
    
      });
  })


    it('Delete post and user', () => {
      cy.deletePostAndUser().then((postResponse, userResponse) => {
        assert.equal(postResponse.status, 200);
        assert.equal(userResponse.status, 200, 'Status da exclusão do usuário');
      });
    });
  });
  

