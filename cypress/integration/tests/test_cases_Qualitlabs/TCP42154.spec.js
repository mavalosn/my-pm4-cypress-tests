import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Admin } from "../../pages/admin";
import { Signals } from "../../pages/signals"
import 'cypress-file-upload';
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP4-2154.json";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const admin = new Admin();
const screens = new Screens();
const signals = new Signals();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it.only('TCP4 - 2154: Verify Signal End Task properly triggers a different process with Signal Start Event', () => {
        let name1 = "QA-Process-" + new Date().getTime();
        let timeStamp = new Date().getTime();
        let coverstaion_screen = timeStamp + testData.screens[0].name;
        let coverstaion_screen1 = timeStamp + testData.screens[1].name;
        let description = "Created for testing purpose";
        let code = '[{{}"value":"test1","content":"test1"},{{}"value":"test2","content":"test2"}]';
        let signal_name = timeStamp;
        let signal_id = "Id-2154" + timeStamp;
        let userName = "admin";

        //create signal
        navHelper.navigateToSignalPage();
        signals.createSignal(signal_name, signal_id);

        //create screen
        navHelper.navigateToScreensPage();
        for (var i = 0; i < testData.screens.length; i++) {
            screens.addScreen(testData.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
        screens.searchForAScreen(coverstaion_screen);
        screens.clickOnEditScreen(coverstaion_screen);
        screens.AddJSONCodeToSelectList(code, 4);

        //create process
        navHelper.navigateToProcessPage();
        process.createProcess(name1, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 650, 200);
            process.getId("task").then(task_event_id => {

                process.dragEvent('end', 500, 550);
                process.changeToSignalEndEvent();
                process.addSignalToStartEventOrEndEvent(signal_name);
                process.getId("end").then(end_event_id => {

                    process.connectToEvents(start_event_id, task_event_id);
                    process.connectToEvents(task_event_id, end_event_id);

                    process.addScreenToFormTask(task_event_id, coverstaion_screen);
                });
            });
        });
        process.saveTheProcess(name1);

        const name2 = 'QA-process2' + timeStamp;

        navHelper.navigateToProcessPage();
        process.createProcess(name2, description);

        process.dragEvent('start', 400, 200);
        process.changeToSignalStartEvent();
        process.addSignalToStartEventOrEndEvent(signal_name, timeStamp);
        process.getId("start").then(start_event_id1 => {

            process.dragEvent('task', 650, 200);
            process.changeToManualTask();
            process.getId("task").then(manualtask_event_id1 => {
                process.changetaskname("Signal Manual Task")

                process.dragEvent('end', 500, 550);
                process.getId("end").then(end_event_id2 => {

                    process.connectToEvents(start_event_id1, manualtask_event_id1);
                    process.connectToEvents(manualtask_event_id1, end_event_id2);

                    process.addScreenToFormTask(manualtask_event_id1, coverstaion_screen1);
                    process.addassignmentRules(manualtask_event_id1, userName);
                });
            });
        });
        process.saveTheProcess(name2);
        header.clickOnAddRequest();
        header.searchWithProcessName(name1);
        header.clickOnStart(name1);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42154(requestId, name1, name2);
        });
    });

});