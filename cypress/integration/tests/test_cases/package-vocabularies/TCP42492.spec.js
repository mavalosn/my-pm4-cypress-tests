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

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2492 Verify text in a process with vocabulary";
    let processPath = "processes/TCP4-2492 Verify text in a process with vocabulary.json";
    let requestId;
    let nameVocabulary='VocabularyTCP42492';
    let description='description';

    it("TCP4-2492 Create vocabulary", () => {
        //Step 1: Create vocabulary
        let data = [
            {
                index:1,
                nameProperty:'Text',
                type:'Text',
                lenght:'30',
                required:true
            },
            {
                index:2,
                nameProperty:'TextRequired',
                type:'Text',
                lenght:'35',
                required:true
            },
            {
                index:3,
                nameProperty:'TextURL',
                type:'Text',
                lenght:'30',
                required:true
            },
            {
                index:4,
                nameProperty:'TextEmail',
                type:'Text',
                lenght:'25',
                required:true
            }
        ];
        navHelper.navigateToVocabularies();
        process.verifyPresenceOfVocabulary(nameVocabulary,description,data);
    });

    it("TCP4-2492 Import the process and configure in modeler", () => {
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
            }
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath,
            parameterList
        );
        //Step 3:Add vocabularies to process
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        const taskXpath = "//*[text()='nameElem']/ancestor::*[@data-type='processmaker.components.nodes.task.Shape']";
        //Add vocabulary to FormTask1
        process.verifyPresenceOfVocabularyAssignedInModeler("FormTask1",taskXpath,nameVocabulary);
    });

    it("TCP4-2492 Start a request and Fill Form", () => {
        //Step 4: Start a request 
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            //Step 5: Fill form and validations
            request.clickOnTaskName(1, 1); 
            execution.actionsAndAssertionsTCP42492();
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.get('button[aria-label="New Submit"]').click();
            cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should("be.visible");
            request.verifyRequestisCompleted(requestId);
        });
    });
});