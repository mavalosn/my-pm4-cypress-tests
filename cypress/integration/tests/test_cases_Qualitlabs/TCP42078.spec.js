import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Scripts } from "../../pages/scripts";
import testData2078 from "../../../fixtures/test_data/TCP42078.json";


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

    it('TCP4 - 2078: Verify that Record List works with request data from a task script', () => {
        let name = "QA-Process-" + new Date().getTime();
        let timeStamp = new Date().getTime();
        let description = "Created for testing purpose";
        let form_screen = timeStamp + testData2078.screens[0].name;
        let scriptName = timeStamp + "QA-2078Script";
        let userName = Cypress.env("username");


        let scriptValue = '$array = array (["code"=>" Paola1 ", "value" => "paola1"], ["code" => "paola2", "value" => "paola2"], ["code" => "paola3", "value" => "paola3"]); return ["requestData" => $array];';
        navHelper.navigateToScriptPage();
        scripts.createScript(scriptName, description, userName);
        scripts.addPhpTOScript(scriptValue);
        //Screens Creation
        navHelper.navigateToScreensPage();
        for (var i = 0; i < testData2078.screens.length; i++) {
            screens.addScreen(testData2078.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
        screens.searchForAScreen(form_screen);
        screens.clickOnEditScreen(form_screen);
        screens.addInternalScreen(testData2078.internalScreen, timeStamp);
        screens.addPageToRecordList(testData2078.internalScreen.name + timeStamp, 2);
        //Process Creation
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 650, 200);
            process.changetoscripttask();
            process.getId("task").then(script_event_id => {

                process.dragEvent('task', 650, 400);
                process.getId("task").then(task_event_id => {

                    process.dragEvent('end', 500, 550);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, script_event_id);
                        process.connectToEvents(script_event_id, task_event_id);
                        process.connectToEvents(task_event_id, end_event_id);

                        process.addScreenToscriptTask(script_event_id, scriptName);
                        process.addScreenToFormTask(task_event_id, form_screen);
                        process.saveTheProcess(name);
                        //Request Execution
                        header.clickOnAddRequest();
                        header.searchWithProcessName(name);
                        header.clickOnStart(name);
                        cy.reload();
                        cy.url().then(url => {
                            var requestId = url.split('/')[4].trim();
                            request.clickOnTaskName(1, 1);
                            specific.actionsAndAssertionsOfTCP42078(requestId, form_screen);
                        });
                    });
                });
            });
        });
    });
});