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

    it('TCP4-2123 Verify parallel gateway with two task parallel multi instance and one manual task',() =>{
        //verify process imported
        let processName = "TCP4-2123 Verify parallel gateway with two task parallel multi instance and one manual task";
        let processPath = "processes/TCP4-2123 Verify parallel gateway with two task parallel multi instance and one manual task.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            let requestId = url.split('/')[4].trim();
            let taskName = 'Form Task';
            request.openTaskByTaskName(taskName);
            execution.actionsAndAssertionsOfTCP42123(requestId);
        });
    });
});