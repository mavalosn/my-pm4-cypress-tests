import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";

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

  it('TCP4 - 2440', () => {

    var processName = "TCP4-2440-Process visibility nested before date";
    var filePath = "processes/TCP4-2440.json";

    navHelper.navigateToProcessPage();
    process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
    //request part
    header.clickOnAddRequest();
    header.searchWithProcessName(processName);
    header.clickOnStart(processName);
    cy.url().then(url => {
      var requestId = url.split('/')[4].trim();
      request.clickOnTaskName(1, 1);
      specific.actionsAndAssertionsOfTCP42440(requestId, processName);
    })
    // var name = "QA-Process-" + new Date().getTime();
    // var timeStamp = new Date().getTime();
    // var description = "Created for testing purpose";
    // var form_screen_1 = "2440ScreenFreeze11";

    // //Create screen
    // navHelper.navigateToScreensPage();
    // screens.verifyPresenceOfScreenAndImportScreen(form_screen_1, "screens_data/2440ScreenFreeze11.json");
    // navHelper.navigateToScreensPage();

    // // Creating Process
    // navHelper.navigateToProcessPage();
    // process.createProcess(name, description);
    // cy.wait(5000); // Will remove later

    // process.dragEvent('start', 400, 200);
    // const start_event_id = await process.getId("start");

    // process.dragEvent('task', 550, 200);
    // const task_event_id_1 = await process.getId("task");
    // process.addScreenToFormTask(task_event_id_1, form_screen_1);

    // process.dragEvent('end', 700, 350);
    // const end_event_id = await process.getId("end");


    // process.connectToEvents(start_event_id, task_event_id_1);
    // process.connectToEvents(task_event_id_1, end_event_id);

    // // cy.wait(5000);
    // process.saveTheProcess(name);


    // // Create request
    // navHelper.navigateToRequestsPage();
    // header.clickOnAddRequest();
    // header.searchWithProcessName(name);
    // var requestId = await header.clickOnStart(name);
    // request.clickOnTaskName(1, 1);
    // cy.wait(4000);
    // specific.actionsAndAssertionsOfTCP42440(requestId, name);

  })
})
