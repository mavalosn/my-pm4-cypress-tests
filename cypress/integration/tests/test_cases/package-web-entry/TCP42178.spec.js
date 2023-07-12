import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import { Screens } from "../../../pages/screens";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const screens = new Screens();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.origin("https://endtest.io", () => {
        cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42178@endtest-mail.io&action=delete"
            );
        });
        login.navigateToUrl();
        login.login();
    });
    // let requestId;
    let processName =
        "TCP4-2178 Verify Rule Validation and paginator with Web Entry";
    let processPath =
        "processes/TCP4-2178 Verify Rule Validation and paginator with Web Entry.json";
    let fullName = "Maria Perez";
    it("TCP4-2178 Import the process and configure the Send Email in modeler", () => {
        //Step 1: Import the screens to send email controls
        //Import screen approve Email
        navHelper.navigateToScreensPage();
        let screenNameApprove = "Screen approve Email";
        let filePathApprove = "screens_data/Screen approve Email.json";
        screens.verifyPresenceOfScreenAndImportScreen(
            screenNameApprove,
            filePathApprove
        );
        //Import screen rejected Email
        navHelper.navigateToScreensPage();
        let screenRejected = "Screen rejected Email";
        let filePathRejected = "screens_data/Screen rejected Email.json";
        screens.verifyPresenceOfScreenAndImportScreen(
            screenRejected,
            filePathRejected
        );

        //Step 2: Import the process
        navHelper.navigateToProcessPage();
        //Add screen to Send email control and add ADmin User to Process Manager
        execution.verifyPresenceOfProcessImportProcessAndConfigureSendEmail(
            processName,
            processPath
        );
    });

    it("TCP4-2178 First Validation , CASE1: Application Approved", () => {
        //Step 4: CASE1
        //Get WE Url
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Step 3: Fill in all the data of the three forms on the Screen Loan Request
        execution.actionsAndAssertionsOfTCP42178(fullName);
        cy.xpath('//div[@name="Screen loan result"]').should(
            "contain",
            "SU SOLICITUD HA SIDO ENVIADA!"
        );
        //Login PM4
        login.navigateToUrl();
        login.login();
        request.openRequestByName(processName);
        request.clickOnTaskName(1, 1);
        cy.get('button[aria-label="NExt PAGE"]').should("be.visible").click();
        cy.get('button[aria-label="NEXT PAGE"]').should("be.visible").click();
        execution.selectOption("Aprobacion", "Si");
        cy.get('button[aria-label="Enviar Informacion"]').click();
        cy.origin(
            "https://endtest.io",
            { args: { fullName } },
            ({ fullName }) => {
                const retry = function (
                    type,
                    selectorXPath,
                    maxAttempts = 10,
                    attempts = 0
                ) {
                    if (attempts > maxAttempts) {
                        throw new Error(
                            "Timed out waiting for report to be generated"
                        );
                    }
                    if (type === "selector") {
                        cy.wait(3000);
                        cy.get("body").then(($body) => {
                            if ($body.find(selectorXPath).length <= 0) {
                                cy.reload();
                                retry(
                                    type,
                                    selectorXPath,
                                    maxAttempts,
                                    attempts + 1
                                );
                            }
                        });
                    }
                }
                cy.visit(
                    "https://app.endtest.io/mailbox.php/email=automation-qaTCP42178@endtest-mail.io"
                );
                retry("selector", '[class="email_item"]');
                cy.get('[class="email_item"]').should("be.visible").click();
                cy.get('[class="container"]').should("be.visible");
                cy.get('[class="container"]').should(
                    "contain",
                    "RESPUESTA DE SOLICITUD"
                );
                let containBody =
                    "Sr/Sra: " +
                    fullName +
                    " . Su solicitud de prestamo ha sido aprobada";
                cy.get('[class="container"]').should("contain", containBody);
            }
        );
    });
    it("TCP4-2178 Second Validation , CASE2: Application Rejected", () => {
        //Step 5: CASE2
        //Get WE Url
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Fill in all the data of the three forms on the Screen Loan Request
        execution.actionsAndAssertionsOfTCP42178(fullName);
        cy.xpath('//div[@name="Screen loan result"]').should(
            "contain",
            "SU SOLICITUD HA SIDO ENVIADA!"
        );
        //Login PM4
        login.navigateToUrl();
        login.login();
        request.openRequestByName(processName);
        request.clickOnTaskName(1, 1);
        cy.get('button[aria-label="NExt PAGE"]').should("be.visible").click();
        cy.get('button[aria-label="NEXT PAGE"]').should("be.visible").click();
        execution.selectOption("Aprobacion", "No");
        cy.get('button[aria-label="Enviar Informacion"]').click();
        cy.origin(
            "https://endtest.io",
            { args: { fullName } },
            ({ fullName }) => {
                const retry = function (
                    type,
                    selectorXPath,
                    maxAttempts = 10,
                    attempts = 0
                ) {
                    if (attempts > maxAttempts) {
                        throw new Error(
                            "Timed out waiting for report to be generated"
                        );
                    }
                    if (type === "selector") {
                        cy.wait(3000);
                        cy.get("body").then(($body) => {
                            if ($body.find(selectorXPath).length <= 0) {
                                cy.reload();
                                retry(
                                    type,
                                    selectorXPath,
                                    maxAttempts,
                                    attempts + 1
                                );
                            }
                        });
                    }
                };
                cy.visit(
                    "https://app.endtest.io/mailbox.php/email=automation-qaTCP42178@endtest-mail.io"
                );
                retry("selector", '[class="email_item"]');
                cy.get('[class="email_item"]').should("be.visible").click();
                cy.get('[class="container"]').should("be.visible");
                cy.get('[class="container"]').should(
                    "contain",
                    "RESPUESTA DE SOLICITUD"
                );
                let containBody =
                    "Sr/Sra: " +
                    fullName +
                    " . Su solicitud de prestamo ha sido rechazada";
                cy.get('[class="container"]').should("contain", containBody);
            }
        );
    });
});
