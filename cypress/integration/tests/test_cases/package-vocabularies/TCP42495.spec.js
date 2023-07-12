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
    let processName = "TCP4-2495 Verify vocabulary by assigning from the modeler with integer type control and validations";
    let processPath = "processes/TCP4-2495 Verify vocabulary by assigning from the modeler with integer type control and validations.json";
    let requestId
    let nameVocabulary='VocabularyTCP4-2495'
    let description='description'

    it("TCP4-2495 Create vocabulary", () => {
        //Step 1: Create vocabulary
        let data = [
        {
            index:1,
            nameProperty:'Integer',
            type:'Integer',
            lenght:'9',
            required:true
        },
        {
            index:2,
            nameProperty:'BetweenMin5Max10',
            type:'Integer',
            lenght:'10',
            required:true
        },
        {
            index:3,
            nameProperty:'In9099',
            type:'Integer',
            lenght:'4',
            required:true
        },
        {
            index:4,
            nameProperty:'NotIn1234',
            type:'Integer',
            lenght:'9',
            required:true
        },
        {
            index:5,
            nameProperty:'IntegerRequired',
            type:'Integer',
            lenght:'9',
            required:true
        },
        {
            index:6,
            nameProperty:'CurrencyBOB',
            type:'Decimal',
            lenght:'5',
            required:true
        },
        {
            index:7,
            nameProperty:'Percentage',
            type:'Integer',
            lenght:'3',
            required:true
        },
        {
            index:8,
            nameProperty:'Decimal',
            type:'Decimal',
            lenght:'9',
            required:true
        },
        ]
       
        //Create Vocabulary
        navHelper.navigateToVocabularies();
        process.verifyPresenceOfVocabulary(nameVocabulary,description,data);

    });
    it("TCP4-2495 Import the process and configure in modeler", () => {
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
    it("TCP4-2495 Fill Form", () => {
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.actionsAndAssertionsTCP42495();
            
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.get('button[aria-label="New Submit"]').click();
            request.verifyRequestisCompleted(requestId);
        });
    });
});