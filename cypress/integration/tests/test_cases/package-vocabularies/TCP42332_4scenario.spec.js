import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";

const request = new Requests();
const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();

describe("TCP4 - 2332 Check a sub-process with the multi-instance parallel configuration and the validation of vocabularies", () => {

    var subProcessName = 'TCP4-2332 For Sub-process';
    var subProcessFilePath = 'processes/TCP4-2332 For Sub-process.json';
    var mainProcessName = 'TCP4-2332 Check a sub-process';
    var mainProcessFilePath = 'processes/TCP4-2332 Check a sub-process qa.json';
    var taskName = 'Form Task'
    
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    })
    
    afterEach(() => {
        navHelper.navigateToLogOut();
    })

    it('Configure Sub-Process and Main Process',() => {  
        navHelper.navigateToProcessPage();
        //import subprocess
        process.verifyPresenceOfProcessAndImportProcess(subProcessName,subProcessFilePath);

        //import process
        let parameterList = [
            //To Start Event 1
            {elemName: "Start Event", label:"StartEvent1",user:"admin",firstName:"Admin", lastName:"User"},
            //To Form Task 2
            {elemName: "SubProcess", label:"formTask2",user:subProcessName,firstName:subProcessName, lastName:""},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //To Cancel Request
            {elemName: "Cancel Request", label:"Cancel Request",user:"admin",firstName:"Admin", lastName:"User"},
            //To Edit Data
            {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(mainProcessName).should('have.value', mainProcessName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');

        cy.xpath('//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if($loadedTable.length === 1){
                    process.importProcess(mainProcessFilePath);
                    process.configProcessImported(parameterList);
                    navHelper.navigateToProcessPage();
                    process.searchForProcess(mainProcessName);
                    let permissionObject = {type:"User", user:"admin", firstName:"Admin", lastName:"User"};
                    process.verifyConfigOfStartEventAndConfig('StartEvent1',permissionObject);
                    cy.wait(2000)
                    cy.get('g[data-type="processmaker.components.nodes.task.Shape"]').first().should('be.visible').click();
                    process.verifyConfigOfSubProcessAndConfig('formTask2',subProcessName,'Start Event')
                    cy.wait(5000)
                    process.saveProcessWithoutVersion();
                }
            });
    });

    it('Four validation', () =>{
        navHelper.navigateToProcessPage();
        process.searchForProcess(subProcessName);
        cy.url().then(url => {
            var subprocess_id = url.split('/')[4].trim();
            navHelper.navigateToProcessPage();
            process.searchForProcess(mainProcessName);    
            cy.url().then(url => {
                var process_id = url.split('/')[4].trim();

                //Step 1: Create a Request
                navHelper.navigateToRequestsPage();
                request.openNewRequest(mainProcessName);
                request.openTaskByTaskName(taskName);  

                //Step 2: Create and Validate a request with 3 subprocess
                execution.actionsAndAssertionsOfTCP42332_4(taskName, process_id, subprocess_id, subProcessName,mainProcessName);
            }); 
        });
    });
});