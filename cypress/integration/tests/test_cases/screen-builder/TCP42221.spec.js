import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();

describe("Processmaker", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4-2221 Verify All validations rules in Loops", () => {
    //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let processName = "TCP4-2221 Verify All validations rules in Loops";
        let processPath =
            "processes/TCP4-2221 Verify All validations rules in Loops.json";
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
        //Step 2: Start Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            request.clickOnTaskName(1, 1);
           let requestId = url.split("/")[4].trim();
            //Step 3: Validations Rules and loops
            execution.actionsAndAssertionsOfTCP42221ValidationsRulesLoops();
            execution.actionsAndAssertionsOfTCP42221addHiddenLoops();
            //Step 4: Validations Rules in Datepickers
            //4.1 After date
            //Fill data in New Date Picker1
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker1",
                "2022-10-04",
                "0"
            );
            //Fill data in New Date Picker2
            execution.actionsAndAssertionsOfTCP42221DatePickerFieldRequired(
                "New Date Picker2",
                "2022-10-05",
                "Must be after form_date_picker_1",
                "0"
            );
            //4.2 Before date
            //Fill data in New Date Picker3
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker3",
                "2022-10-06",
                "0"
            );
            //Fill data in New Date Picker4
            execution.actionsAndAssertionsOfTCP42221DatePickerFieldRequired(
                "New Date Picker4",
                "2022-10-03",
                "Must be before form_date_picker_3",
                "0"
            );
            //4.3 After o equal date Not  Configured (Error)
            //Fill data in New Date Picker5
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker5",
                "2022-10-17",
                "0"
            );
            //Fill data in New Date Picker6
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker6",
                "2022-10-17",
                "0"
            );
            //4.4 Before o equal date
            //Fill data in New Date Picker7
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker7",
                "2022-10-11",
                "0"
            );
            //Fill data in New Date Picker8
            execution.actionsAndAssertionsOfTCP42221DatePickerFieldRequired(
                "New Date Picker8",
                "2022-10-10",
                "Must be equal or before form_date_picker_7",
                "0"
            );
            //Step 5: Validations Rules of Datepickers in Loops
            execution.addLoop(16);
            //5.1 After date
            //Fill data in New Date Picker1 loop
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker1",
                "2022-10-04",
                "1"
            );
            //Fill data in New Date Picker2  loop
            execution.actionsAndAssertionsOfTCP42221DatePickerFieldRequired(
                "New Date Picker2",
                "2022-10-05",
                "Must be after form_date_picker_1",
                "1"
            );
            //5.2 Before date
            //Fill data in New Date Picker3  loop
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker3",
                "2022-10-06",
                "1"
            );
            //Fill data in New Date Picker4 loop
            execution.actionsAndAssertionsOfTCP42221DatePickerFieldRequired(
                "New Date Picker4",
                "2022-10-03",
                "Must be before form_date_picker_3",
                "1"
            );
            //5.3 After o equal date Not  Configured (Error)
            //Fill data in New Date Picker5 loop
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker5",
                "2022-10-17",
                "1"
            );
            //Fill data in New Date Picker6
            execution.actionsAndAssertionsOfTCP42221DatePickerOnlyFill(
                "New Date Picker6",
                "2022-10-17",
                "1"
            );
            execution.actionsAndAssertionsOfTCP42221otherControls();
            //Click on New submit button
            cy.get('button[aria-label="New Submit"]').click();
            //Step:6 open request by ID
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Second submmit
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
