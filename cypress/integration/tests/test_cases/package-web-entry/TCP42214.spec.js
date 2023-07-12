import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();
const task = new Tasks();
const admin = new Admin();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    let processName = "TCP4-2214 Verify from the web entry modeler and screen controls";
    let filePath = "processes/TCP4-2214 Verify from the web entry modeler and screen controls.json";
    let filePathImage = "images/image1.jpg";
    let password="admin123";
    let difficulty="Half";

    it("TCP4-2214 Verify from the web entry modeler and screen controls", function () {
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it("TCP4-2214 First and Second scenario", function () {
        //Step 2:First Scenario
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Fill form (enter password , select file, select "yes")
        execution.actionsAndAssertionsWebEntryOfTCP42214("yes",password,filePathImage)
        //Step 3:Second Scenario
        login.navigateToUrl();
        login.login();
        navHelper.navigateToRequestsPage();
        request.openInPogressProcessInAllRequests(processName);
        request.clickOnTaskName(1, 1);
        //Verify file preview
        execution.verifyImageInTCP42214();
        //Verify select "yes" option
        execution.verifySelectOptionInTCP42214("yes");
        //Select difficulty
        execution.actionsAndAssertionsRequestOfTCP42214(difficulty);
        cy.get('button[aria-label="New Submit"]').click();
        
    });

    it("TCP4-2214 Third and fourth scenario ", function () {
        //Step 4:Third Scenario
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Fill form (enter password , select file, select "no")
        execution.actionsAndAssertionsWebEntryOfTCP42214("no",password,filePathImage)
        //Step 5:Fourth Scenario
        login.navigateToUrl();
        login.login();
        navHelper.navigateToRequestsPage();
        request.openInPogressProcessInAllRequests(processName);
        request.clickOnTaskName(1, 1);
        //Verify file preview
        execution.verifyImageInTCP42214();
        //Verify select "no" option
        execution.verifySelectOptionInTCP42214("no");
        cy.get('button[aria-label="New Submit"]').click();
        
    });
   
});