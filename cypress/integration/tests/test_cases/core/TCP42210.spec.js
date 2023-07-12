import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Scripts } from "../../../pages/scripts";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

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
    let processName = "TCP4-2210 Verify Request data with _parent inside a loop with script";
    it("TCP4 - 2210 TCP4-2210 Verify Request data with _parent inside a loop with script", () => {
        // Step 1: Create Script
        const timeStamp = new Date().getTime();
        const nameScript = `00Script${timeStamp}`;
        const descriptionScript = `Description-${timeStamp}`;
        const nameUser = "Admin";
        var scriptValue = "$recordList1 = [['input1' => 'Input record 1', 'textArea1' => 'Text area record 1', 'datePicker1' =>'2021-04-01', 'datePicker2' => '2021-04-01T19:39:00.000Z'],['input1' => 'Input record 2', 'textArea1' => 'Text area record 2', 'datePicker1' =>'2021-04-02', 'datePicker2' => '2021-04-02T19:39:00.000Z'],];$loop_1 = [['input2' => 'Input loop 1', 'textArea2' => 'Textarea loop 1', 'datePicker3' =>'2021-04-01', 'datePicker4' => '2021-04-01T19:39:00.000Z']];return ['recordList1' => $recordList1,'loop_1' => $loop_1];";

        navHelper.navigateToScriptPage();
        scripts.createScript(nameScript, descriptionScript, nameUser);
        scripts.addPhpTOScript(scriptValue);

        //Step 2: Import the process
        navHelper.navigateToProcessPage();
        let processPath =
            "processes/TCP4-2210 Verify Request data with _parent inside a loop with script.json";
        let parameterList = [
            //To Process Manager
            {
                elemName: "Process Manager",
                label: "Process Manager",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath,
            parameterList
        );

        //Step 3: Edit Process in Modeler
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        cy.get('[title="Save"] > .svg-inline--fa > path');
        const scriptTaskXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        execution.addScriptInModeler("ScriptTask1",scriptTaskXpath,nameScript);
        cy.get('button[title="Save"]').click();
        cy.contains('button[class="btn btn-secondary"]','Save').click();
        
        //Step 4: Start Request
        navHelper.navigateToRequestsPage();
        cy.get('button[id="navbar-request-button"]').click();
        cy.get('[class="process-list"]').should('be.visible');
        cy.get('input[class="form-control"]').type(processName).should('have.value',processName);

        //Step 5: Recovered Data of Record List
        cy.xpath("//span[contains(text(),'processName')]/parent::div/parent::div[@class='row']".replace('processName',processName), { timeout: 10000 })
            .then(() => {
                cy.xpath("//span[contains(text(),'processName')]/parent::div/parent::div[@class='row']//a[contains(text(),'Start')]".replace('processName',processName)).should('be.visible');
                cy.wait(2000);
                cy.xpath("//span[contains(text(),'processName')]/parent::div/parent::div[@class='row']//a[contains(text(),'Start')]".replace('processName',processName)).click();
            });

        //First validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(0,'Input record 1','Select List Recover Input');

        //Second validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(0,'2021-04-01','Select List Recover Data');

        //Third validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(0,'Text area record 1','Select List Recover Textarea');

        //Fourth validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordListDateTime(0,'2021-04-01','Select List Recover Date Time');

        //Add in the second record list
        cy.get('button[title="Add Item"]').eq(0).click();

        //Five validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(1,'Input record 2','Select List Recover Input');

        //Six validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(1,'2021-04-02','Select List Recover Data');

        //Seven validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(1,'Text area record 2','Select List Recover Textarea');

        //Eighth validation
        execution.actionsAndAssertionsOfTCP42210RecoverRecordListDateTime(1,'2021-04-02','Select List Recover Date Time');

        //Step 6: Recovered Data of Loop
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(0,'Input loop 1','Select List Recover Input 1');
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(0,'2021-04-01','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42210RecoverRecordList(0,'Textarea loop 1','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42210RecoverRecordListDateTime(0,'2021-04-01','Select List Recover Date Time 1');
        cy.get('button[aria-label="New Submit"]').click();
    });
});
