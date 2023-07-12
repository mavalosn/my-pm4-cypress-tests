import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import Helpers from "faker/lib/helpers";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2325", () => {
        var processName = "TCP4-2325 Process select list";
        var filePath = "processes/TCP4-2325 Process select list.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        execution.verifySelectListValuesTCP42325();
    });
});