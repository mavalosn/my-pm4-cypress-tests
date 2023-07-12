import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution"
import { Header } from "../../../pages/header";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const header = new Header();
const execution = new Execution();

describe("TCP4 - 2414 Verify WE with authenticated users and timer events", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    });

    var processName = "TCP4-2414 Verify Web Entry with timers";
    var processFilePath = "processes/TCP4-2414 Verify Web Entry with timers.json";
    var username = "userWE_TCP42414";
    var firstName = "firstNameQA_TCP42414";
    var lastName = "lastNameQA_TCP42414";
    var jobTitle = "QA";
    var status = "Active";
    var email = "testqa+we@gmail.com";
    var password = "Colosa123";
    it('import process and setup',() => {
        execution.importAndSetup2414(username,password, firstName, lastName,jobTitle,status,email,processName,processFilePath);

    });

    it ('Scenario 1 TCP4-2414',() =>{
        //Step 2: Open the process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);

        //Step 3: Open the Web Entry
        process.goToWebEntry();
        cy.url().should('match', /login/)

        //Step 4: We entry Login authenticated with the user created
        login.loginWEAuthenticated(username,password);

        //Step 5: Verify that the first scenario
        execution.scenario1OfTCP42414();


    });

    it ('Scenario 2 TCP4-2414',() =>{
        //Step 2: Open the process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //Step 3: Open the Web Entry
        process.goToWebEntry();

        cy.url().should('match', /login/)

        //Step 4: We entry Login authenticated with the user created
        login.loginWEAuthenticated(username,password);

        //Step 5: Verify that the first scenario
        execution.scenario2OfTCP42414();

    });

    afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        navHelper.navigateToLogOut();
    })
});