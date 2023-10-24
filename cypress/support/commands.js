
import { faker } from '@faker-js/faker';
const token = "6536af891956e10a90c899e6"
Cypress.env('token', token);

Cypress.Commands.add('requestWithToken', (method, url, body) => {
  const token = Cypress.env('token'); 

  cy.api({
    method,
    url,
    body,
    headers: {
      'app-id': token 
    }
  });
});

Cypress.Commands.add('generateJsonUser', (title, firstName, lastName, email) => {
  const jsonData = {
    title : title, 
    firstName : firstName,
    lastName: lastName,
    email : email
  };

  return jsonData;
});
 

Cypress.Commands.add('generateJsonPost', (text, image, likes, tags, owner) => {
  const jsonData = {
    text: text,
    image: image,
    likes: likes,
    tags: tags,
    owner: owner
  };

  return jsonData;
});


Cypress.Commands.add("getUsers", () => {
  cy.requestWithToken('GET', 'user').then(({ status, body }) => {
    const { data } = body;
    expect(status).to.equal(200);
    const randomIndex = Math.floor(Math.random() * data.length);
  return  data[randomIndex].id; 
  })

})

Cypress.Commands.add("getTags", () => {
  cy.requestWithToken('GET', 'tag').then(({ status, body }) => {
    const { data } = body;
    expect(status).to.equal(200);
    const validTags = data.filter(tag => tag && tag.trim() !== '');
    const numberOfTags = Math.floor(Math.random() * 3) + 3;
    const randomTags = [];
    for (let i = 0; i < numberOfTags; i++) {
      const randomIndex = Math.floor(Math.random() * validTags.length);
      randomTags.push(validTags[randomIndex]);
    }
    return randomTags;
})
})

Cypress.Commands.add("createUser", () => {
  const firstName = faker.person.firstName(); 
  const lastName = faker.person.lastName();  
  const email = faker.internet.email();

    cy.generateJsonUser("mr",firstName ,lastName , email).then((json) => {
        cy.requestWithToken('POST', `user/create`, json)
      });

})

Cypress.Commands.add("createPost", () => {
  let tags;
  const text = faker.lorem.paragraph();
  const image = faker.image.imageUrl();
  const likes = faker.number.int();

  cy.createUser().then((response) => {
    const ownerId = response.body.id;


    cy.getTags().then((tagList) => {
      tags = tagList;

      cy.generateJsonPost(text, image, likes, tags, ownerId).then((json) => {
        cy.requestWithToken('POST', 'post/create', json).then((response) => {
          assert.equal(response.status, 200);
        });
      });
    });

})})

Cypress.Commands.add("deletePostAndUser", () => {
  cy.createPost().then((response) => {
    const postId = response.body.id;
    const ownerId = response.body.owner.id; 
    return Promise.all([
      cy.requestWithToken('DELETE', `post/${postId}`),
      cy.requestWithToken('DELETE', `user/${ownerId}`)
    ]);
  });
});


