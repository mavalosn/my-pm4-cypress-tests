import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();

describe("Processmaker Test Cases", () => {

    var processName = "TCP4-2429 Web Entry Record List  Editable - Display";
    var processPath = "processes/TCP4-2429 Web Entry Record List  Editable - Display.json";

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

        login.navigateToUrl();
        login.login();
    });
    it('TCP4 - 2429 Verify from web entry, the data of an editable recordlist and display', async () =>{

        //verify process imported
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);

        //Step 2: Open Process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //Step 3: Open the Web Entry
        process.goToWebEntry();

        //Step 4: Verify the Web Entry
        execution.actionsAndAssertionsOfTCP2429();
    });
});