import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it('TCP4--2294 Verify Validation Rules with Loop and Nested Screen',() =>{

        //verify process imported
        var processName = "TCP4-2294 Verify Validation Rules with Loop and Nested Screen";
        var processPath = "processes/TCP4-2294 Verify Validation Rules with Loop and Nested Screen.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);
        //Open Process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //Open the Web Entry
        process.goToWebEntry();
        //Complete form to web entry
        execution.completeFormWebEntryTCP42294();
    });
});