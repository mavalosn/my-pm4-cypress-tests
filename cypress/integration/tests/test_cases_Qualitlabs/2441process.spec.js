import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors} from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";
import { Scripts } from "../../pages/scripts";
import testData2441 from "../../../fixtures/test_data/TCP4-2441.json";


import EnvData from "../../../../cypress.json";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const dataconnector = new Dataconnectors();
const admin = new Admin();
const scripts = new Scripts();
describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })
  it('TCP4 - 2441', () => {
    var processName = "TCP4-2441-validation rules";
    var filePath = "processes/TCP4-2441.json";

    navHelper.navigateToProcessPage();
    process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
    header.clickOnAddRequest();
    header.searchWithProcessName(processName);
    header.clickOnStart(processName);
    cy.url().then(url => {
      var requestId = url.split('/')[4].trim();
      request.clickOnTaskName(1, 1);
      specific.actionsAndAssertionsOfTCP42441(requestId);

    })

//    var name = "QA-Process-"+new Date().getTime();
//     var description = "Created for testing purpose";
//     var timeStamp = new Date().getTime();
//     var coverstaion_screen = timeStamp+testData2441.screens[0].name;
     
//     navHelper.navigateToScreensPage();
//     for(var i=0; i<testData2441.screens.length;i++){
//       screens.addScreen(testData2441.screens[i], timeStamp);
//       navHelper.navigateToScreensPage();
//     }

//     navHelper.navigateToProcessPage();
//     process.createProcess(name, description);

//     process.dragEvent('start', 400, 200);
//     const start_event_id = await process.getId("start");

//     process.dragEvent('task', 550, 200);
//     const task_event_id = await process.getId("task");

//     process.dragEvent('end', 1000, 250);
//     const end_event_id = await process.getId("end");

//     process.connectToEvents(start_event_id, task_event_id);
//     process.connectToEvents(task_event_id,  end_event_id);
   
//     process.addScreenToFormTask(task_event_id, coverstaion_screen);
   
   
//     process.saveTheProcess(name);
//     header.clickOnAddRequest();
//     header.searchWithProcessName(name);
//     var requestId = await header.clickOnStart(name);
//     request.clickOnTaskName(1, 1);
//     //cy.wait(4000);
   
//     specific.actionsAndAssertionsOfTCP42441(requestId);
  
   

})
})