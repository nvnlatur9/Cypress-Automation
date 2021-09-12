// This test case runs the workflow of order placement on BrowserStack website.
// It includes validation of details on various pages along the workflow and
// captures screenshot where ever necessary.


// navigate and login to bstackdemo.com
describe("login to stackdemo", function(){
    it('visit stackdemo', function() {
        cy.visit("https://bstackdemo.com/");
    })
    
    it("sign in", function(){
        cy.contains('Sign In').click()
        cy.contains('Select Username')
          .type('demouser{enter}')
        cy.contains('Select Password')
        .type('testingisfun99{enter}')
        cy.contains('Log In').click()
    })
    // validate logged in user
    it("validate logged in user", function(){
        cy.get(".Navbar_root__2kbI9")
        .should("contain", "demouser")
        cy.screenshot()
    })
})

// add item to shopping cart and validate the details
describe("add item to shopping cart", function(){
    it("add to cart", function(){
        cy.get('.shelf-item')
        .get('.shelf-item__title')
        .should("contain", "iPhone 12")
        .get('.shelf-item__buy-btn')
        .contains("Add to cart").click()
    })
    
    it("verify bag", function(){
        cy.screenshot()
        cy.get(".float-cart__content")
        .get(".header-title").should("contain","Bag")
        .get(".bag__quantity").should("contain","1")
        .get(".shelf-item__details").should("contain","iPhone 12")
        .get(".sub-price").should("contain","$ 799.00")
    })
    
    it("validate checkout window", function(){
        cy.expect(".float-cart__content").to.exist
    })

    it("checkout", function(){
        cy.get('.buy-btn')
        .click()
    })
})

// Enter shipping details on place order window
describe("place order", function(){
    it("enter details", function(){
        cy.get('.form-field')
        .find('[id="firstNameInput"]')
        .type('Naveen')
        cy.get('.form-field')
        .find('[id="lastNameInput"]')
        .type('Latur')
        cy.get('.form-field')
        .find('[id="addressLine1Input"]')
        .type('4/19 Cantala Avenue Caulfield North')
        cy.get('.form-field')
        .find('[id="provinceInput"]')
        .type('Victoria')
        cy.get('.form-field')
        .find('[id="postCodeInput"]')
        .type('3161')
    })
    
    it("place order", function(){
        cy.get('.form-actions')
        .find('[type="submit"]')
        .click()
    })
})

// Validate the order placed message and other order details
describe("validate order is placed", function(){
    it("order verify", function(){
        cy.wait(1000)
        cy.screenshot()
        cy.get(".form-legend.optimizedCheckout-headingSecondary").should("contain","Your Order has been successfully placed.")
    })
    
    it("verify order details", function(){
        cy.get(".layout-cart").get(".productList")
        .should("contain","iPhone 12")
        cy.get(".cart-total").should("contain","$799.00")
    })
})

// Navigate to orders page and validate order history details
// validate api response using requests function
describe("validate orders page and api", function(){
    it("continue shopping", function(){
        cy.get(".button.button--tertiary.optimizedCheckout-buttonSecondary").click()
    })
    
    it("navigate to orders", function(){
        cy.get('a[href*="/orders"]').click()
        cy.wait(500)
        cy.screenshot()
    })  
    it("verify user details on order page", function(){
        cy.get(".a-box.a-color-offset-background.order-info")
        .should("contain", "demouser")
        .should("contain", "$799")
    })
    it("verify item details on order page", function(){
        cy.get(".a-box.shipment.shipment-is-delivered")
        .should("contain", "Delivered")
        .should("contain", "iPhone 12")
        .should("contain", "$799.00")
    })

    it("api test", function(){
        cy.request({
            method: 'GET',
            url: "https://bstackdemo.com/api/orders",
            failOnStatusCode: false
        }).then((res)=>{
            expect(res).to.have.property("status", 404)
        })
    })
})

// logout of the website
describe("logout of the application", function(){
    it("logout", function(){
        cy.get(".Navbar_root__2kbI9")
        .contains("Logout").click()
    })
})
