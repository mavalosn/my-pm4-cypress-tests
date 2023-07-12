import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";
import {Execution} from "../../../pages/execution";
import { Process } from "../../../pages/process";
const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const tasks = new Tasks();
const process = new Process();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });
    
    it("TCP4 - 2314 : Process screen record list line input", () => {
        var processName = 'Process screen record list line';
        var filePath = 'processes/TCP4-2314 Process screen record list line.json';
        var taskName = 'Form Task';
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        //Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.openTaskByTaskName(taskName);
        //complete RecordList 1
        var inputone = 'test1';
        var inputtwo = 'test2';
        var inputthree = 'test3';
        execution.actionsTCP4_2314(inputone, inputtwo,inputthree);
        //complete RecordList 2
        inputone = 'case1';
        inputtwo = 'case2';
        inputthree = 'case3';
        execution.actionsTCP4_2314(inputone, inputtwo,inputthree);
        //complete RecordList 3
        inputone = 'TestCase1';
        inputtwo = 'TestCase2';
        inputthree = 'TestCase3';
        execution.actionsTCP4_2314(inputone, inputtwo,inputthree);
        //complete RecordList 4
        inputone = 'example1';
        inputtwo = 'example2';
        inputthree = 'example3';
        execution.actionsTCP4_2314(inputone, inputtwo,inputthree);
        //other actions columns, edit and save recordlist
        var inputoneedit = 'EDIT';
        execution.otherActionsAndSubmitTCP4_2314(inputoneedit);
    });
});