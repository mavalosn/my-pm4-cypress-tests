import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const request = new Requests();
const execution = new Execution();

describe("Processmaker Test Cases", function () {
    let processName = "TCP4-2251 Verify Multiple Start Events";
    let filePath = "processes/TCP4-2251 Verify Multiple Start Events.json";
    var requestId 
    var locatorField = '[class="signature pl-0"]';
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    //Step 1: Import the process
    it("TCP4 - 2251: Verify Multiple Start Events", () => {
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Start Event 1
            {
                elemName: "Start Event",
                label: "Start Event 1",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Start Event 2
            {
                elemName: "Start Event",
                label: "Start Event 2",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            {
                elemName: "Start Event",
                label: "Start Event 3",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Script
            {
                elemName: "Script",
                label: "TCP4-2251",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Process Manager
            {
                elemName: "Process Manager",
                label: "Process Manager",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            filePath,
            parameterList
        );
    });
    //Step 2: First Scenario
    it("TCP4-2251 First Scenario", () => {
        //Start Request
        navHelper.navigateToRequestsPage();
        const nroButton = 0;
        request.openNewRequestByNumberStartButton(processName, nroButton);
        cy.wait(5000)
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            cy.log(requestId);
            //Go to Task A
            execution.clickInFormTask();
            //Verify that there is only one required field
            execution.checkNotificationRequiredfield(
                "There is a validation error in your form."
            );
            execution.fillFormTCP42251();
            execution.signInField(locatorField);
            request.clickOnSubmitButton();
            //Go to Task B
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task C
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task D
            request.openRequestById(requestId);
            request.clickOnTaskName(2, 1);
            request.clickOnSubmitButton();
            //Go to Task E
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task F
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            request.clickOnSubmitButton();
            //Go to Task G
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            cy.reload();
            execution.assertionsTCP2251FirstScenario();
        });
    });
    //Step 3: Second Scenario
    it("TCP4-2251 Second Scenario", () => {
        //Start Request
        navHelper.navigateToRequestsPage();
        const nroButton = 2;
        request.openNewRequestByNumberStartButton(processName, nroButton);
        cy.wait(5000)
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            cy.log(requestId);
            //Go to Task B
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task C
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task D
            request.openRequestById(requestId);
            request.clickOnTaskName(2, 1);
            execution.fillFormTCP42251();
            execution.signInField(locatorField);
            request.clickOnSubmitButton();
            //Go to Task E
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task F
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            request.clickOnSubmitButton();
            //Go to Task G
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            cy.reload();
            execution.assertionsTCP2251SecondScenario()
        });
    });
    //Step 4: Third Scenario
    it("TCP4-2251 Third Scenario", () => {
        //Start Request
        navHelper.navigateToRequestsPage();
        const nroButton = 1;
        request.openNewRequestByNumberStartButton(processName, nroButton);
        cy.wait(5000)
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            cy.log(requestId);
            //Go to Task C
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            //Go to Task D
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.fillFormTCP42251();
            execution.signInField(locatorField);
            request.clickOnSubmitButton();
            //Go to Task F
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            request.clickOnSubmitButton();
            //Go to Task G
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.completedTask();
            cy.reload();
            execution.assertionsTCP2251ThirdScenario();
        });
    });
});
