import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP4-2192.json";
//import selectors from "../selectors/process";
const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it.only('TCP4 - 2192', () => {
    var name = "QA-Process-" + new Date().getTime();
    var timeStamp = new Date().getTime();
    var coverstaion_screen1 = timeStamp + testData.screens[0].name;
    var description = "Created for testing purpose";
    var coverstaion_screen2 = timeStamp + testData.screens[1].name;
    var coverstaion_screen3 = timeStamp + testData.screens[2].name;

    var processName = "Process PDF Generated Nested screen";
    var filePath = "processes/TCP4-2192.json";

    navHelper.navigateToProcessPage();
    process.verifyPresenceOfProcessAndImportProcess(processName, filePath);

    //  navHelper.navigateToScreensPage();
    //   for(var i=0; i<testData.screens.length;i++){
    //     screens.addScreen(testData.screens[i], timeStamp);
    //     navHelper.navigateToScreensPage();
    //   }

    //   navHelper.navigateToProcessPage();
    //   process.createProcess(name, description);

    //   process.dragEvent('start', 400, 200);
    //   const start_event_id = await process.getId("start");

    //   process.dragEvent('task', 500, 200);
    //   const task_event_id = await process.getId("task");

    //   process.dragEvent('pdf generator', 650, 400);
    //   const pdf_event_id = await process.getId("pdf generator");

    //   process.dragEvent('end', 500, 550);
    //   const end_event_id = await process.getId("end");

    //   process.connectToEvents(start_event_id, task_event_id);
    //   process.connectToEvents(task_event_id,  pdf_event_id);
    //   process.connectToEvents(pdf_event_id,  end_event_id);

    //   process.addScreenToFormTask(task_event_id, coverstaion_screen2);
    //   process.addDisplayScreenToPDFGenrator(pdf_event_id,coverstaion_screen3);
    //   process.saveTheProcess(name);

    header.clickOnAddRequest();
    header.searchWithProcessName(processName);
    header.clickOnStart(processName);
    cy.url().then(url => {
      request.clickOnTaskName(1, 1);
      specific.actionsAndAssertionsOfTCP42192(url.split('/')[4].trim(), processName, "testCaseNestedScreen");

    })

  })
})