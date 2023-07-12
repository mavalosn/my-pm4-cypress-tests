import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Admin } from "../../../pages/admin";

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
    let processName = "TCP4-2202 Verify Script Tasks in Parallel";
    let filePath = "processes/TCP4-2202 Verify Script Tasks in Parallel.json";
    let requestId;

    it("TCP4-2202 Verify Script Tasks in Parallel", function () {
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Script 1
            {elemName: "Script", label:"Verify Script Tasks in Parallel Success",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script 2
            {elemName: "Script", label:"Verify Script Tasks in Parallel Error",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            filePath,
            parameterList
        ); 
         //Step 2: Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.get('button[class="btn btn-primary"').click();
            navHelper.navigateToRequestsPage();
            cy.visit('/requests/' + requestId);
            request.waitUntilElementIsVisible('selector','.px-4 > :nth-child(9)',20);
            var today = new Date();
            var day = today.getDate();
            //If day is an even number.
            if(day % 2 == 0) {
                execution.actionsAndAssertionsOfTCP42202();
                cy.get('#main').should('contain','Admin User has completed the task C');
            }
            else {
                //If day is an odd number.
                execution.actionsAndAssertionsOfTCP42202();
            }
        });
    });
});