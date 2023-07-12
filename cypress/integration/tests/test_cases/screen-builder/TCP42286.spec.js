import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";

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

    it("TCP4 - 2286 : TCP4-2286 process Text Area Rich Text", () => {

        const processName = 'TCP4-2286 process Text Area Rich Text';
        const filePath = 'processes/TCP4-2286 process Text Area Rich Text.json';
        const taskName = 'Form Task';

       //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

        //Step 2: Start a request
        navHelper.navigateToRequestsPage();
        const nroButton = 0;
        request.openNewRequestByNumberStartButton(processName,nroButton);
        request.openTaskByTaskName(taskName);

        //Step 3: Complete Form
        execution.completeFormTCP42286();
        
        //Step 4: Start a second request
        execution.completeFormManualTaskTCP42286();
    });
});