import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const requests = new Requests();
const execution = new Execution();
const process = new Process();

describe("ProcessMaker Test Case", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2388', () => {
        //Step 1:
        //webentry
        //cy.visit('/webentry/126/node_1');
        var nameProcess = "self";
        navHelper.navigateToProcessPage();
        process.searchForProcess(nameProcess);
        process.goToWebEntry();
        //run case
        execution.actionsAndAssertionsOfTCP42388();
    });
});