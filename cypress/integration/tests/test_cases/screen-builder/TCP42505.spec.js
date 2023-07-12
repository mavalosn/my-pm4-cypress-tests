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

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    let processName = "TCP4-2505 Process screen text area validations";
    let processPath = "processes/TCP4-2505 Process screen text area validations.json";
    let requestId;

    it("TCP4-2505 Process screen text area validations", () => {

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
            processPath,
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

            //Step 3: Validations
            //First validations "Correct values"
            execution.actionsAndAssertionsCorrectValuesTCP42505();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);

            //Second validations "Incorrect values"
            execution.actionsAndAssertionsIncorrectValuesTCP42505();
        });
   });
});
