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
    let processName = "TCP4-2290 Verify Documentation";
    let filePath = "processes/TCP4-2290 Verify Documentation.json";

    it("TCP4-2290 Import Process", () => {
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
    });
    it("TCP4-2290 Controls documentation", () => {
        //Step 2: Start Event Controls Documentation
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        const startEventXpath =
            "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        execution.documentationOfControlInModeler(
            "StartEvent",
            startEventXpath,
            "Add documentation in Start Event control"
        );
        //Step 3:Form Task Controls Documentation
        const formTaskXpath =
            "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        execution.documentationOfControlInModeler(
            "FormTask",
            formTaskXpath,
            "Add documentation in Form Task control"
        );
        //Step 4: End Event Control Documentation
        const endEventXpath =
            "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.endEvent.Shape']";
        execution.documentationOfControlInModeler(
            "EndEvent",
            endEventXpath,
            "Add documentation in End Event control"
        );
    });
    it("TCP4-2258 Verify Documentation", () => {
        //Step 6: Verification Documentation
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "view");
        execution.assertionsOfTCP42290();
    });
});