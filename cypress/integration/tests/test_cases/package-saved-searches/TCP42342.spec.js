import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { SaveSearchs } from "../../../pages/saveSearch";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const saveSearch = new SaveSearchs();
const process = new Process();

describe("ProcessMaker Test Case", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2342 Verify the "Reset to defaults" in Active Columns in a Saved Search for a request', () => {
        var processName = "TCP4-2342 Save Search";
        var filePath = "processes/TCP4-2342 Save Search.json";
        var taskName = "Form Task";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        navHelper.navigateToAllRequests();
        execution.requestsForSaveSearch(taskName);
        navHelper.navigateToRequestsPage();
        var timeStamp = new Date().getTime();
        var namesave = "TCP4-2342-" + timeStamp;
        saveSearch.createSaveSearch(namesave,"fire");
        navHelper.navigateToSavedSearchs();
        saveSearch.viewSaveSearch(namesave);
        execution.setConfigurationSaveSearch(namesave);
    })
})