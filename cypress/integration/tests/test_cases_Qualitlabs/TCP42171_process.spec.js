import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP4-2171.json";
import { Screensof2171 } from "./TCP42171_screen.spec";


const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const screen = new Screensof2171();
describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
    });
    var name = "QA-Process-" + new Date().getTime();
    it.only('TCP4 - 2171: Creation Process', () => {
        var timeStamp = new Date().getTime();
        var coverstaion_screen = timeStamp + testData.screens[0].name;
        var description = "Created for testing purpose";
        var user_Name = "admin";
        //create screens
        screen.screen(timeStamp);
        //create process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);
        cy.wait(5000);

        process.dragEvent('start', 400, 100);
        process.getId("start").then(start_event_id => {
            process.dragEvent('task', 650, 100);
            process.getId("task").then(task_event_id_1 => {
                process.changetaskname("Comments");
                process.addScreenToFormTask(task_event_id_1, coverstaion_screen);
                process.clickOnFormTaskComments();
                process.enableTheComments();
                process.addassignmentRules(task_event_id_1, user_Name);
                process.dragEvent('task', 850, 100);
                process.getId("task").then(task_event_id_2 => {
                    process.changetaskname("Reactions");
                    process.addScreenToFormTask(task_event_id_2, coverstaion_screen);
                    process.clickOnFormTaskComments();
                    process.enableTheComments();
                    process.enableTheReactions();
                    process.addassignmentRules(task_event_id_2, user_Name);
                    process.dragEvent('task', 1050, 100);
                    process.getId("task").then(task_event_id_3 => {
                        process.changetaskname("Voting");
                        process.addScreenToFormTask(task_event_id_3, coverstaion_screen);
                        process.clickOnFormTaskComments();
                        process.enableTheComments();
                        process.enableTheVoting();
                        process.addassignmentRules(task_event_id_3, user_Name);
                        process.dragEvent('task', 1050, 300);
                        process.getId("task").then(task_event_id_4 => {
                            process.changetaskname("Edit");
                            process.addScreenToFormTask(task_event_id_4, coverstaion_screen);
                            process.clickOnFormTaskComments();
                            process.enableTheComments();
                            process.enableTheEdit();
                            process.addassignmentRules(task_event_id_4, user_Name);
                            process.dragEvent('task', 650, 300);
                            process.getId("task").then(task_event_id_5 => {
                                process.changetaskname("Delete");
                                process.addScreenToFormTask(task_event_id_5, coverstaion_screen);
                                process.clickOnFormTaskComments();
                                process.enableTheComments();
                                process.enableTheDelete();
                                process.addassignmentRules(task_event_id_5, user_Name);
                                process.dragEvent('end', 400, 350);
                                process.getId("end").then(end_event_id => {
                                    process.connectToEvents(start_event_id, task_event_id_1);
                                    process.connectToEvents(task_event_id_1, task_event_id_2);
                                    process.connectToEvents(task_event_id_2, task_event_id_3);
                                    process.connectToEvents(task_event_id_3, task_event_id_4);
                                    process.connectToEvents(task_event_id_4, task_event_id_5);
                                    process.connectToEvents(task_event_id_5, end_event_id);
                                })
                            })
                        })
                    })
                })
            })
        });
        process.saveTheProcess(name);
    });

    it('TCP4 - 2171: Execution Process ', function () {
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42171(requestId);
        })
    });
});