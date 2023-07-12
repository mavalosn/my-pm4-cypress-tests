import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import {Execution} from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Header } from "../../../pages/header";

const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();
const faker = require('faker');
const header = new Header();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });
    
    it("TCP4 - 2235 : TCP4-2235 Process test Image", () => {
        var processName = 'TCP4-2235 Process test Image';
        var filePath = 'processes/TCP4-2235 Process test Image.json';

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

        //Step 2: Start a request
        navHelper.navigateToRequestsPage();

        //Step 3: Create request
        request.openNewRequest(processName);
        //cy.visit('/tasks/2810/edit');
       // cy.wait(2000);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            var taskName = 'Form Task';
            request.clickOnTaskName(1, 1);
            execution.completeFormTCP42235(requestId);
        });
        //Step 4: View form completed
        cy.get('[id="forms-tab"]').click();
        cy.get('[title="Details"]').first().should('be.visible').click();
        cy.wait(3000);
        cy.contains('Admin User has completed the task Form Task').scrollIntoView();
    });
});