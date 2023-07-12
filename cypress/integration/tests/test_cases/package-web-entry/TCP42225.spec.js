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

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    });
    let processName =
        "TCP4-2225 Verify the date picker and line input control with date and datetime inside a record list in web entry";
    let processPath =
        "processes/TCP4-2225 Verify the date picker and line input control with date and datetime inside a record list in web entry.json";
    it("TCP4-2225 Verify the date picker and line input control with date and datetime inside a record list in web entry", () => {
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath
        );
        //Step 2: Go to Web Entry
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Step 3: Fill Form
        execution.actionsAndAssertionsOfTCP42225();
        //Verification Ecosia page
        cy.url().should("eq", "https://www.ecosia.org/");
        cy.title().should("eq", "Ecosia, el buscador que planta árboles");
        //Step 4 Open the reques and verify that request was completed
        login.navigateToUrl();
        login.login();
        navHelper.navigateToRequestsPage();
        request.openRequestByName(processName);
        request.clickOnTaskName(1, 1);
        cy.get('button[aria-label="New Submit"]').click();
        //Verification "Complete request"
        var p = 5;
        for (var i = 0; i < p; i++) {
            cy.get("h4").then((el) => {
                var text = el.text();
                if (text == 'Completed') {
                    p = 0;
                } else {
                    cy.wait(3000);
                    cy.reload();
                }
            });
        }
        cy.xpath('//h4[text()="Completed"]').should("be.visible");
    });
});