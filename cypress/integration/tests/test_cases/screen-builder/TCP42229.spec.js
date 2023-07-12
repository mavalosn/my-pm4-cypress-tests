import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let requestId
    var processName = "TCP4-2229 Process Record List";
    var filePath = "processes/TCP4-2229 Process Record List.json";
    let filePathImage = "images/image1.jpg";

    it("TCP4-2229 Process Record List", function () {
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
        //Step 2: Start first request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            // Add Record List
            cy.get('[data-cy="add-row"]').click();
            //Step 3: Fill form
            execution.assertionsTCP42229(filePathImage);
            //Step 4: Start second request
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.xpath('//button[@aria-label="New Submit"]').last().click();
            cy.xpath('//div[@class="card"]//h4').should("contain", "Completed");
        });
    });
});