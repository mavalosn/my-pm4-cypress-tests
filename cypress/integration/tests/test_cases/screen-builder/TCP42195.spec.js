import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();

describe("Processmaker Test Cases", function () {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    let processName = "TCP4-2195 Verify Request data with _parent inside a record list";
    let filePath = "processes/TCP4-2195 Verify Request data with _parent inside a record list.json";
    let requestId;

    it("TCP4-2195 Verify Request data with _parent inside a record list", function () {
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        let parameterList = [
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
            filePath,
            parameterList
        );

         //Step 2: Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Fill Record List
            execution.actionsAndAssertionsOfTCP42195FillRecordList('lineInputRL1','textAreaRL1','2022-10-01','2022-11-01 10:00');
            execution.actionsAndAssertionsOfTCP42195FillRecordList('lineInputRL2','textAreaRL2','2022-10-02','2022-11-02 10:00');
            execution.actionsAndAssertionsOfTCP42195FillRecordList('lineInputRL3','textAreaRL3','2022-10-03','2022-11-03 10:00');
            execution.actionsAndAssertionsOfTCP42195FillRecordList('lineInputRL4','textAreaRL4','2022-10-04','2022-11-04 10:00');
            //Fill Loop
            execution.actionsAndAssertionsOfTCP42195FillLoop(0,'lineInputL1','textAreaL1','2022-10-01','2022-11-01 10:00');
            cy.get('button[title="Add Item"]').click();
            execution.actionsAndAssertionsOfTCP42195FillLoop(1,'lineInputL2','textAreaL2','2022-10-02','2022-11-02 10:00');
            cy.get('button[title="Add Item"]').click();
            execution.actionsAndAssertionsOfTCP42195FillLoop(2,'lineInputL3','textAreaL3','2022-10-03','2022-11-03 10:00');
            cy.get('button[title="Add Item"]').click();
            execution.actionsAndAssertionsOfTCP42195FillLoop(3,'lineInputL4','textAreaL4','2022-10-04','2022-11-04 10:00');
            cy.contains('button[aria-label="New Submit"]','New Submit').click();
        });
    });
    it("TCP4-2195 Validations", function () {
        navHelper.navigateToRequestsPage();
        //cy.visit('/requests/' + requestId);
        request.openRequestById(requestId);
        request.clickOnTaskName(1, 1);

        //Validation 1:Select the first group of data entered in the previous screen, in all fields
        cy.contains('button[data-cy="add-row"]','Add').eq(0).click();
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputRL1','Select List Recover Input');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaRL1','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-01','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-01','Select List Recover Date Time');
        cy.contains('button[class="btn btn-primary"]','Ok').click();

        //Validation 2:Select the second group of data entered in the previous screen, in all fields
        cy.contains('button[data-cy="add-row"]','Add').eq(0).click();
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputRL2','Select List Recover Input');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaRL2','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-02','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-02','Select List Recover Date Time');
        cy.contains('button[class="btn btn-primary"]','Ok').click();

        //Validation 3:Select the third group of data entered in the previous screen, in all fields
        cy.contains('button[data-cy="add-row"]','Add').eq(0).click();
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputRL3','Select List Recover Input');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaRL3','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-03','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-03','Select List Recover Date Time');
        cy.contains('button[class="btn btn-primary"]','Ok').click();

        //Validation 4:Select the fourth group of data entered in the previous screen, in all fields
        cy.contains('button[data-cy="add-row"]','Add').eq(0).click();
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputRL4','Select List Recover Input');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaRL4','Select List Recover Textarea');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-04','Select List Recover Data');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-04','Select List Recover Date Time');
        cy.contains('button[class="btn btn-primary"]','Ok').click();

        //Validation 5:Select the first group of data entered in the previous screen, in all fields
        cy.get('button[data-cy="add-row"]').eq(1).click();
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputL1','Select List Recover Input 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaL1','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-01','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-01','Select List Recover Date Time 1');
        cy.xpath('//div[@class="modal fade show"]//footer//button[@class="btn btn-primary"]').click();

        //Validation 6:Select the second group of data entered in the previous screen, in all fields
        cy.get('button[data-cy="add-row"]').eq(1).click({force:true});
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputL2','Select List Recover Input 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaL2','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-02','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-02','Select List Recover Date Time 1');
        cy.xpath('//div[@class="modal fade show"]//footer//button[@class="btn btn-primary"]').click();

        //Validation 7:Select the third group of data entered in the previous screen, in all fields
        cy.get('button[data-cy="add-row"]').eq(1).click({force:true});
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputL3','Select List Recover Input 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaL3','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-03','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-03','Select List Recover Date Time 1');
        cy.xpath('//div[@class="modal fade show"]//footer//button[@class="btn btn-primary"]').click();

        //Validation 8: Select the fourth group of data entered in the previous screen, in all fields
        cy.get('button[data-cy="add-row"]').eq(1).click({force:true});
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'lineInputL4','Select List Recover Input 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'textAreaL4','Select List Recover Text area 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordList(0,'2022-10-04','Select List Recover Date 1');
        execution.actionsAndAssertionsOfTCP42195RecoverRecordListDateTime(0,'2022-11-04','Select List Recover Date Time 1');
        cy.xpath('//div[@class="modal fade show"]//footer//button[@class="btn btn-primary"]').click();
        cy.get('button[aria-label="New Submit"]').click();
    });
});