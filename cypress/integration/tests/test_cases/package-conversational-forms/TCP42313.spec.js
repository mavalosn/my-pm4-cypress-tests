import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2313',  () =>{
        var processName = "TCP4-2313 Verify Conversational with Gateways";
        var filePath = "processes/TCP4-2313 Verify Conversational with Gateways.json";
    //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

  
    //Step 2Execution of the process (execution class)
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfTCP42313();
    });
});