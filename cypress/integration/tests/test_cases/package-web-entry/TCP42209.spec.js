import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Scripts} from "../../../pages/scripts";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import {Requests} from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const scripts = new Scripts();
const process = new Process();
const execution = new Execution();
const request = new Requests();

describe("Processmaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
    });

    let requestId;
    let processName = "TCP4-2209 Verify Request data with _parent inside a loop in Web entry";

    it("TCP4-2209 Verify Request data with _parent inside a loop in Web entry", () => {
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let processPath = "processes/TCP4-2209 Verify Request data with _parent inside a loop in Web entry.json";
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);

        //Step 2: Get WE Url
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        
        //Step 3: Add 4 records of data in the record list
        execution.actionsAndAssertionsOfTCP42209FillRecordList('Record List 1','Text Area 1','11/01/2022','11/01/2022 00:00')
        execution.actionsAndAssertionsOfTCP42209FillRecordList('Record List 2','Text Area 2','11/02/2022','11/02/2022 00:00')
        execution.actionsAndAssertionsOfTCP42209FillRecordList('Record List 3','Text Area 3','11/03/2022','11/03/2022 00:00')
        execution.actionsAndAssertionsOfTCP42209FillRecordList('Record List 4','Text Area 4','11/04/2022','11/04/2022 00:00')

        //Step 4: Add 4 records of data in loop
        execution.actionsAndAssertionsOfTCP42209FillLoop(0,'Loop 1','textAreaL1','11/01/2022','11/01/2022 00:00')
        cy.get('button[title="Add Item"]').click();
        execution.actionsAndAssertionsOfTCP42209FillLoop(1,'Loop 2','textAreaL2','11/02/2022','11/02/2022 00:00')
        cy.get('button[title="Add Item"]').click();
        execution.actionsAndAssertionsOfTCP42209FillLoop(2,'Loop 3','textAreaL3','11/03/2022','11/03/2022 00:00')
        cy.get('button[title="Add Item"]').click();
        execution.actionsAndAssertionsOfTCP42209FillLoop(3,'Loop 4','textAreaL4','11/04/2022','11/04/2022 00:00')
        cy.contains('button[aria-label="New Submit"]','New Submit').click();  
        
        
    });
    it("TCP4-2209 Validations", () => {
        //Step 5: Open the request created by the web entry
        request.openRequestByName(processName);
        request.clickOnTaskName(1, 1);
        //Step 6: Verify Recovered Data of Record List 
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(0,'Record List 1','Select List Recover Input')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(0,'Text Area 1','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(0,'2022-11-01','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(0,'2022-11-01','Select List Recover Date Time');
        cy.get('button[title="Add Item"]').eq(0).click();
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(1,'Record List 2','Select List Recover Input')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(1,'Text Area 2','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(1,'2022-11-02','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(1,'2022-11-02','Select List Recover Date Time');
        cy.get('button[title="Add Item"]').eq(0).click();
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(2,'Record List 3','Select List Recover Input')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(2,'Text Area 3','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(2,'2022-11-03','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(2,'2022-11-03','Select List Recover Date Time');
        cy.get('button[title="Add Item"]').eq(0).click();
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(3,'Record List 4','Select List Recover Input')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(3,'Text Area 4','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(3,'2022-11-04','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(3,'2022-11-04','Select List Recover Date Time');
        
        //Step 7: Verify Recovered Data of Loop 
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(0,'Loop 1','Select List Recover Input 1')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(0,'textAreaL1','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(0,'2022-11-01','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(0,'2022-11-01','Select List Recover Date Time 1');
        cy.get('button[title="Add Item"]').eq(1).click();
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(1,'Loop 2','Select List Recover Input 1')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(1,'textAreaL2','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(1,'2022-11-02','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(1,'2022-11-02','Select List Recover Date Time 1');
        cy.get('button[title="Add Item"]').eq(1).click();
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(2,'Loop 3','Select List Recover Input 1')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(2,'textAreaL3','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(2,'2022-11-03','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(2,'2022-11-03','Select List Recover Date Time 1');
        cy.get('button[title="Add Item"]').eq(1).click();
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(3,'Loop 4','Select List Recover Input 1')
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(3,'textAreaL4','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordList(3,'2022-11-04','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42209RecoverRecordListDateTime(3,'2022-11-04','Select List Recover Date Time 1');
        cy.contains('button[aria-label="New Submit"]','New Submit').click();    
     });

});