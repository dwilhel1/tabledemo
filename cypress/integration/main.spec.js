describe('Tabledemo Integration Tests', function () {
    beforeEach(function () {
        cy.server();
        cy.fixture('getAllContacts').as('contactsResponse');
        cy.fixture('getContactDeals').as('contactDealsResponse');
    });

    context('Without data', function () {
        beforeEach(function () {
            cy.route('GET', `${Cypress.env('endpointServer')}/contacts`, {}).as('contactsRoute');
            cy.visit('/');
            cy.wait('@contactsRoute');
        });

        it('displays no data message', function () {
            cy.get('body').should('contain', 'No contact data');
        });

        it('displays table columns', function () {
            const columns = ['ID', 'Contact', 'Phone', 'Deals', 'IP'];

            columns.forEach(column => {
                cy.get('thead').should('contain', column);
            })
        })
    });

    context('With all data', function () {
        beforeEach(function () {
            cy.route('GET', `${Cypress.env('endpointServer')}/contacts`, '@contactsResponse').as('contactsRoute');
            cy.route('GET', `${Cypress.env('endpointServer')}/contacts/**/contactDeals`, '@contactDealsResponse').as('contactDealsRoute');
            cy.visit('/');
            cy.wait(['@contactsRoute', '@contactDealsRoute'])
        });

        it('displays contacts table with correct row count', function () {
            cy.get('tbody tr').should('have.length', this.contactsResponse.contacts.length);
        });

        it('displays contacts table with data', function () {
            const dealsCount = this.contactDealsResponse.contactDeals.length.toString();

            this.contactsResponse.contacts.forEach(function (contact, index) {
                cy.get('tbody tr').eq(index).should('contain', contact.id)
                    .and('contain', `${contact.firstName} ${contact.lastName}`)
                    .and('contain', contact.phone)
                    .and('contain', dealsCount)
                    .and('contain', contact.ip);
            })
        });
    });
});
