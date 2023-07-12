import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Scripts } from "../../pages/scripts";
import testData2077 from "../../../fixtures/test_data/TCP4-2296.json";


const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const scripts = new Scripts();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2296: Verify Multiple File Upload', () => {
        let name = "QA-Process-" + new Date().getTime();
        let timeStamp = new Date().getTime();
        let description = "Created for testing purpose";
        let form_screen_1 = timeStamp + testData2077.screens[0].name;
        let form_screen_2 = timeStamp + testData2077.screens[1].name;
        let form_screen_3 = timeStamp + testData2077.screens[2].name;

        let vacabName = timeStamp + "TC-2296";

        navHelper.navigateToVocabularies();
        process.createVocabularies(vacabName, description);
        cy.wait(2000);
        cy.xpath('//i[@class="fas fa-plus ml-3"]').click();
        cy.xpath('(//input[@aria-label="Name"])[2]').clear();
        cy.xpath('(//input[@aria-label="Name"])[2]').type('fileUpload');
        cy.xpath('(//select[@aria-label="Type"])[2]').select('integer');
        cy.xpath('(//input[@aria-label="Property Length"])[1]').type('30');
        cy.xpath('//button[text()="Save"]').click();

        navHelper.navigateToScreensPage();
        for (var i = 0; i < testData2077.screens.length; i++) {
            screens.addScreen(testData2077.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 550, 200);
            process.getId("task").then(task_event_id_1 => {
                process.changetaskname("AA");

                process.dragEvent('task', 750, 200);
                process.getId("task").then(task_event_id_2 => {
                    process.changetaskname("BB");
                    process.addvacabulary(vacabName);

                    process.dragEvent('end', 900, 200);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, task_event_id_2);
                        process.connectToEvents(task_event_id_2, end_event_id);

                        process.addScreenToFormTask(task_event_id_1, form_screen_1);
                        process.addScreenToFormTask(task_event_id_2, form_screen_3);
                        process.addassignmentRules(task_event_id_1, 'admin');
                        process.addassignmentRules(task_event_id_2, 'admin');
                    });
                });
            });
        });
        process.saveTheProcess(name);

        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42296(requestId);
        });
    });

});