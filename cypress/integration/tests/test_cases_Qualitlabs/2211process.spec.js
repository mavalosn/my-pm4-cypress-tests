import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { NavigationHelper } from "../../helpers/navigationHelper";
const faker = require('faker');

const login = new Login();
const process = new Process();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const navigationHelper = new NavigationHelper();

describe("ProcessMaker Test Cases", () => {

    before(()=>{
        login.navigateToUrl();
        login.login();
    });

    it.only('TCP4 - 2211: Verify Watcher and Nested Screen', () =>{

        let processName = "TCP4-2211 Verify Watcher and Nested Screen";
        let filePath = "processes/TCP4-2211 Verify Watcher and Nested Screen.json";

        //Step 1: Import the process and config
        navigationHelper.navigateToProcessPage();
        let parameterList = [
            //To Script
            {elemName: "Script", label:"Verification Watcher and Nested Screen A",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"Verification Watcher and Nested Screen Second",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);

        //Step 2: Execute the process
        navigationHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42211(requestId);
        });
    });

});