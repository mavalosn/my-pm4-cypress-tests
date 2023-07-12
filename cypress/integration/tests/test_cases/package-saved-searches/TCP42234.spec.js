import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { SaveSearchs } from "../../../pages/saveSearch";
import { Header } from "../../../pages/header";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const request = new Requests();
const execution = new Execution();
const saveSearch = new SaveSearchs();
const header = new Header();

describe("Processmaker Test Cases", function () {
    let processName = "TCP4-2234 Process Saved Search";
    let filePath = "processes/TCP4-2234 Process Saved Search.json";
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4-2234 Import the process and make five requests", function () {
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
        //Step 2: Create five Request
        //First Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        execution.clickInFormTask();
        execution.fillFormTCP42234("12", "20");
        //Second Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        execution.clickInFormTask();
        execution.fillFormTCP42234("21", "20");
        //Third Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        execution.clickInFormTask();
        execution.fillFormTCP42234("30", "35");
        //Four Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        execution.clickInFormTask();
        execution.fillFormTCP42234("45", "45");
        //Five Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        execution.clickInFormTask();
        execution.fillFormTCP42234("60", "62");
    });
    it("TCP4-2234 Create Save Search and view notifications", () => {
        //Step 3: Select all request created
        request.openRequestByNameForAllCompletedProcess(processName);
        //Step 4: Create a new saved search
        var timeStamp = new Date().getTime();
        var nameSaveSearch = "TCP4-2234-" + timeStamp;
        saveSearch.createSaveSearch(nameSaveSearch, "trophy");
        //Open the Save Search
        navHelper.navigateToSavedSearchs();
        saveSearch.viewSaveSearch(nameSaveSearch);
        header.viewNotifications();
        cy.xpath('//div[@class="notification-popover"]').should("be.visible");
        header.dismissAllNotifications();
        //Enable Notification
        saveSearch.enableNotification();
        //Make a last request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        execution.clickInFormTask();
        execution.fillFormTCP42234("12", "12");
        //Open the Save Search
        navHelper.navigateToSavedSearchs();
        saveSearch.viewSaveSearch(nameSaveSearch);
        //saveSearch.searchSaveSearch(locatorSaveSearchCreated);
        var email = "automationQA@endtest-mail.io";
        var subject = "Daily ReportTP42234";
        var body = "Hi Process Maker, this is the report today";
        saveSearch.scheduledReports(email, subject, body);
        execution.verifySendScheduleReport(email, subject);
    });
});