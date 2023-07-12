import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    });
    let requestId;

    it("TCP4-2478 Process screen freeze with calcs", () => {

        let processName = "TCP4-2478 Process screen freeze with calcs";
        let filePath = "processes/TCP4-2478 Process screen freeze with calcs.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
        //To Process Manager
        {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    
        //Step 2: Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.clickOnTaskName(1, 1);
            cy.get('button[aria-label="New Submit"]').click();
            request.verifyTaskIsCompleted();

            //Go to request
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.get('button[aria-label="New Submit"]').click();
            request.verifyTaskIsCompleted();

            //Step 3: Validations
            //Validation of date
            cy.visit('/requests/'+requestId);
            let date = new Date();
            let fullYear = date.getFullYear();
            cy.get('tbody > :nth-child(1) > [aria-colindex="2"]').should('contain',fullYear);

            //verify that main request was completed
            request.verifyRequestisCompleted(requestId);
        });
    });
});