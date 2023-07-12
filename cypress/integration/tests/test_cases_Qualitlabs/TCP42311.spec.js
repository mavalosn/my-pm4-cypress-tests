import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData2311 from "../../../fixtures/test_data/TCP42311.json";




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
    cy.clearCookies();
    cy.clearLocalStorage();
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

  it('TCP4 - 2311', () => {
    var name = "QA-Process-" + new Date().getTime();
    // var name = "QA-Process-1652679528218";
    var timeStamp = new Date().getTime();
    // var timeStamp = 1652679261490;
    var description = "Created for testing purpose";
    var form_Screen = timeStamp + testData2311.screens[0].name;
    var display_Screen = timeStamp + testData2311.screens[1].name;
    var seletListName = "2";
    var exitConditionName = "form_input_1";
    var loopMode = "Loop";

    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData2311.screens.length; i++) {
      screens.addScreen(testData2311.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    navHelper.navigateToProcessPage();
    process.createProcess(name, description);
    cy.wait(5000); // Will remove later

    process.dragEvent('start', 400, 500);
    process.getId('start').then(start_event_id => {

      process.dragEvent('task', 600, 500);
      process.getId('task').then(task_event_id => {

        process.dragEvent('pdf generator', 800, 500);
        process.getId('pdf generator').then(pdf_event_id => {

          process.dragEvent('task', 1100, 500);
          process.changeToManualTask();
          process.getId("task").then(manualtask_event_id => {

            process.dragEvent('end', 1400, 500);
            process.getId("end").then(end_event_id => {

              process.connectToEvents(start_event_id, task_event_id);
              process.connectToEvents(task_event_id, pdf_event_id);
              process.connectToEvents(pdf_event_id, manualtask_event_id);
              process.connectToEvents(manualtask_event_id, end_event_id);

              process.addScreenToFormTask(task_event_id, form_Screen);
              process.addDisplayScreenToPDFGenrator(pdf_event_id, display_Screen);
              cy.get(':nth-child(2) > .pl-3 > :nth-child(1)').type('TESTCASE');
              process.addLoopActivity(loopMode, seletListName, exitConditionName);
              process.addScreenToFormTask(manualtask_event_id, display_Screen);
              // process.
            })
          })
        })
      })
    })
    process.saveTheProcess(name);
    header.clickOnAddRequest();
    header.searchWithProcessName(name);
    header.clickOnStart(name);
    cy.url().then(url => {
      request.clickOnTaskName(1, 1);
      var requestId = url.split('/')[4].trim();
      specific.actionsAndAssertionsOfTCP42311(requestId, name, form_Screen, display_Screen);
    })
  })
})