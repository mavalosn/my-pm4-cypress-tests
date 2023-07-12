import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();
const task = new Tasks();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let requestId
    var processName =
        "TCP4-2207 Process for verifying the upload download and preview of documents";
    var filePath =
        "processes/TCP4-2207 Process for verifying the upload download and preview of documents.json";
    let filePathDocument1 = "sample.pdf";
    let filePathDocument2 = "sample2.pdf";
    let nameFile1 = "sample";
    let nameFile2 = "sample2";

    it("TCP4-2207 Process Record List", function () {
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42207A@endtest-mail.io&action=delete"
            );
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42207B@endtest-mail.io&action=delete"
            );
        });
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
        //Step 2: Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            //First Step: Click on Receive documents Form
            request.clickOnTaskName(1, 1);
            //Email1
            cy.get('[data-cy="screen-field-email1"]').type(
                "automation-qaTCP42207A@endtest-mail.io"
            );
            //Email2
            cy.get('[data-cy="screen-field-email2"]').type(
                "automation-qaTCP42207B@endtest-mail.io"
            );
            //Select Doc1
            cy.get('input[data-cy="file-upload-button"]')
                .eq(0)
                .attachFile(filePathDocument1);
            cy.wait(3000)
            //Select Doc2
            cy.get('input[data-cy="file-upload-button"]')
                .eq(1)
                .attachFile(filePathDocument2);
            cy.wait(3000)

            //Success
            cy.xpath(
                '//label[text()="Doc1"]/parent::div//div[@class="uploader-file-status"]'
            ).should("contain", "success");
            cy.xpath(
                '//label[text()="Doc2"]/parent::div//div[@class="uploader-file-status"]'
            ).should("contain", "success");
            //submit
            cy.get('button[aria-label="New Submit"]').click();
            cy.get(".alert-wrapper > .alert").should("be.visible");
            //Go to Requet
            navHelper.navigateToRequestsPage();
            cy.visit("/requests/" + requestId);
            request.waitUntilElementIsVisible(
                "selector",
                "#pending > div > div > table > tbody > tr > td:nth-child(2) > a",
                15
            );
            //Second Step: Check documents
            request.clickOnTaskName(1, 1);
            //Submit
            cy.xpath(
                '//div[@class="card-footer"]//button[@class="btn btn-primary"]'
            ).click();
            request.verifyTaskIsCompleted();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            //Third Step: Click on Download The documents
            request.clickOnTaskName(1, 1);
            //Click on checkbox1
            cy.get('input[name="previewfile1"]').click({force:true});
            //Click on checkbox2
            cy.get('input[name="previewfile2"]').click({force:true});
            //Submit
            cy.get('button[aria-label="New Submit"]').click({force:true});
            //Step4: Verify that the files can be downloaded
            cy.visit("/requests/" + requestId);
            cy.get('[id="file-manager-tab"]').click();
            //Download File1
            cy.xpath('//button[@title="Download"]/parent::td//parent::tr[1]')
                .eq(0)
                .then(($element) => {
                    const fileId = $element.attr("data-pk");
                    const fileBaseURI =
                        Cypress.env("URL") + "file-manager/download/" + fileId;
                    cy.downloadFile(
                        fileBaseURI,
                        "cypress/downloads",
                        filePathDocument1
                    );
                });
            cy.xpath('//button[@title="Download"]/parent::td//parent::tr[1]')
                .eq(1)
                .then(($element) => {
                    const fileId = $element.attr("data-pk");
                    const fileBaseURI =
                        Cypress.env("URL") + "file-manager/download/" + fileId;
                    cy.downloadFile(
                        fileBaseURI,
                        "cypress/downloads",
                        filePathDocument2
                    );
                });
            navHelper.navigateToTasksPage();
            execution.actionsAndAssertionsOfTCP42207VerifyDownloadFile(
                nameFile1,
                "0"
            );
            execution.actionsAndAssertionsOfTCP42207VerifyDownloadFile(
                nameFile2,
                "1"
            );
        });
    });
    it("TCP4-2207 Verify email", () => {
        //Step: Review Inbox
        //First Inbox
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42207A@endtest-mail.io"
            );
            cy.get('[class="email_subject"]')
                .first()
                .should("be.visible")
                .click();
            cy.get('[class="email-body-wrapper"]').first().should("be.visible");
            cy.get('[name="Review the attached documents"]').should(
                "contain",
                "Review the attached documents"
            );
            cy.get('[name="Review the attached documents"]').should(
                "contain",
                "You can review the uploaded documents...."
            );
        })
    });
});