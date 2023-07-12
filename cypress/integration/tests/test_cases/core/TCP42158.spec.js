import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
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
    
    let processName = "TCP4-2158 Verify Event Based Gateway Conditional and Message Event";
    let filePath = "processes/TCP4-2158 Verify Event Based Gateway Conditional and Message Event.json";
 

    it("Verify and Import Process", () => {
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEventA",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
         ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });

    it("TCP4-2158 Verify Event Based Gateway Conditional and Message Event", () => {         
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42158(requestId);
        });
    });       
});