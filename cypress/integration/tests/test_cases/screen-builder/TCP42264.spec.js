import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
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
    
    var processName = "TCP4-2264 Verify Rich Text with HTML";
    var filePath = "processes/TCP4-2264 Verify Rich Text with HTML.json";

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
    
    it("TCP4-2264 Verify Rich Text with HTML", () => { 
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestID = url.split('/')[4].trim();          
            execution.actionsAndAssertionsOfTCP42264(requestID);
        });           
          
        
    });
});