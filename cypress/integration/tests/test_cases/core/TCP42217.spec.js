import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });
    
    let processName = "TCP4-2217 Verify Gateways Mixed with Events";
    let filePath = "processes/TCP4-2217 Verify Gateways Mixed with Events.json";

    it("Verify and Import Process", () => {
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
         ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });
 
    it("TCP4-2217 Verify Gateways Mixed with Events", () => {         
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            cy.reload();
            request.waitUntilElementIsVisible('selector','a[href^="/tasks"]');
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42217(requestId);
        });
    });  
});

