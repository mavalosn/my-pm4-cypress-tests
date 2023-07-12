import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const execution = new Execution();
const request = new Requests();

describe("ProcessMaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2524 verify that a screen with validation rules and validation required at the same time does not show the required label after completing the screen starting the request from web entry";
    let filePath = "processes/TCP4-2524 verify that a screen with validation rules and validation required at the same time does not show the required label after completing the screen starting the request from web entry.json";

    it("TCP4-2524 verify that a screen with validation rules and validation required at the same time does not show the required label after completing the screen starting the request from web entry", () => {
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
    });
    it("TCP4-2524 Start Request , fill screen and validation", () => {
        navHelper.navigateToRequestsPage();
        //Step 2: Get WE
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();

        //Step 3: Execute the process
        execution.actionsAndAssertionsOfTCP42524();
    });
    
});