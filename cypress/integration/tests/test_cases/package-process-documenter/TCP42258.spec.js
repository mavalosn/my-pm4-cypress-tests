import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();

const execution = new Execution();

describe("ProcessMaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2258 Verify Documentation";
    let filePath = "processes/TCP4-2258 Verify Documentation.json";

    it("TCP4-2258 Import Process", () => {
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
    });
    it("TCP4-2258 Controls documentation", () => {
        //Step 2: Start Event Controls Documentation
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //Start Event
        const startEventXpath =
            "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        execution.documentationOfControlInModeler(
            "StartEvent",
            startEventXpath,
            "Add documentation in Start Event control"
        );
        //Step 3:Form Tasks Controls Documentation
        const formTaskXpath =
            "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        //Task "A"
        execution.documentationOfControlInModeler(
            "A",
            formTaskXpath,
            "Add documentation in Form Task 'A' control"
        );
        //Task "B"
        execution.documentationOfControlInModeler(
            "B",
            formTaskXpath,
            "Add documentation in Form Task 'B' control"
        );
        //Task "AA"
        execution.documentationOfControlInModeler(
            "AA",
            formTaskXpath,
            "Add documentation in Form Task 'AA' control"
        );
        //Step 4: Manual Task Controls Documentation
        //Task "C"
        execution.documentationOfControlInModeler(
            "C",
            formTaskXpath,
            "Add documentation in Manual Task 'C' control"
        );
        //Step 5: Script Task Controls Documentation
        execution.documentationOfControlInModeler(
            "D",
            formTaskXpath,
            "Add documentation in Script Task 'D' control"
        );
    });
    it("TCP4-2258 Verify Documentation", () => {
        //Step 6: Verification Documentation
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "view");
        execution.assertionsOfTCP42258();
    });
});