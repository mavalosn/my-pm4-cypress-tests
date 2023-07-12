import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Admin } from "../../pages/admin";
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP4-2152.json";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const admin = new Admin();
const screens = new Screens();
describe("ProcessMaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let name;
    let timeStamp;
    it.only('TCP4 - 2152: Designer of the process', () => {
        name = "QA-Process-" + new Date().getTime();
        var description = "Created for testing purpose";
        timeStamp = new Date().getTime();
        var coverstaion_screen = timeStamp + testData.screens[0].name;
        var coverstaion_screen1 = timeStamp + testData.screens[0].name + " Copy";

        navHelper.navigateToScreensPage();
        for (let i = 0; i < testData.screens.length; i++) {
            screens.addScreen(testData.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
        screens.searchForAScreen(coverstaion_screen);
        screens.copyAndSaveTheScreen();
        navHelper.navigateToScreensPage();
        screens.searchForAScreen(coverstaion_screen1);
        screens.clickOnEditScreen(coverstaion_screen1);
        screens.clickOnReadOnlyInLineInput(1);

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 430, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 500, 400);
            process.getId("task").then(task_event_id => {

                process.dragEvent('task', 650, 200);
                process.getId("task").then(task_event_id1 => {

                    process.dragEvent('end', 800, 200);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, task_event_id);
                        process.connectToEvents(task_event_id, task_event_id1);
                        process.connectToEvents(task_event_id1, end_event_id);
                        process.addScreenToFormTask(task_event_id, coverstaion_screen);
                        process.addScreenToFormTask(task_event_id1, coverstaion_screen1);
                    })
                })
            })
        });

        process.saveTheProcess(name);

    });
    it('TCP4 - 2152: Create Request ', function () {
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42152(requestId, name, timeStamp);
        })
    });
});