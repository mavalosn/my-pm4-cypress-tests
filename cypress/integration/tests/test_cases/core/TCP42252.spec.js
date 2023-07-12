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
//var requestID;

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });
    let requestID1;
    let requestID2;
    let requestID3;
    let requestID4;

    it("Verify and Import Process", () => {    
        //Import the Process
        var processName = "TCP4-2252 Verify Inclusive Gateway";
        var filePath = "processes/TCP4-2252 Verify Inclusive Gateway.json";

        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"First Script TCP4-2252 Verify Inclusive Gateway I",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"Second Script TCP4-2252 Verify Inclusive Gateway II",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"Third Script TCP4-2252 Verify Inclusive Gateway III",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"Fourth Script TCP4-2252 Verify Inclusive Gateway IV",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Edit Data
          {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"},
         ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });
    
    it("TCP4-2252 Verify Inclusive Gateway Scenario 1", async() => {     
       request.openNewRequest("TCP4-2252 Verify Inclusive Gateway");
       requestID1 = await request.getRequestID();
    });

    it('validate scenario 1',()=>{
       request.openRequestById(requestID1);
       execution.actionsAndAssertionsOfTCP42252Scenario1();
       execution.verifyTCP42252Scenario1(requestID1);
    });

    it("TCP4-2252 Verify Inclusive Gateway Scenario 2", async() => {     
       request.openNewRequest("TCP4-2252 Verify Inclusive Gateway");
       requestID2 = await request.getRequestID();
    });
    it('validate scenario 2',()=>{
       request.openRequestById(requestID2);
       execution.actionsAndAssertionsOfTCP42252Scenario2();
       execution.verifyTCP42252Scenario2(requestID2);
    });

    it("TCP4-2252 Verify Inclusive Gateway Scenario 3", async() => {           
       request.openNewRequest("TCP4-2252 Verify Inclusive Gateway");
       requestID3 = await request.getRequestID();
    });

    it('validate scenario 3',()=>{
       request.openRequestById(requestID3);
       execution.actionsAndAssertionsOfTCP42252Scenario3();
       execution.verifyTCP42252Scenario3(requestID3);
    });
    
    it("TCP4-2252 Verify Inclusive Gateway Scenario 4", async() => {           
       request.openNewRequest("TCP4-2252 Verify Inclusive Gateway");
       requestID4 = await request.getRequestID();
    });

    it('validate scenario 4',()=>{
       request.openRequestById(requestID4);
       execution.actionsAndAssertionsOfTCP42252Scenario4();
       execution.verifyTCP42252Scenario4(requestID4);
    });
});
    
  
  
  

