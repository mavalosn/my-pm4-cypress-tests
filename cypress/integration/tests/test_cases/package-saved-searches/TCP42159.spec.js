import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import { SaveSearchs } from "../../../pages/saveSearch";
const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const saveSearch = new SaveSearchs();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let requestId;
    let processName = "TCP4-2159 Process data Save Search";
    let processPath = "processes/TCP4-2159 Process data Save Search.json";
    let timeStamp = new Date().getTime();
    let nameSaveSearch ="TCP42159" + timeStamp;
    const text='test case';
    const integer='123456789';
    const currency='500';
    const percentage='97';
    const decimal='7.7';
    const datetime='2020-10-10 08:52';
    const date='2020-10-10';
    const password='password';
   
    it("TCP4-2159 Process import and configuration", () => {     

        //Step1: Import the Process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath, parameterList);
    });

    it("TCP4-2159 Start request and fill form", () => {
        //Step2: Fill form
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42159(text,integer,currency,percentage,decimal,datetime,date,password);
        });
    });

    it("TCP4-2159 Create Save Search and configure columns", () => {
        //Step 3: Create Save search
        //Go to all requests
        navHelper.navigateToAllRequests();
        //search the process 
        request.searchProcessInAllRequest('request = "TCP4-2159 Process data Save Search"',processName);
        //create save search
        saveSearch.createSaveSearch(nameSaveSearch,"fire");
        cy.wait(2000);
        //Search save search
        navHelper.navigateToSavedSearchs();
        cy.get('input[aria-label="Search"]').eq(0)
        .should('be.visible')
        .click()
        .type(nameSaveSearch)
        .should("have.value",nameSaveSearch);
        cy.wait(5000);
        cy.get('button[title="Search"]').eq(0).click();        

        //Go to configuration of Save search
        cy.get('[title="Configure"]').first().click({force:true});
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
        execution.addCustomColumnTCP42159();
    });

    it("TCP4-2159 Create chart", () => {
        //Step4:Create chart
        //Search save search
        navHelper.navigateToSavedSearchs(); 
        saveSearch.viewSaveSearch(nameSaveSearch) 
        //create Chart
        const chartname1 = "Chart1-"+timeStamp;
        const chart_type1 = "List";
        saveSearch.clickOnSaveSearchName();
        saveSearch.createChartsToSaveSearch(chartname1,chart_type1);
        cy.contains('button[class="btn btn-secondary ml-3"]','Save').click();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
        //Validations in Chart
        execution.validationDataInChart2159(text,integer,currency,percentage,decimal,datetime,password,date)
    });

});