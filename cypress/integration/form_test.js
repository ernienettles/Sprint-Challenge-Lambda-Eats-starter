describe("Test our inputs and submit our form", function() 
{
    beforeEach(function() {
        cy.visit("http://localhost:3000/pizza");
    })
    it("Add test to inputs and submit form", function() {
        cy.get('input[name="name"]')
            .type("Ernie")
            .should("have.value", "Ernie");
        cy.get('select[name="pizzaSize"]')
            .select('Large')
            .should("have.value", "Large");
        cy.get('input[name="pepperoni"]')
            .check()
            .should("be.checked");
        cy.get('input[name="ham"]')
            .check()
            .should("be.checked");
        cy.get('input[name="sausage"]')
            .check()
            .should("be.checked");
        cy.get('input[name="mushrooms"]')
            .check()
            .should("be.checked");
        cy.get('textarea[name="specialInstructions"]')
            .type('Please go light on the cheese.')
            .should("have.value", "Please go light on the cheese.");
        cy.get('button')
            .click()
    })
})