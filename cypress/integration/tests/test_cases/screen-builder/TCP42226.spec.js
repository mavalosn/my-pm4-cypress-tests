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
        login.navigateToUrl();
        login.login();
    });
    let processName =
        "TCP4-2226 Verify date with date picker and line input type date inside a nested screen";
    let processPath =
        "processes/TCP4-2226 Verify date with date picker and line input type date inside a nested screen.json";
    let requestId
    it("TCP4-2226 Verify date with date picker and line input type date inside a nested screen", () => {
        //Step 1: Import the process
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
            processPath,
            parameterList
        );
        //Step 2: Start Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.clickOnTaskName(1, 1);
            //Step 3: Fill Form
            execution.actionsAndAssertionsOfTCP42226();
            //open request by ID
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Second submmit
            cy.get(":nth-child(2) > .form-group > .btn").click();
            //task completed
            cy.get(
                '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
            ).should("be.visible");
            navHelper.navigateToRequestsPage();
            cy.visit("/requests/" + requestId);
            //Verification "Complete request"
            var p = 5;
            for (var i = 0; i < p; i++) {
                cy.get("h4").then((el) => {
                    var text = el.text();
                    if (text == "Completed") {
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
});
