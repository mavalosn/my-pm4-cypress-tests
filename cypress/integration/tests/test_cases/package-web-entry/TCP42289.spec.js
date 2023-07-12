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

    it('TCP4-2289 Check visibility rules from the web entry',() =>{

        //verify process imported
        let processName = "TCP4-2289 Check visibility rules from the web entry";
        let processPath = "processes/TCP4-2289 Check visibility rules from the web entry.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);

        //Open Process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);

        //Open the Web Entry
        process.goToWebEntry();

        //Verify the Web Entry
        execution.actionsAndAssertionsOfTCP42289();
    });   
});