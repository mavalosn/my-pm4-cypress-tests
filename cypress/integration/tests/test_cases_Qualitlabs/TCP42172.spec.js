import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import testData from "../../../fixtures/test_data/TCP4-2172.json"
import { Screens } from "../../pages/screens";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();

describe("ProcessMaker Test Cases", () => {

    before(()=>{
        login.navigateToUrl();
        login.login();
    });

    it.only('TCP4 - 2172: Cant log out after login in with SAML',() =>{
        var name = "QA-Process-"+new Date().getTime();
        var timeStamp = new Date().getTime();
        var description = "Created for testing purpose";
        var coverstaion_screen_1 = timeStamp + testData.screens[0].name;
        var coverstaion_screen_2 = timeStamp + testData.screens[1].name;
        //create screen
        navHelper.navigateToScreensPage();
        for(let i=0;i<testData.screens.length;i++){
            screens.addScreen(testData.screens[i],timeStamp);
            navHelper.navigateToScreensPage();
        }

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);
        cy.url().then(url => {
            var processId = url.split('/')[4].trim();

            process.dragEvent('start', 400, 200);
            process.SetWebEntryDetailsForAStartEventWithoutEnablePassword(coverstaion_screen_1, coverstaion_screen_2);
            process.getId("start").then(start_event_id =>{
                process.dragEvent('task', 550, 200);
                process.getId("task").then(task_event_id_1 =>{
                    process.addScreenToFormTask(task_event_id_1, coverstaion_screen_1);
                    process.clickOnFormTaskComments();
                    process.enableTheComments();
                    process.enableTheReactions();
                    process.enableTheVoting();
                    process.enableTheEdit();
                    process.enableTheDelete();
                    process.dragEvent('end', 700, 350);
                    process.getId("end").then(end_event_id =>{
                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, end_event_id);
                    })
                })
            });

            process.saveTheProcess(name);
            specific.actionsAndAssertionsOfTCP42172(coverstaion_screen_1,name,processId);
        })
    })
});
