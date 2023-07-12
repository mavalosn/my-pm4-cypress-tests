import { Login } from "../../pages/login";
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors } from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";
import { Scripts } from "../../pages/scripts";
import testData from "../../../fixtures/test_data/TCP4-2422.json";

import EnvData from "../../../../cypress.json";

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

  it('TCP4 - 2422', () => {
    var name = "QA-Process-" + new Date().getTime();
    var timeStamp = new Date().getTime();
    var description = "Created for testing purpose";
    var form_screen_1 = timeStamp + testData.screens[0].name;

    // Create screens
    navHelper.navigateToScreensPage();
    for (var i = 0; i < testData.screens.length; i++) {
      screens.addScreen(testData.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }

    screens.searchForAScreen(form_screen_1);
    screens.clickOnEditScreen(form_screen_1);
    screens.addInternalScreen(testData.internalScreen, timeStamp);
    screens.addPageToRecordList(testData.internalScreen.name + timeStamp, 1);

    // Creating Process
    navHelper.navigateToProcessPage();
    process.createProcess(name, description);

    process.dragEvent('start', 400, 200);
    process.getId("start").then(start_event_id => {

      process.dragEvent('task', 750, 200);
      process.getId("task").then(task_event_id_1 => {

        process.dragEvent('task', 1000, 200);
        process.getId("task").then(task_event_id_2 => {

          process.dragEvent('end', 800, 350);
          process.getId("end").then(end_event_id => {

            process.connectToEvents(start_event_id, task_event_id_1);
            process.connectToEvents(task_event_id_1, task_event_id_2);
            process.connectToEvents(task_event_id_2, end_event_id);

            process.addScreenToFormTask(task_event_id_1, form_screen_1);
            process.addScreenToFormTask(task_event_id_2, form_screen_1);
            process.saveTheProcess(name);


            // Create request
            header.clickOnAddRequest();
            header.searchWithProcessName(name);
            header.clickOnStart(name);
            cy.url().then(url => {
              var requestId = url.split('/')[4].trim();
              request.clickOnTaskName(1, 1);
              specific.actionsAndAssertionsOfTCP42422(requestId);
            })
          })
        })
      })
    })
  })

})
