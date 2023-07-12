import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const execution = new Execution();
const request = new Requests();

describe("ProcessMaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2067 Check the validation rules of a screen form";
    let filePath = "processes/TCP4-2067 Check the validation rules of a screen form.json";
    let requestId;
    it("TCP4-2067 Import Process", () => {
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
    });
    it("TCP4-2067 Start Request , fill screen and validation rules", () => {
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Actions and assertions
            cy.xpath('//label[text()="Rule=Accepted"]/parent::div//input').check();
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Alpha','123','Accepts only alphabet characters','abcd');
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Alpha-Numeric','..--','Accepts only alphanumerics','abcd123');
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Between Min & Max','2000','Must have a value between 1 and 1000','1000');
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Email','abdc','Must be a valid email address','email@gmail.com');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule=Required1','Field is required','colosa123');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule=Required Unless','Field is required','colosa123');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule1=Date Rule2=After Date','Must be after 03/30/2021.','2021-04-01')
            execution.actionsAndAssertionsInputOfTCP42067('Rule=URL','aaaaa','Must be a valid URL','https://www.orange.es/');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule=In','Invalid value','2');
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Max Length','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeq','Must have at most 1000','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaabbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Min Length','1','Must have at least 2','11');
            execution.actionsAndAssertionsInputOfTCP42067('Rule=Not In','4','Invalid value','1');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule=Regex','Invalid value','123456789');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule=Required If1','Field is required','5');
            execution.actionsAndAssertionsRequiredFieldOfTCP42067('Rule=Same','Must be same as varIn','2');
            execution.actionsAndAssertionsAllSelectList();
            cy.get('button[aria-label="New Submit"]').click();
             //task completed
             cy.get(
                '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
            ).should("be.visible");
            cy.get("#completed-tab").click();
            //Verification "Complete request"
            var p = 5;
            for (var i = 0; i < p; i++) {
                cy.get("h4").then((el) => {
                    var text = el.text();
                    if (text == "Completed") {
                        p = 0;
                    } else {
                        cy.wait(3000);
                        cy.reload();
                    }
                });
            }
            cy.xpath('//h4[text()="Completed"]').should("be.visible");
         });
    });
    
});