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
    it('TCP4-2278 Verify a line input with validation rules in web entry showing the data in a manual task',() =>{

        //Step 1: Import the process
        let processName = "TCP4-2278 Verify a line input with validation rules in web entry showing the data in a manual task";
        let processPath = "processes/TCP4-2278 Verify a line input with validation rules in web entry showing the data in a manual task.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath);

        //Step 2: Go to WE
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();

        //Step 3: Execute the process
        execution.actionsAndAssertionsOfTCP42278();
    });   
});