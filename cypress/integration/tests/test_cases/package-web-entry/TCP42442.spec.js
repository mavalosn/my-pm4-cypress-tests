import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it('TCP4 - 2442: verify that the visibility rule with select list radio works on a nested screen that has ' +
        'a datetime before date with web entry', () =>{

        var processName = "TCP4-2442 Web entry visibility rules nested before date";
        var filePath = "processes/TCP4-2442 Web entry  visibility rules nested  before  date.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

        //Step 2: Get WE Url
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();

        //Step 3: Execute the process
        execution.actionsAndAssertionsOfTCP42442();

    });
});