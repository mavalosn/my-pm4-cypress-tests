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

    it('TCP4-2169 Process for Signature and Watchers verification',() =>{

        //verify process imported
        let processName = "TCP4-2169 Process for Signature and Watchers verification";
        let processPath = "processes/TCP4-2169 Process for Signature and Watchers verification.json";
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Script
            {elemName: "Script", label:"Script M F",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,processPath,parameterList);

        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            var taskName = 'Registration';
            request.openTaskByTaskName(taskName);
            execution.actionsAndAssertionsOfTCP42169(requestId);
        });
    });   
});