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

    let processName = "TCP4-2867 requiredFields";
    let filePath = "processes/TCP4-2867_requiredFields.json";
    let requestId;

    it('Verify if process was imported> ', () =>{
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it('TCP4-2876 Verify message required field for controls without a MultiColumn',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            requiredExecution.verifyRequiredSubmitWithoutMultiColumn();
        });
    })

    it('TCP4-2877 Verify Required unless configuration without a MultiColumn',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredIfSubmitWithouthMultiColumn();
        });
    })

    it('TCP4-2878 Verify Required unless configuration with out a MultiColumn',()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);        
            requiredExecution.verifyRequiredUnlessSubmitWithoutMultiColumn();
        });
    })
})