import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";
import testData2112 from "../../../fixtures/test_data/TCP42112.json";



//import EnvData from "../../../cypress.json";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const admin = new Admin();
describe("ProcessMaker Test Cases", () => {

  before(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it('TCP4 - 2112',  () => {
    var name = "QA-Process-" + new Date().getTime();
    var timeStamp = new Date().getTime();
    var description = "Created for testing purpose";
    var create_screen = timeStamp + testData2112.screens[0].name;
    var view_screen = timeStamp + testData2112.screens[1].name;
    var form_screen1 = timeStamp + testData2112.screens[2].name;
    var collectionName = timeStamp + "QA-Student";

    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData2112.screens.length; i++) {
      screens.addScreen(testData2112.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    navHelper.navigateToCollectionPage();
    admin.creatACollection(collectionName, description, create_screen, view_screen, create_screen);
    navHelper.navigateToCollectionPage();
    admin.searchForCollection(collectionName);
    admin.enableCollectionSignals();
  
    ///create process

    navHelper.navigateToProcessPage();
    process.createProcess(name, description);

    process.dragEvent('pool', 400, 70);

    process.dragEvent('start', 460, 200);
    process.changeTosignalStartEvent();
    process.getId("start").then(start_event_id =>{

    process.dragEvent('task', 600, 200);
    process.getId("task").then(task_event_id=>{
    process.changetaskname("Self Service");

    process.dragEvent('end', 800, 200);
     process.getId("end").then(end_event_id=>{

    process.connectToEvents(start_event_id, task_event_id);
    process.connectToEvents(task_event_id, end_event_id);

    process.addsignal(start_event_id, collectionName + " create");
    process.addScreenToFormTask(task_event_id, form_screen1);
    process.addassignmentRulesAsSelfService(task_event_id);
     })
    })
  })

    process.saveTheProcess(name);

    //Go to Collection page
    navHelper.navigateToCollectionPage();
    //search for collection
    admin.searchForCollection(collectionName);
    //add  a record
    admin.addingDataToStudentCollection(new Date().toLocaleDateString('en-GB'), "345678", "tester1", "user1", "9573616879");
    //Go to InProgress Requests
    navHelper.navigateToInprogressRequests();
    // cy.wait(30000);
    // cy.reload();
    //Verify Request is created
    cy.xpath("//span[text()='name']".replace('name', name)).should('be.visible');
    //open the request by name
    request.openRequestByName(name);
    cy.url().then(url => {
      request.clickOnTaskName(1, 1);
      var requestId = url.split('/')[4].trim();
      specific.actionsAndAssertionsOfTCP42112(requestId, form_screen1);

    })
  })
})