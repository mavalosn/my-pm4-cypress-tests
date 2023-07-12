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

    let processName = "TCP4-2187 Verify Loop Task Parallel Sequential Slack Notification Parallel Gateway Email Notifications";
    let filePath = "processes/TCP4-2187 Verify Loop Task Parallel Sequential Slack Notification Parallel Gateway Email Notifications.json";

    it("Verify and Import Process", () => {    
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Edit Data
          {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"},
        ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });
    

    it("Execution TCP4-2187 Verify Loop Task Parallel Sequential Slack Notification Parallel Gateway Email Notifications", () => { 
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42187(requestId);       
        });
    });
});   
 
  

