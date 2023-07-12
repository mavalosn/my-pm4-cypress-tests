import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qa@endtest-mail.io&action=delete"
            );
        });
        login.navigateToUrl();
        login.login();
    });

    it("TCP4 - 2249: Verify PDF and Send Email", () => {
        let processName = "TCP4-2249 Verify PDF and Send Email";
        let filePath = "processes/TCP4-2249 Verify PDF and Send Email.json";
        let requestId;
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);

        //Step 2: Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        //Step 3: Verifications in Summary
        cy.url().then(function (url) {
            requestId = url.split("/")[4].trim();
            cy.log(requestId);
            //completed the task PDF A
            navHelper.navigateToRequestsPage();
            cy.visit("/requests/" + requestId);
            request.waitUntilTextcontainText('selector','h4', "Completed",15);
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                " Admin User has completed the task PDF A"
            );
            //completed the task PDF B
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                " Admin User has completed the task PDF B"
            );
            //completed the task PDF C
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                " Admin User has completed the task PDF C"
            );
            //completed the task PDF D
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                " Admin User has completed the task PDF D"
            );
            //completed the task Send Email A
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                "Admin User has completed the task Send Email A"
            );
            //completed the task Send Email B
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                "Admin User has completed the task Send Email B"
            );
            //completed the task Send Email C
            cy.get('[class="px-4 mb-2 timeline"]').should(
                "contain",
                "Admin User has completed the task Send Email C"
            );
            //Verification in Inbox
            cy.origin(
                "https://endtest.io",
                { args: { requestId } },
                ({ requestId }) => {
                    cy.visit(
                        "https://app.endtest.io/mailbox.php/email=automation-qa@endtest-mail.io"
                    );
                    cy.wait(5000);
                    cy.get('[class="email_subject"]')
                        .first()
                        .should("be.visible")
                        .click();
                    cy.get('[class="email-body-wrapper"]')
                        .first()
                        .should("be.visible")
                        .should("contain", requestId);
                }
            );
        });
    });
});
