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

    it('TCP4-2194 Process for the revision of web entry send email PDF generator',() =>{

        //Step 1: Verify process imported
        let processName = "TCP4-2194 Process for the revision of web entry send email PDF generator";
        let processPath = "processes/TCP4-2194 Process for the revision of web entry send email PDF generator.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);

        //Step 2: Execute Web Entry
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();

        //Step 3: Complete Web Entry and review task form
        execution.actionsAndAssertionsOfTCP42194(processName);
    });   
});