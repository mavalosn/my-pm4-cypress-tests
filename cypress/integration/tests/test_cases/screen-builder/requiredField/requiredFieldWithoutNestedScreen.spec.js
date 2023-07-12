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

    let processName = "RequiredFieldNestedScreen"; //requiredFieldNestedMulticolumn
    let filePath = "processes/RequiredFieldNestedScreen.json";
    let requestId;

    it('Import the process ', () =>{
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it('TCP4-2882 Verify Required field for controls without a MultiColumn in a nested screen',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredNestedScreenWithoutMultiColumn();
        });
    })

    it('TCP4-2883 Verify Required If field for controls without a MultiColumn in a nested screen',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredIfNestedScreenWithoutMultiColumn();
        });
    })

    it('TCP4-2884 Verify Required Unless field for controls without a MultiColumn in a nested screen',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredUnlessNestedScreenWithoutMultiColumn();
        });
    })
})