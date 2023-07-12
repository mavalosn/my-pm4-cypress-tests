import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();

describe("Processmaker", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let Link
    let requestId
    let processName = "TCP4-2261 Verify Image Rendering in Both Form and Display Screen";
    it("TCP4-2261 Verify Image Rendering in Both Form and Display Screen", () => {
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42261@endtest-mail.io&action=delete"
            );
        });
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let processPath =
            "processes/TCP4-2261 Verify Image Rendering in Both Form and Display Screen.json";
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
            processPath,
            parameterList
        );
        //Step 2: Edit Process
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        const sendEmailXpath =
            "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        execution.plainTextBodyInSendEmailInModeler(
            "SendEmail",
            sendEmailXpath
        );
        //Step 3: Start Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            request.clickOnTaskName(1, 1);
            requestId = url.split("/")[4].trim();
            cy.get(".signature > canvas").click("center");
            cy.get(
                '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
            ).should("be.visible");
            cy.get('button[aria-label="New Submit"]').click();

            //Step 4: Verification in Inbox
            cy.origin(
                "https://endtest.io",
                { args: { requestId } },
                ({ requestId }) => {
                    cy.visit(
                        "https://app.endtest.io/mailbox.php/email=automation-qaTCP42261@endtest-mail.io"
                    );
                    cy.wait(5000)
                    cy.reload();
                    cy.wait(5000)
                    cy.reload();
                    cy.get(".email_from").click();

                    Link =
                        `${Cypress.config().baseUrl}` +
                        "/webentry/request/" +
                        requestId +
                        "/node_4";
                    cy.get(".form-group > :nth-child(1) > div").should(
                        "contain",
                        Link
                    );
                }
            );
            
        });
       
    });
    it("TCP4-2261 Go to Request", () => {
        //navHelper.navigateToLogOut()
        let urlBody =`${Cypress.config().baseUrl}` +
        "/webentry/request/" +
        requestId +
        "/node_4"
        cy.visit(urlBody)
        cy.get('button[aria-label="New Submit"]').click({force:true});
        navHelper.navigateToRequestsPage();
        cy.visit('/requests/' + requestId);
        cy.get('[id="file-manager-tab"]').click();
        //verify request completed
        var p = 5;
        for (var i = 0; i < p; i++) {
            cy.get('h4').then(el => {
                var text = el.text();
                if (text == 'Completed') {
                    p = 0;
                }
                else {
                    cy.wait(5000);
                    cy.reload();
                }
            })
        }
        cy.xpath('//span[text()="(Verify Signature and Image Control PDF)"]').should('be.visible');
        cy.xpath('//span[text()="(Verify Signature and Image Control PDF)"]').click();
        cy.get('.px-4').should('contain','Admin User has completed the task A');
        cy.get('.px-4').should('contain','Admin User has completed the task SendEmail');
        cy.get('.px-4').should('contain','Anonymous User has completed the task B');
        cy.get('.px-4').should('contain','Admin User has completed the task PDFGenerator');
    });
});
