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
    let processName = "TCP4-2170 Data verification process with Vocabularies and Calcs";
    let filePath = "processes/TCP4-2170 Data verification process with Vocabularies and Calcs.json";
    let filePath1 = "images/image1.jpg";

    it("TCP4-2170 Data verification process with Vocabularies and Calcs", () => {
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
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Validation 1
            execution.actionsAndAssertionsLineInputTCP42170('Name', 'Maria');
            execution.actionsAndAssertionsLineInputTCP42170('Last Name', 'Perez');
            execution.actionsAndAssertionsLineInputTCP42170('Age', '20');
            cy.xpath('//label[text()="Date of birth"]/parent::div//input').type('2000-10-01').type('{enter}');
            execution.actionsAndAssertionsLineInputTCP42170('Cellphone', '12345678');
            execution.actionsAndAssertionsLineInputTCP42170('Phone', '1234567');
            cy.get('.signature > canvas').click();
            cy.get('button[aria-label="New Submit"]').click();
            //Validation 2
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            cy.get('[data-cy="file-upload-button"]').attachFile(filePath1);
            cy.get('.uploader-file-status').should('contain','success');
            cy.get('button[aria-label="New Submit"]').click();
            //Validation 3
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            execution.actionsAndAssertionsSelectProduct();
            cy.get('input[name="amount"]').type('3');
            cy.get('button[aria-label="New Submit"]').click();
            cy.xpath('//tbody//tr[7]').should('contain','total').and('contain','600');
        });
    });

});