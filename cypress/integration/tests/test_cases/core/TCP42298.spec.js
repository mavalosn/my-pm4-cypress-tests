import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import {Execution} from "../../../pages/execution";
import { Process } from "../../../pages/process";
import selectors from "../../../selectors/process";

const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });
    
    it("TCP4 - 2298 : TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks", () => {
        var processName = 'TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks';
        var filePath = 'processes/TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks.json';
        //Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.saveProcessWithoutVersion();
        //Start a request
        navHelper.navigateToRequestsPage();
        var processname = 'TCP4-2298 Check the functionality of Intermediate Event with nested screen tasks';
        var taskName = 'Form Task 1';
        request.openNewRequest(processname);
        request.openTaskByTaskName(taskName);
        //Complete request form 1
        execution.actionsOfTCP42298();
        //Review file manager and email
        execution.reviewDataOfTCP42298(processName);
        //Review Email
        cy.origin('https://endtest.io', () => {
            cy.visit('/mailbox?email=automation@endtest-mail.io');
            cy.wait(5000);
            cy.get(':nth-child(1) > .email_subject').should('be.visible').click();
            cy.get('[class="email-body-wrapper"]').first().should('be.visible');
        });
    });
});