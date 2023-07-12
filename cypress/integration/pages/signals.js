import selectors from "../selectors/signals";
export class Signals {
    createSignal(name, id) {
        cy.xpath(selectors.addSignalButton).click();
        cy.xpath(selectors.nameSignal).type(name);
        cy.xpath(selectors.idSignal).type(id);
        cy.xpath(selectors.saveSignalButton).click();
        cy.xpath('(//span[@title="Edit"]/button)[1]').should('be.enabled');
    }

    searchSignal(name, id){
        cy.get('#search-box').type(name);
        cy.get('.vuetable-body > tr > :nth-child(1)').should('have.text', id);
    }
}