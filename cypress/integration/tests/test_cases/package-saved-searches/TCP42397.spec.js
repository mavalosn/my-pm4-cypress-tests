import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";
import {Execution} from "../../../pages/execution";
import { Process } from "../../../pages/process";

const faker = require("faker");

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
 
  it("TCP4 - 2397", () => {
      var processName = "TCP4-2397";
      var filePath = "processes/TCP4-2397.json";

      //Step 1: Import the process
      navHelper.navigateToProcessPage();
      process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

      //Start a request
      navHelper.navigateToRequestsPage();
      header.clickOnAddRequest();
      header.searchWithProcessName('TCP4-2397');
      header.clickOnStart('TCP4-2397');

   // Fill in FormTask
    execution.goToLastTaskAndFillFormTCP4_2397();
   

    //Start a request
    navHelper.navigateToRequestsPage();
    header.clickOnAddRequest();
    header.searchWithProcessName('TCP4-2397');
    header.clickOnStart('TCP4-2397');
    

    //PMQL in To Do option in Tasks
    navHelper.navigateToTasksPage();
    tasks.clickOnToDoButton();

    tasks.searchByPMQL(' (task = "Form Task") ');
    tasks.verifyValueInTable('Form Task');
    tasks.deleteQuery();

    tasks.searchByPMQL('(request = "TCP4-2397")');
    tasks.verifyValueInTable('TCP4-2397');
    tasks.deleteQuery();

    tasks.searchByPMQL(' (status = "In Progress") ');
    tasks.verifyValueInTable('In Progress');
    tasks.deleteQuery();

  // PMQL in Completed option in Tasks
    navHelper.navigateToTasksPage();
    tasks.clickOnCompletedButton();

    tasks.searchByPMQL(' (task = "Form Task") ');
    tasks.verifyValueInTable('Form Task');
    tasks.deleteQuery();

    tasks.searchByPMQL('(request = "TCP4-2397")');
    tasks.verifyValueInTable('TCP4-2397');
    tasks.deleteQuery();

    tasks.searchByPMQL(' (status = "Completed") ');
    tasks.verifyValueInTable('Completed');
    tasks.deleteQuery();
    
  });
 
});
