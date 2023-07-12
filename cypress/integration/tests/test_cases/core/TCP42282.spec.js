import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    
    it("Import Process", () => {
        var processName = "TCP4-2282 Verify Loop with FEEL";
        var filePath = "processes/TCP4-2282 Verify Loop with FEEL.json";

        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it("Process Manager Configuration", () => {
        var processName = "TCP4-2282 Verify Loop with FEEL";
        var processManager = "Admin";

        navHelper.navigateToProcessPage();
        process.verifyProcessManagerAndAddItifNecessary(processName, processManager);
    });

   it("TCP4-2282 Verify Loop with FEEL Part 1", () => {
        navHelper.navigateToProcessPage();
        process.searchForProcess("TCP4-2282 Verify Loop with FEEL");
        process.goToWebEntry();
        execution.actionsAndAssertionsOfTCP42282Part1();
    });
       
            
    it("TCP4-2282 Verify Loop with FEEL Part 2", () => {                    
        navHelper.navigateToProcessPage();
        process.searchForProcess("TCP4-2282 Verify Loop with FEEL");
        process.goToWebEntry();
        execution.actionsAndAssertionsOfTCP42282Part2();
    });
    
});
