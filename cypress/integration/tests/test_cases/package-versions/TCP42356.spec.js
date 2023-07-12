import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2356', () =>{
        navHelper.navigateToProcessPage();
        var timeStamp = new Date().getTime();
        var nameProcess = timeStamp + '-TCP4-2356';
        var descriptionProcess = 'test case TCP4-2356 ' + timeStamp;
        process.createProcess(nameProcess,descriptionProcess);
        //process.searchForProcess(nameProcess);
        cy.wait(5000);
        process.dragEvent('start', 400, 200);
        process.dragEvent('task', 500, 200);
        process.dragEvent('end', 600, 200);
        var version1 = 'test1';
        var description1 = '3 controls displayed';
        process.saveVersionProcess(version1,description1);
        process.dragEvent('task', 400, 400);
        var version2 = 'test2';
        var description2 = '4 controls displayed';
        process.saveVersionProcess(version2,description2);
        navHelper.navigateToProcessPage();
        cy.wait(10000);
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(nameProcess);
        cy.wait(5000);
        cy.get('[title="Configure"] > .fas').click();

        cy.get('#process-versions-tab').click();
        cy.xpath('//span[normalize-space()="test1"]//parent::div/following-sibling::div[@class="row justify-content-start"]/div[1]').click();
        cy.get('.card-body > .form-group > #name').type(' to 1.1');
        cy.get('.card-footer > .btn-secondary').click();
        cy.xpath('//span[text()="test1 to 1.1"]').should('have.text', 'test1 to 1.1');
        cy.xpath('//span[text()="Current Version"]').should('have.text', 'Current Version');
    });
});