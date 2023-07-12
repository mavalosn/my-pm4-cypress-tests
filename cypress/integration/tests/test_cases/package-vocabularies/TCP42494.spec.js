import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";


const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();
const tasks = new Tasks();

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2494 Verify vocabulary of the array type with a loop that contains all the validations of a text control";
    let processPath = "processes/TCP4-2494 Verify vocabulary of the array type with a loop that contains all the validations of a text control.json";
    let requestId;
    let nameVocabulary='VocabularyTCP42494';
    let description='description';

    it("TCP4-2494 Create vocabulary", () => {
        //Step 1: Create vocabulary
        let data = [
            {
                index:1,
                nameProperty:'loop_1',
                type:'Array',
                lenght:'2',
                required:true
            }
        ];
        navHelper.navigateToVocabularies();
        process.verifyPresenceOfVocabulary(nameVocabulary,description,data);

    });
    it("TCP4-2494 Import the process and configure in modeler", () => {
        //Step 2: Import the process and configure in modeler
        navHelper.navigateToProcessPage();
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
        //Add vocabularies to process
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        const taskXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        //Add vocabulary to FormTask1
        process.verifyPresenceOfVocabularyAssignedInModeler("FormTask1",taskXpath,nameVocabulary);
    });
    it("TCP4-2494 Start a request and Fill Form", () => {
        //Step 3: Start a request and Fill Form
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            //Fill first form and validations
            request.clickOnTaskName(1, 1); 
            execution.actionsAndAssertionsTCP42494(0,
                'yes',
                'alpha',
                'colosa123',
                '2022-10-17',
                'mail@gmail.com',
                'abcdefghij',
                'abcde',
                'test case',
                'required',
                'test',
                'test',
                'https://release.testing.processmaker.net/');
            cy.get('button[title="Add Item"]').click();
            //Fill second form and validations
            execution.actionsAndAssertionsTCP42494(1,
                'yes',
                'alphaa',
                'colosa123',
                '2022-02-24',
                'mail2@gmail.com',
                'abcdefghij',
                'abcde',
                'test case',
                'required2',
                'test',
                'test',
                'https://release.testing.processmaker.net/');
            cy.get('button[title="Add Item"]').click();
            cy.get('button[title="Delete Item"]').click();
            cy.xpath('//footer//button[@class="btn m-0 btn-secondary"]').click();
            cy.get('button[aria-label="New Submit"]').click();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.get('button[title="Add Item"]').click();
            cy.get('button[title="Delete Item"]').click();
            cy.xpath('//footer//button[@class="btn m-0 btn-secondary"]').click();
            cy.get('button[aria-label="New Submit"]').click();
            request.verifyRequestisCompleted(requestId);
        });
    });
});