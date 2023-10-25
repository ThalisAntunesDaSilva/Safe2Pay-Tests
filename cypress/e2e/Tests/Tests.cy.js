describe("Safe2pay - tests", {env: {hideCredentials: true}}, () => {
	it.only("Create users", () => {
		cy.createUser().then(status => {
			assert.equal(status, 200)
		})
	})

	it.only("Create post", () => {
		cy.createPost().then(status => {
			assert.equal(status, 200)
		})
	})

	it.only("Delete post", () => {
		cy.deletePost().then(status => {
			assert.equal(status, 200)
		})
	})

	it.only("Delete user", () => {
		cy.deleteUser().then(status => {
			assert.equal(status, 200)
		})
	})
})
