import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Admin } from "../../../pages/admin";
import selectorsAdmin from "../../../selectors/admin";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const admin = new Admin();


describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });
    
    let processName = "TCP4-2265 Process Signal 1";
    let filePath = "processes/TCP4-2265 Process Signal 1.json";

    it("Verify and Import Collections", () => {

        //Importing and Configuring Collecting A
        const collectionName = "TCP4-2265 testSignalProcess";
        const filePath = "collections/tcp4_2265_testsignalprocess.json";
        navHelper.navigateToCollectionPage(); 
        var editBtn = "//th[text()='# Records ']";
        cy.xpath(editBtn).should('be.visible');
        cy.xpath(selectorsAdmin.searchCollection).type(collectionName).should('have.value', collectionName);
        cy.wait(5000);
        cy.xpath(selectorsAdmin.collectionTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    admin.importCollection(filePath);
                    admin.searchForCollection(collectionName,"config"); 
                    cy.xpath('//label[text()="Throw Signal TCP4-2265 testSignalProcess_create On Insert"]/parent::div/input[@id="signal_create"]').check({force:true});
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
          {elemName: "Start Event", label:"SignalStartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
         ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });

    it("Configure Process", () => { 
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName, "edit");     
       
        //Start Signal Event
        let signalEvent = 'SignalStartEvent';
        let signal = "TCP4-2265 testSignalProcess create";
        process.verifyConfigOfSignalStartEvent(signalEvent, signal);
        process.saveProcessWithoutVersion();
       
    });
    
    it("TCP4-2264 Verify Rich Text with HTML", () => {         
            execution.actionsAndAssertionsOfTCP42265();
    });
          
        
});
