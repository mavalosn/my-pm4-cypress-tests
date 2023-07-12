import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Specific } from "../../../pages/specific";
import { Screens } from "../../../pages/screens";
import { Scripts } from "../../../pages/scripts";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const scripts = new Scripts();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it('TCP4-2385: Verify Textarea Rich Text with encoding inside a loop after a script task', () => {
        let processName = "TCP4-2385 Verify Textarea Rich Text with encoding inside a loop after a script task";
        let filePath = "processes/TCP4-2385 Verify Textarea Rich Text with encoding inside a loop after a script task.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Script
            {elemName: "Script", label:"Sleep",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);

        //Step 2: Execute the process
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42385(requestId);
        });
    });

});