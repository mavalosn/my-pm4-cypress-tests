import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData2425 from "../../../fixtures/test_data/TCP4-2425.json";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
//const screen = new Screensof2171();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it('TCP4 - 2425: Verify that the data of a record list is shown in the editable record list and display', () => {
        var name = "QA-Process-" + new Date().getTime();
        var description = "Created for testing purpose";
        var timeStamp = new Date().getTime();
        var coverstaion_screen = timeStamp + testData2425.screens[0].name;

        navHelper.navigateToScreensPage();
        for (var i = 0; i < testData2425.screens.length; i++) {
            screens.addScreen(testData2425.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
        // create page
        screens.searchForAScreen(coverstaion_screen);
        screens.clickOnEditScreen(coverstaion_screen);
        screens.addInternalScreen(testData2425.internalScreen, timeStamp);
        screens.addPageToRecordList(testData2425.internalScreen.name + timeStamp, 1);


        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 550, 200);
            process.getId("task").then(task_event_id_1 => {
                process.addScreenToFormTask(task_event_id_1, coverstaion_screen);

                process.dragEvent('task', 850, 200);
                process.getId("task").then(task_event_id_2 => {
                    process.addScreenToFormTask(task_event_id_2, coverstaion_screen);
                    process.dragEvent('end', 1000, 250);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, task_event_id_2);
                        process.connectToEvents(task_event_id_2, end_event_id);

                    });
                });
            });
        });

        process.saveTheProcess(name);

        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            cy.wait(4000);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42425(requestId);
        });
    });

});