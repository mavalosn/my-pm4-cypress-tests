import { Login } from "../../../../pages/login"
import { Process } from "../../../../pages/process";
import { NavigationHelper } from "../../../../helpers/navigationHelper";
import { Header } from "../../../../pages/header";
import { Requests } from "../../../../pages/requests";
import { Screens } from "../../../../pages/screens";
import { RequiredExecution } from "../../../../pages/requiredFieldExecution"

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const screens= new Screens();
const requiredExecution = new RequiredExecution();

describe("ProcessMaker Test Cases", () => {

    beforeEach(()=>{
        login.navigateToUrl();
        login.login();
    });

    let processName = "requiredFieldNestedMulticolumn";
    let filePath = "processes/requiredFieldNestedMulticolumn.json";
    let requestId;

    it('Import the process ', () =>{
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it('Verify Required field for controls inside a MultiColumn in a nested screen',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredNestedScreenInsideMultiColumn();
        });
    })

    it('Verify Required If field for controls inside a MultiColumn in a nested screen',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredIfNestedScreenInsideMultiColumn();
        });
    })

    it('Verify Required Unless field for controls inside a MultiColumn in a nested screen',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredUnlessNestedScreenInsideMultiColumn();
        });
    })
})