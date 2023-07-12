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

    let processName = "TCP4-2869 requiredField_multicolumn";
    let filePath = "processes/TCP4-2869_requiredField_multicolumn.json";
    let requestId;

    it('Verify if process was imported> ', () =>{
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it('TCP4-2879 Verify message required field for controls with a MultiColumn',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            requiredExecution.verifyRequiredSubmitWithMultiColumn();
        });
    })

    it('TCP4-2880 Verify Required unless configuration with a MultiColumn',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            requiredExecution.verifyRequiredIfSubmitWithMultiColumn();
        });
    })

    it('TCP4-2881 Verify Required unless configuration with a MultiColumn',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredUnlessSubmitWithMultiColumn();
        });
    })
})