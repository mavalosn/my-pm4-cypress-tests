import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import {Execution} from "../../../pages/execution";
import { Process } from "../../../pages/process";

const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    });
    
    it("TC- 53923 : TC-53923 Process Signature Calcs", () => {
        var processName = 'TC-53923 Process Signature Calcs';
        var filePath = 'processes/TC-53923 Process Signature Calcs.json';
        //Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            var taskName = 'Form Task 1';
            request.openTaskByTaskName(taskName);
            //complete form
            execution.reviewformTC53923(requestId);
        });
        cy.wait(3000);
        //View form completed Task 1
        cy.reload();
        cy.get('[id="forms-tab"]').click();
        cy.get('[title="Details"]').first().should('be.visible').click();
        cy.get('[class="card-body h-100"]').should('be.visible');
        //verify signatures in the form tab for the Task 1
        cy.xpath('//div[@name="array1"]//div[@data-cy="screen-field-sig"]//div[@class="signature pl-0"]').should('have.length', 5);
        //Verify signatures in the form tab > record list for the Task 1
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').should('have.length', 2);
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').eq(0).should('have.attr', 'src').and('contains','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+4');
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').eq(1).should('have.attr', 'src').and('contains','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+4');
        //View form completed Task 2
        cy.reload();
        cy.get('[id="forms-tab"]').click();
        cy.get('[title="Details"]').eq(1).should('be.visible').click();
        cy.get('[class="card-body h-100"]').should('be.visible');
        //verify signatures in the form tab for the Task 2
        cy.xpath('//div[@name="array1"]//div[@data-cy="screen-field-sig"]//div[@class="signature pl-0"]').should('have.length', 5);
        //Verify signatures in the form tab > record list for the Task 2
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').should('have.length', 3);
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').eq(0).should('have.attr', 'src').and('contains','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+4');
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').eq(1).should('have.attr', 'src').and('contains','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+4');
        cy.xpath('//div[@data-cy="screen-field-form_record_list_1"]/table/tbody/tr/td/img').eq(2).should('have.attr', 'src').and('contains','data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+4');

        cy.wait(3000);
        cy.contains('Admin User has completed the task Form Task 1').scrollIntoView();
        cy.xpath('//div[@class="px-4 mb-2 timeline"]//div/strong/parent::div').eq(0).should('have.contain','Admin User has completed the task Form Task 1');
        cy.xpath('//div[@class="px-4 mb-2 timeline"]//div/strong/parent::div').eq(1).should('have.contain','Admin User has completed the task Form Task 2');
        
    });
});