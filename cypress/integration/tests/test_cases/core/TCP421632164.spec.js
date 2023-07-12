import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";
import selectorsAdmin from "../../../selectors/admin";
import {ExternalEmails} from "../../../pages/emails";
import {Dataconnectors} from "../../../pages/dataConnectors";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const admin = new Admin();
const emails = new ExternalEmails();
const dataConnector = new Dataconnectors();


describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });
    
    var processNameA = "TCP4-2163 Verify Signal Script Task Timer Event and Terminate Event A";
    var filePathA = "processes/TCP4-2163 Verify Signal Script Task Timer Event and Terminate Event A.json";

    var processNameB = "TCP4-2164 Verify Signal Script Task Timer Event and Terminate Event B";
    var filePathB = "processes/TCP4-2164 Verify Signal Script Task Timer Event and Terminate Event B.json";
    
    let token;
    it("Get Token", async() => {
        navHelper.navigateToAdminPage();
        token = await admin.userGetToken('admin');
    });

    it("Verify and Import Process TCP4-2163", () => {
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterListA = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"TCP4-2163 Verify Signal Script Task Timer Event and Terminate Event A - Terminate Agreement Get Current Date",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
         ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processNameA,filePathA, parameterListA); 
    });

    it("Verify and Import Process TCP4-2164", () => {    
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterListB = [
          //To Script
          {elemName: "Script", label:"TCP4-2164 Verify Signal Script Task Timer Event and Terminate Event B - Set Email to each Employee", user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
         ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processNameB,filePathB, parameterListB); 
    });

   it("Create a Date Connector", () => {
        const name = "Verify Signal Script Task Timer Event and Terminate Event";
        const description = "Verify Signal Script Task Timer Event and Terminate Event";
        const connectorType = "REST Service";
        const type="Bearer Token";
        let sourcesParameter = {
            //description
            description: "Verify Signal Script Task Timer Event and Terminate Event",
            //method
            method: "GET",
            //URL
            URL: "/api/1.0/groups"
        };

        navHelper.navigateToProcessPage();
        cy.get(selectors.dataConnectorsOptionAccess).click();
        dataConnector.verifyPresenceOfDataConnectorAndCreateWithBearerToken(name, description, connectorType, type, token, sourcesParameter);
   });

   it("Process Configuration TCP4-2163 Verify Signal Script Task Timer Event and Terminate Event A", () => {
        navHelper.navigateToProcessPage();
        process.searchForProcess(processNameA); 
        //End Signal Event
        let signalEvent = "SendEmail";
        let signal = "Verify Signal Script Task Timer Event and Terminate Event";
        process.verifyConfigOfSignalEndEvent(signalEvent, signal);
        process.saveProcessWithoutVersion();
    });


   it("Process Configuration TCP4-2164 Verify Signal Script Task Timer Event and Terminate Event B", () => {
       navHelper.navigateToProcessPage();
       process.searchForProcess(processNameB);
       let elementName = "GetFiles";
       let dataConnectorName = "Verify Signal Script Task Timer Event and Terminate Event";
       let resource =  "GET: list";
       process.verifyConfigOfDataConnectorAndConfig(elementName,dataConnectorName, resource);
       process.saveProcessWithoutVersion();
       //Start Signal Event
       let signalEvent = 'SignalStartEvent';
       let signal = "Verify Signal Script Task Timer Event and Terminate Event";
       process.verifyConfigOfSignalStartEvent(signalEvent, signal);
       process.saveProcessWithoutVersion();
       //Task AA
       cy.xpath('(//*[contains(text(),"AA")])[8]').click();
       cy.xpath('//span[text()="Assignment Rules"]').click();
       cy.xpath('//select[@id="assignmentsDropDownList"]').select('process_manager').should('have.value','process_manager');
       process.saveProcessWithoutVersion();
   });

   it("TCP4-2163 2164 Verify Send Email Manual Task Script Task", () => {
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processNameA);
        cy.url().then(url =>{           
            var requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42163(requestId);
            execution.actionsAndAssertionsOfTCP42164();
        });       
    });
 }); 