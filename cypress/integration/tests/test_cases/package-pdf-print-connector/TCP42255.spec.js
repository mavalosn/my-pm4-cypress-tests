import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const execution = new Execution();

describe("TCP4-2255 Verify PDF Generators Send Emails and Parallel Gateway", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    var processName = "TCP4-2255 Verify PDF Generators Send Emails and Parallel Gateway";
    var filePath = "processes/TCP4-2255 Verify PDF Generators Send Emails and Parallel Gateway.json";
    it("Import and configure the process", () => {
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Start Event 1
            {
                elemName: "Start Event",
                label: "Start Event",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Process Manager
            {
                elemName: "Process Manager",
                label: "Process Manager",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Cancel Request
            {
                elemName: "Cancel Request",
                label: "Cancel Request",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Edit Data
            {
                elemName: "Edit Date",
                label: "Edit Data",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
            //To Start Status
            { elemName: "Status", label: "Status", state: "ACTIVE" },
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            filePath,
            parameterList
        );
    });

    it("Create Request and verify results",() => {
        //Step 2: Create a Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            cy.reload();
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42255(requestId);
        });
    });
});