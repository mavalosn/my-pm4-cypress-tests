import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const admin = new Admin();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it('TCP4-2250 Verify parallel exclusive gateway and different validations on the screen',() =>{
        const username = 'UserTCP42250';
        const jobTitle = 'QA';
        const status = "Active";
        const email = "email+" + username+ "@gmail.com";
        const password = "Colosa123";
        var processName = "TCP4-2250 Verify parallel exclusive gateway and different validations on the screen";
        var processPath = "processes/TCP4-2250 Verify parallel exclusive gateway and different validations on the screen.json";

        navHelper.navigateToAdminPage();
        admin.createUserIfNotExist(
            username,
            username,
            username,
            jobTitle,
            status,
            email,
            password
        );
        //Step1: Import the process

        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);

        let permissionObject = {type:"User", user:username, firstName:username, lastName:username};
        process.verifyConfigOfStartEventAndConfig("startEvent1", permissionObject);
        process.saveProcessWithoutVersion();

        //Step1: Log put
        navHelper.navigateToLogOut();

        //Step1: Log in with the user created
        login.navigateToUrl();
        login.login(username,password);

        //Step1: Change language
        login.changeLanguageToEnglishAndDateType();
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            var taskName = 'Form Task 1';
            request.clickOnTaskName(1, 1);
            execution.actionsAndAssertionsOfTCP42250(requestId);
        });
    });   
});