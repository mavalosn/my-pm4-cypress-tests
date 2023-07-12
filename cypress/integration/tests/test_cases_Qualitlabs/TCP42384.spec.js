import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData2384 from "../../../fixtures/test_data/TCP42384.json";

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
    });

    it('TCP4 - 2384: Check validations in conversational form', () => {
        let name = "QA-Process-" + new Date().getTime();
        let description = "Created for testing purpose";
        //var form_screen_1 = timeStamp + testData2384.screens[0].name;
        let form_screen_1 = "2384ConversationalScreen";

        //Step 1: mport screen
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(form_screen_1, "screens_data/2384ConversationalScreen.json");
        navHelper.navigateToScreensPage();

        //Step 2: Creating Process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {
          process.dragEvent('task', 550, 200);
          process.getId("task").then(task_event_id_1 => {
            process.addScreenToFormTask(task_event_id_1, form_screen_1);
            process.dragEvent('Gateway', 750, 200);
            process.changeToParallelGateway();
            process.getId("Gateway").then(gateway_event_id_1 => {
              process.dragEvent('task', 900, 100);
              process.changetaskname("Form Task 1")
              process.getId("task").then(task_event_id_2 => {
                process.addScreenToFormTask(task_event_id_2, form_screen_1);
                process.dragEvent('task', 900, 200);
                process.changetaskname("Form Task 2");
                process.getId("task").then(task_event_id_3 => {
                  process.addScreenToFormTask(task_event_id_3, form_screen_1);
                  process.dragEvent('task', 900, 350);
                  process.changetaskname("Form Task 3");
                  process.getId("task").then(task_event_id_4 => {
                    process.addScreenToFormTask(task_event_id_4, form_screen_1);
                    process.dragEvent('end', 1100, 200);
                    process.getId("end").then(end_event_id => {

                      process.connectToEvents(start_event_id, task_event_id_1);
                      process.connectToEvents(task_event_id_1, gateway_event_id_1);
                      process.connectToEvents(gateway_event_id_1, task_event_id_2);
                      process.connectToEvents(gateway_event_id_1, task_event_id_3);
                      process.connectToEvents(gateway_event_id_1, task_event_id_4);
                      process.connectToEvents(task_event_id_2, end_event_id);
                      process.connectToEvents(task_event_id_3, end_event_id);
                      process.connectToEvents(task_event_id_4, end_event_id);
                    });
                  });
                });
              });
            });
          });
        });
        process.saveTheProcess(name);

        //Step 3: Create request
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
          request.clickOnTaskName(1, 1);
          var requestId = url.split('/')[4].trim();
          specific.actionsAndAssertionsOfTCP42384(requestId);

        });
    });

});


