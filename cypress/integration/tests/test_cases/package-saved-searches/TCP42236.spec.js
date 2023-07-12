import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { SaveSearchs } from "../../../pages/saveSearch";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const saveSearch = new SaveSearchs();
const headers = new Header();
const requests = new Requests();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        Cypress.session.clearAllSavedSessions();
        login.navigateToUrl();
        login.login();
    });
    
    var processName = "TCP4-2236 Verify the generation of reports using custom columns on saved searchs";
    var filePath = "processes/TCP4-2236 Verify the generation of reports using custom columns on saved searchs.json";
    var timeStamp = new Date().getTime();
    var nameSaveSearch = "TCP4-2236-" + timeStamp;
    it("Import Process", () => {
        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"TCP4-2236 Verify the generation of reports using custom columns on saved searchs",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Edit Data
          {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
        ];  
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList);
    });
    
    it("TCP4-2236 Verify the generation of reports using custom columns on saved searchs Part 1", () => {       
        execution.actionsAndAssertionsOfTCP42236(processName);
    });

    it("TCP4-2236 Verify the generation of reports using custom columns on saved searchs Part 2", () => {       
        execution.actionsAndAssertionsOfTCP42236(processName);
    });

    it("TCP4-2236 Verify the generation of reports using custom columns on saved searchs Part 3", () => {       
        execution.actionsAndAssertionsOfTCP42236(processName);
    });
    it("Create a Saved Search and update Columns", () => {
        //Creating the Saved Search
        navHelper.navigateToRequestsPage();
        requests.addRequestNameToSelectList(processName);
        saveSearch.createSaveSearch(nameSaveSearch,'trophy');
        //Update columns for the save search
        navHelper.navigateToSavedSearchs();
        cy.xpath("//input[@placeholder='Search']").should('be.visible');3
        cy.xpath("//input[@placeholder='Search']").first().click().type(nameSaveSearch).should("have.value",nameSaveSearch);
        saveSearch.waitForSaveSearch(nameSaveSearch);
        saveSearch.pressOptionSaveSearch('configure');
        cy.xpath('//div[@id="nav-tab"]/a[@id="nav-columns-tab"]').click();
        //Delete active columns by clicking on the X button
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(5).should('be.visible');
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(5).click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(4).should('be.visible');
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(4).click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(3).should('be.visible');
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(3).click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(2).should('be.visible');
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(2).click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(1).should('be.visible');
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(1).click();
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(0).should('be.visible');
        cy.xpath('//div[@class="border bg-muted px-3 draggable-list draggable-current"]//div/a/i[@class="fa fa-times fa-fw"]').eq(0).click();
        //Column Status in Saved Search
        cy.xpath('//div/span/i').click();
        cy.xpath('//legend[text()="Label"]/parent::fieldset/div/input[@type="text"]').type('Verification Status');
        cy.xpath('//legend[text()="Field"]/parent::fieldset/div/input[@type="text"]').type('data.status');
        cy.xpath('//footer/div/button[contains(text(),"Save")]').click();
        //Column First Name in Saved Search
        cy.xpath('//div/span/i').click();
        cy.xpath('//legend[text()="Label"]/parent::fieldset/div/input[@type="text"]').type('First Name');
        cy.xpath('//legend[text()="Field"]/parent::fieldset/div/input[@type="text"]').type('data.firstName');
        cy.xpath('//footer/div/button[contains(text(),"Save")]').click();
        //Column Last Name in Saved Search
        cy.xpath('//div/span/i').click();
        cy.xpath('//legend[text()="Label"]/parent::fieldset/div/input[@type="text"]').type('Last Name');
        cy.xpath('//legend[text()="Field"]/parent::fieldset/div/input[@type="text"]').type('data.lastName');
        cy.xpath('//footer/div/button[contains(text(),"Save")]').click();
        //Column Link in Saved Search
        cy.xpath('//div/span/i').click();
        cy.xpath('//legend[text()="Label"]/parent::fieldset/div/input[@type="text"]').type('Link ');
        cy.xpath('//legend[text()="Field"]/parent::fieldset/div/input[@type="text"]').type('data.verification.URL');
        cy.xpath('//footer/div/button[contains(text(),"Save")]').click();
        //save saveSearch with new configurations
        cy.xpath('//div[@id="nav-columns"]//button[text()="Save"]').click();
        cy.xpath('//div[@class="alert-wrapper"]//div[text()="The search was saved."]').should('be.visible');
    });      

    it('Verify new columns for the Save Search created',()=>{
        navHelper.navigateToSavedSearchs();
        cy.xpath("//input[@placeholder='Search']").should('be.visible');
        cy.xpath("//input[@placeholder='Search']").first().click().type(nameSaveSearch).should("have.value",nameSaveSearch);
        saveSearch.waitForSaveSearch(nameSaveSearch);
        saveSearch.pressOptionSaveSearch('view');
        cy.xpath('//div[@class="card card-body table-card"]//thead//th[@id="_data.verification.URL"]').should('have.text', 'Link');
        cy.xpath('//div[@class="card card-body table-card"]//thead//th[@id="_data.status"]').should('have.text', 'Verification Status');
        cy.xpath('//div[@class="card card-body table-card"]//thead//th[@id="_data.firstName"]').should('have.text', 'First Name');
        cy.xpath('//div[@class="card card-body table-card"]//thead//th[@id="_data.lastName"]').should('have.text', 'Last Name');
    });

    it('Sent email with information about Save Search and delete the saveSearch',()=>{
        navHelper.navigateToSavedSearchs();
        cy.xpath("//input[@placeholder='Search']").should('be.visible');
        cy.xpath("//input[@placeholder='Search']").first().click().type(nameSaveSearch).should("have.value",nameSaveSearch);
        saveSearch.waitForSaveSearch(nameSaveSearch);
        saveSearch.pressOptionSaveSearch('view');
        cy.xpath('//button[@title="Send Report"]').click();
        //Sending the Email Report of Saved Search
        cy.xpath('//input[@id="sendTo"]').type('tcp42236@endtest-mail.io');
        cy.xpath('//input[@id="emailSubject"]').type(nameSaveSearch);
        cy.xpath('//textarea[@id="emailBody"]').type(nameSaveSearch);
        cy.xpath('//button[@class="btn btn-secondary ml-2"]').click();

        //delete saveSearcg
        navHelper.navigateToSavedSearchs();
        cy.xpath("//input[@placeholder='Search']").should('be.visible');
        cy.xpath("//input[@placeholder='Search']").first().click().type(nameSaveSearch).should("have.value",nameSaveSearch);
        saveSearch.waitForSaveSearch(nameSaveSearch);
        saveSearch.pressOptionSaveSearch('delete');
        cy.xpath('//button[text()="Confirm"]').should('be.visible').click();
    });
    
    it('verify email',() => {
        cy.wait(2000);
        navHelper.navigateToLogOut();
        const sentArgs = { searchName: nameSaveSearch};
        cy.origin('https://endtest.io', { args: sentArgs }, ({ searchName }) => {
            cy.visit('https://app.endtest.io/mailbox?email=tcp42236@endtest-mail.io');
            cy.get("div[class='email_list'] > div > div[class='email_from']").eq(0).should('have.text','Admin User');
            cy.get("div[class='email_list'] > div > div[class='email_subject']").eq(0).should('have.text',searchName);
            cy.get("div[class='email_list'] > div[class='email_item']").eq(0).click();
            cy.get("div[class='email-body center-block']").eq(0).should('have.contain',searchName);

            cy.visit('https://app.endtest.io/mailbox?email=tcp42236@endtest-mail.io&action=delete');
            cy.get('body').should('have.text','Deleted all emails sent to tcp42236@endtest-mail.io');
        });
    });

    afterEach(()=>{
        navHelper.navigateToLogOut();
    });
});