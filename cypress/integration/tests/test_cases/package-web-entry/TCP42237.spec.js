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
    var processName =
        "TCP4-2237 Verify the image control options from web entry";
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4 - 2237 : Verify the image control options from web entry", () => {
        //Step 1: Import the process
        var filePath =
            "processes/TCP4-2237 Verify the image control options from web entry.json";
        var locatorField1 =
            '[data-cy="screen-field-sig"] > .signature-container > .signature > canvas';
        var locatorField2 =
            '[data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas';
        var locatorField3 =
            ':nth-child(2) > .container-fluid > :nth-child(1) > .page > :nth-child(1) > .row > :nth-child(1) > :nth-child(1) > [data-cy="screen-field-sigLoop"] > .signature-container > .signature > canvas';
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        process.goToWebEntry();
        //Step 2: Check that there are two required fields
        execution.checkNotificationRequiredfield(
            "There are 2 validation errors in your form."
        );

        cy.xpath('//div[@data-cy="screen-field-Selection_043"]/img').should('be.visible');
        cy.xpath('//div[@data-cy="screen-field-Selection_043"]/img').should('have.attr', 'src').and('contains','data:image/png;base64');
        cy.xpath('//div[@data-cy="screen-field-risa2"]/img').should('be.visible');
        cy.xpath('//div[@data-cy="screen-field-risa2"]/img').should('have.attr', 'src').and('contains','data:image/jpeg;base64');
        cy.xpath('//div[@data-cy="screen-field-picahu"]/img').should('be.visible')
        cy.xpath('//div[@data-cy="screen-field-picahu"]/img').should('have.attr', 'src').and('contains','data:image/gif;base64');

        //Step 3: Make the first signature
        execution.signInField(locatorField1);
        //Step 4: Verify that there is only one required field
        execution.checkNotificationRequiredfield(
            "There is a validation error in your form."
        );
        //Step 5: Make the second signature
        execution.signInField(locatorField2);
        //Step 6: Verify that the required fields notification no longer appears.
        execution.verifyNotificationNotAppear();
        //Step 7: Verify that the "+" button exists.
        execution.verifyAddButtonInLoop();
        //Step 8: Make the third signature
        execution.signInField(locatorField3);
        request.clickOnSubmitButton();
        //Step 9: Verify that the page name you enter is correct.
        execution.verifyUrlPage();
    });
    it("Review the request", () => {
        //Step 10: Open the request made and complete the task.
        request.openRequestByName(processName);
        execution.clickInFormTask();
        //Verify images
        cy.xpath('//div[@data-cy="screen-field-Selection_043"]/img').should('be.visible');
        cy.xpath('//div[@data-cy="screen-field-Selection_043"]/img').should('have.attr', 'src').and('contains','data:image/png;base64');
        cy.xpath('//div[@data-cy="screen-field-risa2"]/img').should('be.visible');
        cy.xpath('//div[@data-cy="screen-field-risa2"]/img').should('have.attr', 'src').and('contains','data:image/jpeg;base64');
        cy.xpath('//div[@data-cy="screen-field-picahu"]/img').should('be.visible')
        cy.xpath('//div[@data-cy="screen-field-picahu"]/img').should('have.attr', 'src').and('contains','data:image/gif;base64');
        request.clickOnSubmitButton();
        //verify complete request
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(0).should('have.text','sig');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(1).should('have.contain','data:image/png;base64,iVBORw0KGgoAAAA');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(2).should('have.text','tasks.node_1.meta.ip');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(4).should('have.text','tasks.node_1.meta.referral');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(6).should('have.text','tasks.node_1.meta.timestamp');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(8).should('have.text','tasks.node_1.meta.useragent');

        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(10).should('have.text','loop_1.0.sigLoop');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(11).should('have.contain','data:image/png;base64,iVBORw0KGgoAAAANSUhEU');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(12).should('have.text','loop_1.1.sigLoop');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(13).should('have.contain','data:image/png;base64,iVBORw0KGgoAAAANSUhEU');
        cy.xpath('//div[@class="card border-0"]//table//tbody/tr/td').eq(14).should('have.text','_session_id');
    });
});
