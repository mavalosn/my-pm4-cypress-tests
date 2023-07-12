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
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4-2247 Import the process and make five requests", function () {
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42247@endtest-mail.io&action=delete"
            );
        });
        //Step 1: Import the process
        let processName =
            "TCP4-2247 Verify Conversational Screen PDF Generator Send Email";
        let filePath =
            "processes/TCP4-2247 Verify Conversational Screen PDF Generator Send Email.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
        //Step 2: Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            var requestId = url.split("/")[4].trim();
            cy.log(requestId);
            //Step3: Task A
            execution.clickInFormTask();
            execution.fillFormTCP42247('1','2','3')
            //Step4: Task B
            cy.visit("/requests/" + requestId);
            request.waitUntilElementIsVisible(
                "selector",
                "#pending > div > div > table > tbody > tr > td:nth-child(2)"
            );
            request.clickOnTaskName(1, 1);
            execution.fillFormTCP42247(" ", " ", " ");
            //Step5: Review PDF
            cy.visit("/requests/" + requestId);
            request.waitUntilTextcontainText("selector", "h4", "Completed", 15);
            cy.get('[id="file-manager-tab"]').click();
            cy.xpath(
                '//div[@class="simple-loader file-manager"]//tbody'
            ).should(
                "contain",
                " Verify Web Entry and Conversational Screen Display Screen"
            );
        });
    });
    it("TCP4-2247 Verify email", () => {
        //Step: Review Inbox
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42247@endtest-mail.io"
            );
            cy.wait(5000);
            cy.get('[class="email_subject"]')
                .first()
                .should("be.visible")
                .click();
            cy.get('[class="email-body-wrapper"]')
                .first()
                .should("be.visible")
                .should("contain", "2")
                .should("contain", "3")
                .should("contain", "Argentina");
        });
    });
});