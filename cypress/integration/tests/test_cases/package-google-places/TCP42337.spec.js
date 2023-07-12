import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import {Screens} from "../../../pages/screens";
import {Execution} from "../../../pages/execution";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const screen = new Screens();
const execution = new Execution();



describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2337 Verify Google Places", () => {
        var processName = "TCP4-2337 Verify Google Places";
        var filePath = "processes/TCP4-2337 Verify Google Places.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
      

        //Step 2: Execution of the process
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfTCP42337();

    });
});
