import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Screens } from "../../../pages/screens";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();
const process = new Process();
const request = new Requests();
const screen = new Screens();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let requestId
    var processName =
        "TCP4-2267 Verify the validations of a line input in a nested screen";
    var filePath =
        "processes/TCP4-2267 Verify the validations of a line input in a nested screen.json";

    it("TCP4-2267 Verify the validations of a line input in a nested screen", function () {

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
            //Fisrt Step: Options Menu
            execution.asertionsTCP42267ValidationMenu();
            //Second Step: Validations Rules
            execution.asertionsTCP42267ValidationRules();
            //Third Step: Data Type
            execution.asertionsTCP42267DataTypes();
            //Four Step: Combinations
            execution.asertionsTCP42267Combinations()
            cy.xpath('//button[@aria-label="New Submit"]').last().click();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.xpath('//button[@aria-label="New Submit"]').last().click();
        });
    });
});