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
    it('TCP4-2240 Process Check box',() =>{

       //verify process imported
        var processName = "TCP4-2240 Process Check box";
        var processPath = "processes/TCP4-2240 Process Check box.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            var taskName = 'Form Task';
            request.openTaskByTaskName(taskName);
            //cy.visit('/tasks/3414/edit');
            //cy.wait(2000);
            //complete form
            execution.CompleteFormTCP42240(requestId);
        });
    });   
});
