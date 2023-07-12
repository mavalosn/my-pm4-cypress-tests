import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
import {Scripts} from "../../../pages/scripts";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const scripts = new Scripts();


describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2331 Verify Script API and Image", () => {
        var processName = "TCP4-2331 Verify Script API and Image";
        var filePath = "processes/TCP4-2331 Verify Script API and Image.json";
        var scriptName = "TCP4-2331 Verify Script API and Image";

        //Step 1: Import the process
         //Step 1: ***************Import the process and config***************
         navHelper.navigateToProcessPage();
         let parameterList = [
             //To Start Event 
             {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
             //To Script
             {elemName: "Script", label:"TCP4-2331 Verify Script API and Image",user:"admin",firstName:"Admin", lastName:"User"},
             //To Process Manager
             {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
             //To Cancel Request
             {elemName: "Cancel Request", label:"Cancel Request",user:"admin",firstName:"Admin", lastName:"User"},
             //To Edit Data
             {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
             //To Start Status
             {elemName: "Status", label:"Status",state:"ACTIVE"},
         ];
         process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);
         
        //Step 2: Editting the Script
        navHelper.navigateToProcessPage();

        cy.xpath(
                 selectors.scriptOptionAccess
                ).click({ force: true });
        cy.get('button[aria-label="Create Script"]').should('be.visible');
        cy.wait(2000);
        cy.xpath('(//input[@aria-label="Search"])[1]').type(scriptName);
        cy.wait(5000);
        cy.xpath(selectors.scriptList, { timeout: 10000 })
                .find('td')
                .eq(0)
                .should('contain.text', scriptName)
                .then(($data) => {
                        if($data){
                            return;
                        }
                        else{                       
                        cy.xpath('//div[@class="pagination-nav-item item"][1]')
                                .should('contain.text', 2)
                                .click({force:true});
                        }
                    });                                          
        cy.xpath('//tbody/tr[@item-index="0"]/td[2]')                   
                    .should('contain.text', scriptName);
        cy.xpath('//tbody/tr[@item-index="0"]/td[7]//button[@title="Configure"]')
                    .should('be.visible')
                    .click();
        cy.get('[type="checkbox"]').eq(0).check({force: true});
        cy.wait(5000);
        cy.xpath(
               selectors.checkboxEnableDirectAPIAccess
              )
              .check({ force: true });
        cy.get('input[id="url"]').invoke('val').then((apiValue) => {
        apiValue = apiValue.trim();
        cy.wait(5000);
        cy.xpath(selectors.saveScriptButton)
            .should('contain.text',"Save")
            .click();
        cy.wait(5000);        
        //Step 3 Checking and Creating the Data Connector
        cy.get(selectors.dataConnectorsOptionAccess).click();
        cy.wait(5000);
        cy.get('button[aria-label="Create Data Connector"]').should('be.visible');        
        cy.xpath('(//input[@aria-label="Search"])[1]').type(connectorName);
        cy.xpath('(//button[@aria-label="Search"]/i)[1]').click(); 
        cy.wait(5000);
        cy.xpath(selectors.dataConnectorList, { timeout: 10000 })
                .find('td')
                .then(($loadedTable) => {
                        if($loadedTable.length === 1){
                            cy.get('button[aria-label="Create Data Connector"]')
                                     .should('contain.text',"Data Connector")
                                     .click();
                            cy.get('input[name="name"]').type(
                                    connectorName
                                   ).should('have.value', connectorName);
                            cy.get('textarea[name="description"]').type(
                                    "TCP4-2331 Verify Script API and Image"
                                  ).should('have.value', "TCP4-2331 Verify Script API and Image");
                            cy.xpath('//label[text()="Authentication Type"]/ancestor::div[@class="form-group"]//div[@class="multiselect__select"]')
                                        .click();
                            cy.xpath('//li[@aria-label="No Auth. "] /span/span')
                                        .should('contain.text',"No Auth")
                                        .click();
                            cy.xpath('(//button[@class="btn btn-secondary"])[2]')                                       
                                        .should('contain.text',"Save")
                                        .click();
                            cy.get('button[aria-label="Create Resource"]')
                                        .should('contain.text',"Resource")
                                        .click();
                            cy.wait(5000);
                            cy.get('select[name="method"]').select("GET");
                            cy.get('input[name="url"]').type(apiValue);
                            cy.get('button[class="btn btn-primary"]')
                                        .contains("add")
                                        .click(); 
                            } 
                            else return;                             
                        });
                    });
  
       //Step 4 Configuration if process in Process Map
       navHelper.navigateToProcessPage();
       process.searchForProcess(processName); 
       
        let elementName = "DataConnector";
        let connectorName  = "TCP4-2331 Verify Script API and Image";
        let resource =  "GET: list";
        process.verifyConfigOfDataConnectorAndConfig(elementName,connectorName, resource);
        cy.xpath('//button[@title="Save"]').click();
        cy.xpath('//button[text()="Save"]').click();

        process.saveProcessWithoutVersion();
       
       //Step: Execution of the process
       navHelper.navigateToRequestsPage();
       execution.actionsAndAssertionsOfTCP42331A();
           });
        });
