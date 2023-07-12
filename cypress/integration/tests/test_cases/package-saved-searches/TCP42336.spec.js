import {Login} from "../../../pages/login";
import {SaveSearchs} from "../../../pages/saveSearch";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Admin } from "../../../pages/admin";

const login = new Login();
const saveSearch = new SaveSearchs();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();
const execution = new Execution();
const admin = new Admin();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        cy.origin("https://endtest.io", () => {
            cy.visit(
                "https://app.endtest.io/mailbox.php/email=automation-qaTCP42336@endtest-mail.io&action=delete"
            );
        });
        cy.clearCookies();
        login.navigateToUrl();
        login.login();
    });

    let processName = "TCP4-2336 Verify the sending of saved search to an email";
    let filePath = "processes/TCP4-2336 Verify the sending of saved search to an email.json";
    let timeStamp = new Date().getTime();
    let nameSave = "TCP42336SaveSearch" + timeStamp;
    let iconName = "trophy";

    it('TCP4-2336 Verify the sending of saved search to an email', () => {

        //Step1: Process Import
        navHelper.navigateToProcessPage();
        let parameterList = [
        //Configure Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"}
        ];  
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList);

        //Step2: Make 3 Requests

        //First request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.clickOnTaskName(1, 1);
        execution.actionsAndAssertionsOfTCP42336('maria','16','Course A','2006-10-04');

        //Second request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.clickOnTaskName(1, 1);
        execution.actionsAndAssertionsOfTCP42336('lucas','18','Course B','2004-10-04');

        //Third request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.clickOnTaskName(1, 1);
        execution.actionsAndAssertionsOfTCP42336('martin','20','Course A','2002-10-04');
       
        //Step3: Search All request to "TCP4-2336 Verify the sending of saved search to an email"
        navHelper.navigateToCompletedRequests();
        cy.xpath('//div[@aria-label="Process"]//input').click({force:true});
        cy.xpath('//div[@aria-label="Process"]//input').type(processName).should('have.value',processName);
        cy.xpath('//div[@aria-label="Process"]//div[@class="multiselect__content-wrapper"]//li[1]').eq(0)
        .should('have.attr', 'aria-label')
        .and('equal', processName+". ");
        cy.xpath('//div[@aria-label="Process"]//input').eq(0).type('{enter}');
        cy.xpath('//button[contains(@class,"btn btn-search-run")]').click({force:true});
        cy.get('[class="jumbotron jumbotron-fluid"]').should('be.visible');
        cy.get('[class="jumbotron jumbotron-fluid"]').should('not.be.visible');
        execution.waitUntilcardBodyIsVisible('[class="card-deck-flex"]')
        cy.get("table > tbody > tr")
            .find('td')
            .invoke('text')
            .then(($element) => {
                if($element !== 'No Data Available'){
                    //Create save search
                    saveSearch.createSaveSearch(nameSave,iconName);
                }else{
                    return;
                } });

        //Step4: Search save search
        navHelper.navigateToSavedSearchs();
        cy.xpath("//input[@type='text'][@placeholder='Search']").should('be.visible');
        cy.xpath("//input[@type='text'][@placeholder='Search']").eq(0).click()
        .type(nameSave).should("have.value",nameSave);
        cy.wait(5000);
        cy.get('button[title="Search"]').eq(0).click({force:true});        

        //Step5: Go to configuration of Save search
        cy.get('[title="Configure"]').first().click();
        cy.get('[id="nav-columns-tab"]').click();

        //Delete active columns of save search
        const nameColumnsList = [
            "Name",
            "Status",
            "Participants",
            "Started",
            "Completed"
        ];
        execution.deleteAllActiveColumnsFromSaveSearch(nameColumnsList);
        execution.addCustomColumnTCP42336();

        //Step6: Send report
        var email = "automation-qaTCP42336@endtest-mail.io";
        var subject = "test_save_search_subject";
        var body = "test_save_searh_body";
        navHelper.navigateToSavedSearchs();
        saveSearch.viewSaveSearch(nameSave);
        saveSearch.sendReportSaveSearch(email,subject,body);

        //Verification in Inbox
        cy.origin(
            "https://endtest.io",
            { args: { nameSave} },
            ({ nameSave }) => {
                cy.visit(
                    "https://app.endtest.io/mailbox.php/email=automation-qaTCP42336@endtest-mail.io"
                );
                cy.wait(5000);
                cy.reload();
                cy.get('[class="email_subject"]')
                    .first()
                    .should("be.visible")
                    .click();
                cy.get('[class="email-body-wrapper"]')
                    .should("contain","Sent for saved search "+'"'+nameSave+'".')
                    
            }
        );

    });
});