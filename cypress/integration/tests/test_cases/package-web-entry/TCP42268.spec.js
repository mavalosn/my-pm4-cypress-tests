import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it('TCP4-2268 Verify line input validations on a nested screen from web entry',() =>{

       //verify process imported
        var processName = "TCP4-2268 Verify line input validations on a nested screen from web entry";
        var processPath = "processes/TCP4-2268 Verify line input validations on a nested screen from web entry.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);
        //Web Entry
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        cy.url().should('match', /login/)
        //Web entry Login authenticated with the user created
        var username = "admin";
        var password = "admin";
        login.loginWEAuthenticated(username,password);
        //Complete Web Entry and review task form 
        execution.CompleteFormTCP42268(processName);
    });   
});