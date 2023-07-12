import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();

describe("Processmaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4 - 2335", () => {
        var processName = 'TCP4-2335 Verifying versioning of a process';
        var filePath = "processes/TCP4-2335 Verifying versioning of a process.json";

        // Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
        navHelper.navigateToProcessPage();

        process.searchProcessAndSelectOptions(processName,"edit");
        process.saveProcessWithNameAndDescription('version1','description1');
        process.dragEvent("pool", 100, 100);
        cy.reload();

        process.saveProcessWithNameAndDescription('version2','description2');
        process.saveProcessWithoutName();
        navHelper.navigateToProcessPage();

        process.searchProcessAndSelectOptions(processName,"config");
        process.versionHistory();

        // Check that all saved versions appear
        process.checkSavedAllVersions();

        // Enable the Check button and see that no unnamed versions appear
        process.showVersioningOnly();
        process.verifyVersioningWithoutNameNotAppear();

        // Check if "Copy to latest" works
        process.checkCopyToLatest();
    });
});
