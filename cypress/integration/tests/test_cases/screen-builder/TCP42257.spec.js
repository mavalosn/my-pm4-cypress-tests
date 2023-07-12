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

    const getIframeDocument = () => {
        return cy
            .get('iframe[title="Rich Text Area. Press ALT-0 for help."]')
            .its("0.contentDocument")
            .should("exist");
    };

    const getIframeBody = () => {
        return getIframeDocument()
            .its("body")
            .should("not.be.undefined")
            .then(cy.wrap);
    };

    it("TCP4 - 2257: Verify text area control", () => {
        let processName = "TCP4 - 2257 Verify text area control";
        let filePath = "processes/TCP4 - 2257 Verify text area control.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);

        //Step 2: Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            var requestId = url.split("/")[4].trim();
            cy.log(requestId);
            execution.clickInFormTask();
            //Step 3:Validations in Text area control
            //In the variable "New Textarea" place a text test text area
            cy.get('[data-cy="screen-field-form_text_area_1"]')
                .should("be.visible").click()
                .type("test text area")
                .should("have.value", "test text area");
            //The variable "Textarea Read Only" must be in read only mode
            cy.get('[aria-label="Textarea Read Only"]')
                .invoke("attr", "readonly")
                .should("eq", "readonly");
            //The variable "Textarea Place Holder" must have the text PlaceHOLDER
            cy.get('[aria-label="Textarea Place Holder"]')
                .invoke("attr", "placeholder")
                .should("eq", "PlaceHOLDER Text Area");
            //The variable "Textarea Helper Text" must have helper text below the control
            cy.xpath(
                '//label[text()="Textarea Helper Text"]/parent::div//small'
            ).should("contain", "Helper Text");
            //The variable "Textarea Rich Text" must be of the type rich text, place text area rich text
            getIframeBody().find("p").should("exist").click().type("rich text");
            //The variable "Textarea Default Value" must have the text Default Value
            cy.get('[aria-label="Textarea Default Value"]').should(
                "have.value",
                "Default Value"
            );
            //text area that has the Visibility Rule option
            cy.xpath('//label[text()="Textarea Visibility Rule"]')
                .parent()
                .parent()
                .invoke("attr", "style")
                .should("eq", "display: none;");
            //"Textarea aria label" place text area aria label
            cy.xpath('//label[text()="Textarea aria label"]').should("contain",
                "Textarea aria label"
            );
            cy.get('textarea[aria-label="aria label"]').click();
            //Press the TAB key
            cy.focused().tab();
            //Textarea Background Color and text Color, place the word test
            cy.focused()
                .invoke("attr", "bgcolor")
                .should("eq", "alert alert-success");
            cy.focused().type("test"); 
            //First submmit
            cy.get('button[aria-label="New Submit"]').click();
            //open request by ID
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
            //Second submmit
            cy.get('button[aria-label="New Submit"]').click();
            //task completed
            cy.get(
                '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
            ).should("be.visible");
        });
    });

});
