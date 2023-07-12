import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import { Admin } from "../../../pages/admin";
import selectorsAdmin from "../../../selectors/admin";
import {Screens} from "../../../pages/screens";
import {Dataconnectors} from "../../../pages/dataConnectors";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const admin = new Admin();
const screen = new Screens();
const dataConnector = new Dataconnectors();

describe("Processmaker Test Cases", () => {
    
    let token;

    let processName = "TCP4-2297 Generate request";
    let filePath = "processes/TCP4-2297 Generate request.json";

    let processNameA = "002297 Process A";
    let filePathA = "processes/002297 Process A.json";

    let processNameB = "002297 Process B";
    let filePathB = "processes/002297 Process B.json";

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    
    
    it('Verify and Import Process',() =>{
        
        //verify process imported
        navHelper.navigateToProcessPage();

        let parameterList = [
            //To Start Event
            {elemName: "StartEvent", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"TCP4-2297 Launch Requests Script",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //Edit
            {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);

        let parameterListA = [
            //To Start Event
            {elemName: "StartEvent", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //Edit
            {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];

        cy.xpath('(//input[@id="search-box"])[1]').clear();
        process.verifyPresenceOfProcessAndImportProcess(processNameA,filePathA,parameterListA);

        let parameterListB = [
            //To Start Event
            {elemName: "StartEvent", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //Edit
            {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];

        cy.xpath('(//input[@id="search-box"])[1]').clear();
        process.verifyPresenceOfProcessAndImportProcess(processNameB,filePathB,parameterListB);
    });

    it("Get Token", async() => {
        navHelper.navigateToAdminPage();
        token = await admin.userGetToken('admin');
    });


    it("Create Data Connector", () => {
        let name = "TCP4-2297 Generate request"; 
        let description = "TCP4-2297 Generate request"; 
        let connectorType = "REST Service";
        let type =  "Bearer Token";

        let sourcesParameter = {"description": "TCP4-2297 Generate request", "method": "GET", "URL": "/api/1.0/processes"};
        
        navHelper.navigateToDataConnectorPage();
        dataConnector.verifyPresenceOfDataConnectorAndCreateWithBearerToken(name, description, connectorType, type, token, sourcesParameter);
    });

    it('Search and Configure Screen',() =>{
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        screen.verifyScreenNameAndObtainLink("FormTask");
        cy.xpath('//label[text()="Select Process"]/parent::div').click({force:true});
        cy.xpath('//button[@data-cy="accordion-DataSource"]').click();
        cy.xpath('//select[@id="data-sources-list"]').select('TCP4-2297 Generate request');
        cy.xpath('//select[@id="endpoint-list"]').select('list');
        screen.saveTheChanges('Form');

        
    });

   
    

    it('Execution TCP4-2297 Generate request',() =>{
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            let requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            execution.actionsAndAssertionsOfTCP42297(requestId);       
        });
    });
    
    });   
