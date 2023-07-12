import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
import selectorsAdmin from "../../../selectors/admin";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const admin = new Admin();
const request = new Requests();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });

    var processName = "TCP4-2241 Verify Manual Tasks and Event Based Gateway with Collections";
    var filePath = "processes/TCP4-2241 Verify Manual Tasks and Event Based Gateway with Collections.json";

   it("Verify and Import Collections", () => {
        var attempts = 0;
        var maxAttempts = 10;
        //Importing and Configuring Collecting A
        const collectionNameA = "TCP4-2241 A";
        const filePathA = "collections/TCP4_2241_A.json";
        navHelper.navigateToCollectionPage(); 
        var editBtn = "[title='Records'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.xpath(selectorsAdmin.searchCollection).type(collectionNameA).should('have.value', collectionNameA);
        cy.wait(5000);
        cy.xpath(selectorsAdmin.collectionTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    admin.importCollection(filePathA);
                    admin.searchForCollection(collectionNameA,"config");   
                    cy.xpath('//label[text()="Throw Signal TCP4-2241 A_create On Insert"]/parent::div/input[@id="signal_create"]').check({force:true}); 
                    cy.xpath('(//div[@class="d-flex justify-content-end"]/button[@class="btn btn-secondary ml-3"])[1]').click();    
                }
                else return;
            });
           
        //Importing and Configuring Collecting B
        const collectionNameB = "TCP4-2241 B";
        const filePathB = "collections/TCP4_2241_B.json";
        navHelper.navigateToCollectionPage(); 
        cy.get(editBtn).should('be.visible');
        cy.xpath(selectorsAdmin.searchCollection).type(collectionNameB).should('have.value', collectionNameB);
        cy.wait(5000);
        cy.xpath(selectorsAdmin.collectionTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    admin.importCollection(filePathB);
                    admin.searchForCollection(collectionNameB,"config");   
                    cy.xpath('//label[text()="Throw Signal TCP4-2241 B_create On Insert"]/parent::div/input[@id="signal_create"]').check({force:true}); 
                    cy.xpath('(//div[@class="d-flex justify-content-end"]/button[@class="btn btn-secondary ml-3"])[1]').click();    
                }
                else return;
            });       
        });

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
    
    it("Configure Process", () => { 
        var processName = "TCP4-2241 Verify Manual Tasks and Event Based Gateway with Collections";

        //Selecting the signals in intermediate events
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName, "edit");  
        
        //Configure Signal Event AA
       let signalEventA = 'AA';
       let signalA = "TCP4-2241 A create";
       process.verifyConfigOfSignalIntermediateEvent(signalEventA, signalA);
       process.saveProcessWithoutVersion();
         
         //Configure Signal Event BB
        let signalEventB = 'BB';
        let signalB = "TCP4-2241 B create";
        process.verifyConfigOfSignalIntermediateEvent(signalEventB, signalB);
        process.saveProcessWithoutVersion();
    });

    it("Execution TCP4-2241 Verify Manual Tasks and Event Based Gateway with Collections Part A", () => { 
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestIDA = url.split('/')[4].trim();      
            execution.actionsAndAssertionsOfTCP42241A(requestIDA);       
        });
    });

    it("TCP4-2241 Verify Manual Tasks and Event Based Gateway with Collections Part B", () => {  
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestIDB = url.split('/')[4].trim();          
            execution.actionsAndAssertionsOfTCP42241B(requestIDB);       
           });
    });
});   
 
  

