import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Scripts } from "../../pages/scripts";
import testData2078 from "../../../fixtures/test_data/TCP4-2257.json";


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

    it.only('TCP4 - 2257: Verify text area control', () =>{
        var name = "QA-Process-"+new Date().getTime();
        var timeStamp= new Date().getTime();
        var description = "Created for testing purpose";
        var form_screen = timeStamp+testData2078.screens[0].name;

        navHelper.navigateToScreensPage();
        for(var i=0; i<testData2078.screens.length;i++){
            screens.addScreen(testData2078.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 550, 200);
            process.getId("task").then(task_event_id_1 => {
                process.addScreenToFormTask(task_event_id_1, form_screen);

                process.dragEvent('task', 750, 200);
                process.getId("task").then(task_event_id_2 => {
                    process.addScreenToFormTask(task_event_id_2, form_screen);

                    process.dragEvent('end', 900, 200);
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
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42257(requestId, name);
        });
    });

});