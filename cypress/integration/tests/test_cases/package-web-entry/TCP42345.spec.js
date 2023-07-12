import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";
import {Execution} from "../../../pages/execution";
import { Process } from "../../../pages/process";
import requests from "../../../selectors/requests";
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
    
    it("TCP4 - 2345 : Verify the operation of interstitial with a web entry task", () => {
        var processName = "Verify the operation of interstitial with a web entry task";
        var filePath = "processes/TCP4-2345  Verify the operation of interstitial with a web entry task.json";
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        //Open Process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //complete Task
        var example = 'this is only a automated test';
        execution.actionsTCP42345();
    });
});