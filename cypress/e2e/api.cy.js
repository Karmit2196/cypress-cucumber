describe('API Tests', () => {
  const baseUrl = 'https://www.automationexercise.com/api'

  beforeEach(() => {
    // Set up any common headers or configurations
    cy.request({
      method: 'GET',
      url: `${baseUrl}/productsList`,
      failOnStatusCode: false
    })
  })

  describe('Products API', () => {
    it('should get all products', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/productsList`
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('products')
        expect(response.body.products).to.be.an('array')
        expect(response.body.products.length).to.be.greaterThan(0)
      })
    })

    it('should search products by name', () => {
      const searchTerm = 'dress'
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/searchProduct`,
        qs: {
          search_product: searchTerm
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('products')
        
        // Verify search results contain the search term
        response.body.products.forEach(product => {
          expect(product.name.toLowerCase()).to.contain(searchTerm.toLowerCase())
        })
      })
    })

    it('should get product details by ID', () => {
      const productId = 1
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/getProductDetailsById`,
        qs: {
          id: productId
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('product')
        expect(response.body.product.id).to.eq(productId)
        expect(response.body.product).to.have.property('name')
        expect(response.body.product).to.have.property('price')
      })
    })

    it('should handle invalid product ID', () => {
      const invalidProductId = 99999
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/getProductDetailsById`,
        qs: {
          id: invalidProductId
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })
  })

  describe('User Management API', () => {
    let testUser = {
      name: `TestUser${Date.now()}`,
      email: `test${Date.now()}@example.com`,
      password: 'test123',
      title: 'Mr',
      birth_date: '01-01-1990',
      birth_month: '01',
      birth_year: '1990',
      firstname: 'Test',
      lastname: 'User',
      company: 'Test Company',
      address1: '123 Test Street',
      address2: 'Apt 1',
      country: 'United States',
      zipcode: '12345',
      state: 'Test State',
      city: 'Test City',
      mobile_number: '1234567890'
    }

    it('should create new user account', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/createAccount`,
        body: testUser,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(201)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('User created!')
      })
    })

    it('should verify user login', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/verifyLogin`,
        body: {
          email: testUser.email,
          password: testUser.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('User exists!')
      })
    })

    it('should fail login with invalid credentials', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/verifyLogin`,
        body: {
          email: 'invalid@example.com',
          password: 'wrongpassword'
        },
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(404)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('User not found!')
      })
    })

    it('should update user account', () => {
      const updatedData = {
        name: testUser.name,
        email: testUser.email,
        password: testUser.password,
        title: 'Mrs',
        birth_date: '02-02-1990',
        birth_month: '02',
        birth_year: '1990',
        firstname: 'Updated',
        lastname: 'User',
        company: 'Updated Company',
        address1: '456 Updated Street',
        address2: 'Apt 2',
        country: 'Canada',
        zipcode: '54321',
        state: 'Updated State',
        city: 'Updated City',
        mobile_number: '0987654321'
      }

      cy.request({
        method: 'PUT',
        url: `${baseUrl}/updateAccount`,
        body: updatedData,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('User updated!')
      })
    })

    it('should delete user account', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/deleteAccount`,
        body: {
          email: testUser.email,
          password: testUser.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('Account deleted!')
      })
    })
  })

  describe('Cart API', () => {
    let userId = 1
    let productId = 1

    it('should add product to cart', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/addToCart`,
        body: {
          id: productId,
          quantity: 1
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('Product added to cart!')
      })
    })

    it('should view cart', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/viewCart`
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('id')
        expect(response.body).to.have.property('products')
      })
    })

    it('should update cart', () => {
      cy.request({
        method: 'PUT',
        url: `${baseUrl}/updateCart`,
        body: {
          id: productId,
          quantity: 2
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('Cart updated!')
      })
    })

    it('should delete cart', () => {
      cy.request({
        method: 'DELETE',
        url: `${baseUrl}/deleteCart`,
        body: {
          id: productId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('responseCode')
        expect(response.body.responseCode).to.eq(200)
        expect(response.body).to.have.property('message')
        expect(response.body.message).to.contain('Cart deleted!')
      })
    })
  })

  describe('Brands API', () => {
    it('should get all brands', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/brandsList`
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('brands')
        expect(response.body.brands).to.be.an('array')
        expect(response.body.brands.length).to.be.greaterThan(0)
      })
    })

    it('should get products by brand', () => {
      const brandId = 1
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/getBrandsProductsList`,
        qs: {
          brand_id: brandId
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('products')
        expect(response.body.products).to.be.an('array')
      })
    })
  })

  describe('Categories API', () => {
    it('should get all categories', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/getAllCategoryList`
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('categories')
        expect(response.body.categories).to.be.an('array')
        expect(response.body.categories.length).to.be.greaterThan(0)
      })
    })

    it('should get products by category', () => {
      const categoryId = 1
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/getCategoryList`,
        qs: {
          category_id: categoryId
        }
      }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).to.have.property('products')
        expect(response.body.products).to.be.an('array')
      })
    })
  })

  describe('Error Handling', () => {
    it('should handle invalid API endpoint', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/invalidEndpoint`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404)
      })
    })

    it('should handle malformed request body', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/createAccount`,
        body: 'invalid json',
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })

    it('should handle missing required fields', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/createAccount`,
        body: {
          name: 'Test User'
          // Missing required fields
        },
        headers: {
          'Content-Type': 'application/json'
        },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400)
      })
    })
  })

  describe('Performance Tests', () => {
    it('should respond within acceptable time', () => {
      const startTime = Date.now()
      
      cy.request({
        method: 'GET',
        url: `${baseUrl}/productsList`
      }).then((response) => {
        const responseTime = Date.now() - startTime
        expect(responseTime).to.be.lessThan(3000) // 3 seconds
        expect(response.status).to.eq(200)
      })
    })

    it('should handle concurrent requests', () => {
      const requests = []
      
      for (let i = 0; i < 5; i++) {
        requests.push(
          cy.request({
            method: 'GET',
            url: `${baseUrl}/productsList`
          })
        )
      }
      
      cy.wrap(requests).then(() => {
        // All requests should complete successfully
        requests.forEach(request => {
          expect(request.status).to.eq(200)
        })
      })
    })
  })

  describe('Data Validation', () => {
    it('should validate product data structure', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/productsList`
      }).then((response) => {
        expect(response.body.products[0]).to.have.property('id')
        expect(response.body.products[0]).to.have.property('name')
        expect(response.body.products[0]).to.have.property('price')
        expect(response.body.products[0]).to.have.property('brand')
        expect(response.body.products[0]).to.have.property('category')
      })
    })

    it('should validate user data structure', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/createAccount`,
        body: {
          name: `TestUser${Date.now()}`,
          email: `test${Date.now()}@example.com`,
          password: 'test123',
          title: 'Mr',
          birth_date: '01-01-1990',
          birth_month: '01',
          birth_year: '1990',
          firstname: 'Test',
          lastname: 'User',
          company: 'Test Company',
          address1: '123 Test Street',
          address2: 'Apt 1',
          country: 'United States',
          zipcode: '12345',
          state: 'Test State',
          city: 'Test City',
          mobile_number: '1234567890'
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        expect(response.body).to.have.property('responseCode')
        expect(response.body).to.have.property('message')
        expect(response.body.responseCode).to.be.a('number')
        expect(response.body.message).to.be.a('string')
      })
    })
  })
}) 