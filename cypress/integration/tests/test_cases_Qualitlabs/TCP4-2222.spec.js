import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";
import 'cypress-file-upload';
import testData2222 from "../../../fixtures/test_data/TCP4-2222.json";

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
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let name;
    let date = new Date();
    let description;
    let timeStamp;
    let userName;
    let create_screen;
    let view_screen;
    let form_screen;
    let display_screen;
    let collectionName;

    it('TCP4 - 2222: Create Screens', () => {
        name = "QA-Process-" + new Date().getTime();
        description = "Created for testing purpose";
        timeStamp = new Date().getTime();
        userName = "admin";
        create_screen = timeStamp + testData2222.screens[0].name;
        view_screen = timeStamp + testData2222.screens[1].name;
        form_screen = timeStamp + testData2222.screens[2].name;
        display_screen = timeStamp + testData2222.screens[3].name;
        collectionName = testData2222.internalScreen.controlls[0].datasource.data_connector + timeStamp;

        login.changeLanguageToEnglishAndDateType();
        // Create two screens
        navHelper.navigateToScreensPage();
        for (var i = 0; i < 2; i++) {
            screens.addScreen(testData2222.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }

        // Create collection using the two screens
        navHelper.navigateToCollectionPage();
        admin.creatACollection(collectionName, description, create_screen, view_screen, create_screen);
        admin.addRecordstoBookCollection(collectionName);

        // Create remaining screens
        navHelper.navigateToScreensPage();
        for (var i = 2; i < testData2222.screens.length; i++) {
            screens.addScreen(testData2222.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
    });
    it('TCP4 - 2222: Populate Screens', function () {
        navHelper.navigateToScreensPage();
        //add page to form screen
        screens.searchForAScreen(form_screen);
        screens.clickOnEditScreen(form_screen);
        screens.addInternalScreen(testData2222.internalScreen, timeStamp);
        screens.addPageToRecordList(testData2222.internalScreen.name + timeStamp, 4);
    });
    it('TCP4 - 2222: Create Process ', function () {
        //create a process and add events
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('pool', 400, 70);


        process.dragEvent('start', 440, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 560, 200);
            process.getId("task").then(task_event_id => {

                process.dragEvent('pdf generator', 720, 200);
                process.getId("pdf generator").then(pdf_event_id1 => {
                    process.changetaskname('A');
                    process.changepdfFileNameToDynamicVariable("aa");

                    process.dragEvent('pdf generator', 920, 200);
                    process.getId("pdf generator").then(pdf_event_id2 => {
                        process.changetaskname('B');
                        process.changepdfFileNameToDynamicVariable("checkbox");


                        process.dragEvent('pdf generator', 920, 400);
                        process.getId("pdf generator").then(pdf_event_id3 => {
                            process.changetaskname('C');
                            process.changepdfFileName('c');

                            process.dragEvent('pdf generator', 720, 400);
                            process.getId("pdf generator").then(pdf_event_id4 => {
                                process.changetaskname('D');
                                process.changepdfFileName('d');


                                process.dragEvent('pdf generator', 560, 400);
                                process.getId("pdf generator").then(pdf_event_id5 => {
                                    process.changetaskname('E');
                                    process.changepdfFileName('e');

                                    process.dragEvent('pdf generator', 410, 300);
                                    process.getId("pdf generator").then(pdf_event_id6 => {
                                        process.changetaskname('F');
                                        process.changepdfFileName('f');

                                        process.dragEvent('end', 490, 500);
                                        process.getId("end").then(end_event_id => {

                                            process.connectToEvents(start_event_id, task_event_id);
                                            process.connectToEvents(task_event_id, pdf_event_id1);
                                            process.connectToEvents(pdf_event_id1, pdf_event_id2);
                                            process.connectToEvents(pdf_event_id2, pdf_event_id3);
                                            process.connectToEvents(pdf_event_id3, pdf_event_id4);
                                            process.connectToEvents(pdf_event_id4, pdf_event_id5);
                                            process.connectToEvents(pdf_event_id5, pdf_event_id6);
                                            process.connectToEvents(pdf_event_id6, end_event_id);

                                            process.addScreenToFormTask(task_event_id, form_screen);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id1, display_screen);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id2, display_screen);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id3, display_screen);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id4, display_screen);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id5, display_screen);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id6, display_screen);

                                            process.addassignmentRules(task_event_id, userName);
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        });

        process.saveTheProcess(name);
    });
    it('TCP4 - 2222: Execution of the process ', () => {
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42222(requestId, date);
        })
    });

});