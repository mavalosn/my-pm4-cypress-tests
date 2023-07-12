import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it('TCP4-2277 Verify the data of a line conversational with PDF conversational',() =>{

        //verify process imported
        var processName = "TCP4-2277 Verify the data of a line conversational with PDF conversational";
        var processPath = "processes/TCP4-2277 Verify the data of a line conversational with PDF conversational.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            cy.reload();
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            //complete form
            execution.actionsAndAssertionsOfTCP42277(requestId);
        });
    });   
});