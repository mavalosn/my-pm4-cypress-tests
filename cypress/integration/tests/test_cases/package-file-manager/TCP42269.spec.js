import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();
const process = new Process();
const request = new Requests();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let requestId
    let fileName1 = "image1.jpg";
    let fileName2 = "image2.jpeg";
    let fileName3 = "image3.jpeg";
    let fileName4 = "image4.jpeg";
    var processName = "TCP4-2269 Verify File Upload in a Loop Control";
    var filePath =
        "processes/TCP4-2269 Verify File Upload in a Loop Control.json";
    //Previous step User Creation
    const username = `0UserTCP42269`;
    const firstName = `0000000FirstNameTCP42269`;
    const lastName = `LastName`;
    const jobTitle = "QA";
    const status = "Active";
    const email = "emailTCP42269+" + "@gmail.com";
    const password = "Colosa123";
    it("TCP4 - 2269 Verify files uploaded via a loop control show up in the File Manager tab", function () {
        navHelper.navigateToAdminUserPage();
        admin.createUserIfNotExist(
            username,
            firstName,
            lastName,
            jobTitle,
            status,
            email,
            password
        );
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        let parameterList = [
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
        //Step 2: Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Upload First file
            execution.actionsAndAssertionsOfTCP42269SelectFile(
                "images/" + fileName1,
                "0"
            );
            request.waitUntilElementIsVisible("selector", '[status="success"]');
            //Upload Second file
            execution.actionsAndAssertionsOfTCP42269SelectFile(
                "images/" + fileName2,
                "1"
            );
            request.waitUntilElementIsVisible("selector", '[status="success"]');
            //Upload Third file
            execution.actionsAndAssertionsOfTCP42269SelectFile(
                "images/" + fileName3,
                "2"
            );
            request.waitUntilElementIsVisible("selector", '[status="success"]');
            //Upload Four file
            execution.actionsAndAssertionsOfTCP42269SelectFile(
                "images/" + fileName4,
                "3"
            );
            request.clickOnSubmitButton();
            //Submit
            cy.get('[id="file-manager-tab"]').click();
            //Step 3: Verify that the files have been uploaded
            execution.actionsAndAssertionsOfTCP42269VerifyViewFile();
        });
    });
    it("TCP42269 Verify that the files can be downloaded ", () => {
        //Step4: Verify that the files can be downloaded
        cy.visit("/requests/" + requestId);
        cy.get('[id="file-manager-tab"]').click();
        //Download File1
        cy.xpath('//button[@title="Download"]/parent::td//parent::tr[1]')
            .eq(0)
            .then(($element) => {
                const fileId = $element.attr("data-pk");
                const fileBaseURI =
                    Cypress.env("URL") + "/file-manager/download/" + fileId;
                cy.downloadFile(fileBaseURI, "cypress/downloads", fileName1);
            });
        cy.xpath('//button[@title="Download"]/parent::td//parent::tr[1]')
            .eq(1)
            .then(($element) => {
                const fileId = $element.attr("data-pk");
                const fileBaseURI =
                    Cypress.env("URL") + "/file-manager/download/" + fileId;
                cy.downloadFile(fileBaseURI, "cypress/downloads", fileName2);
            });
        cy.xpath('//button[@title="Download"]/parent::td//parent::tr[1]')
            .eq(2)
            .then(($element) => {
                const fileId = $element.attr("data-pk");
                const fileBaseURI =
                    Cypress.env("URL") + "/file-manager/download/" + fileId;
                cy.downloadFile(fileBaseURI, "cypress/downloads", fileName3);
            });
        cy.xpath('//button[@title="Download"]/parent::td//parent::tr[1]')
            .eq(3)
            .then(($element) => {
                const fileId = $element.attr("data-pk");
                const fileBaseURI =
                    Cypress.env("URL") + "/file-manager/download/" + fileId;
                cy.downloadFile(fileBaseURI, "cypress/downloads", fileName4);
            });
        navHelper.navigateToTasksPage();
        execution.actionsAndAssertionsOfTCP42269VerifyDownloadFile(
            "image1",
            "0"
        );
        cy.get('[style="z-index: 100;"] > :nth-child(1) > .nav-link').click();
        var concat = "./cypress/downloads/" + "image1" + ".jpg";
        cy.readFile(concat).should("exist");
    });
    it("TCP42269 Verify that files can be shared  ", () => {
        //Step5: Verify that files can be shared
        //share first Image
        cy.visit("/requests/" + requestId);
        cy.get('[id="file-manager-tab"]').click();
        execution.actionsAndAssertionsOfTCP42269VerifyShareFile(
            "0",
            username,
            firstName,
            lastName
        );
        //share second Image
        execution.actionsAndAssertionsOfTCP42269VerifyShareFile(
            "1",
            username,
            firstName,
            lastName
        );
        //share third Image
        execution.actionsAndAssertionsOfTCP42269VerifyShareFile(
            "2",
            username,
            firstName,
            lastName
        );
        //share four Image
        execution.actionsAndAssertionsOfTCP42269VerifyShareFile(
            "3",
            username,
            firstName,
            lastName
        );
        //Log out of Admin
        navHelper.navigateToLogOut();
        //verify shared files 
        login.login(username, password);
        cy.get('[id="profileMenu"]').click();
        cy.get('[class="popover-body"]').should("be.visible");
        cy.get('[class="popover-body"]')
            .children()
            .children()
            .children()
            .eq(2)
            .click({ force: true });
        cy.xpath('//tbody[@role="rowgroup"]//tr[2]//button').click({
            force: true,
        });
        cy.xpath('//tbody[@role="rowgroup"]').should("contain", "image1");
        execution.actionsAndAssertionsOfTCP42269VerifyUploadedFiles(
            "image1",
            "10.5 KB",
            "jpg"
        );
        execution.actionsAndAssertionsOfTCP42269VerifyUploadedFiles(
            "image2",
            "8.43 KB",
            "jpeg"
        );
        execution.actionsAndAssertionsOfTCP42269VerifyUploadedFiles(
            "image3",
            "7.45 KB",
            "jpeg"
        );
        execution.actionsAndAssertionsOfTCP42269VerifyUploadedFiles(
            "image4",
            "7.92 KB",
            "jpeg"
        );
    });
});