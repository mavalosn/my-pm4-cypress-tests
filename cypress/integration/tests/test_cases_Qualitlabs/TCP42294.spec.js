import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP4-2294.json"

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens= new Screens();

describe("ProcessMaker Test Cases", () => {

    before(()=>{
        login.navigateToUrl();
        login.login();
    });

    it.only('TCP4 - 2294: Verify Validation Rules with Loop and Nested Screen', () =>{
        let name = "QA-Process-"+new Date().getTime();
        let timeStamp = new Date().getTime();
        let description = "Created for testing purpose";
        let user_name = "admin";
        let coverstaion_screen_1=timeStamp+testData.screens[0].name;
        let loop_screen = "Verify Validation Rules with Loop and Nested Screen 6";
        let file_path = "screens_data/Verify Validation Rules with Loop and Nested Screen 6.json";
        let displayScreen = "2294-Display screen";
        let file_path1= "screens_data/2294-Display screen.json";

        //Step 1: Create screen
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(loop_screen, file_path);
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(displayScreen, file_path1);
        navHelper.navigateToScreensPage();
        for(let i=0;i<testData.screens.length;i++){
            screens.addScreen(testData.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
        screens.searchForAScreen(coverstaion_screen_1);
        screens.editScreen(coverstaion_screen_1);
        cy.xpath("(//div[@class='card'])[A]".replace('A',1)).click();
        screens.addnestedscreen(loop_screen);
        screens.clickOnSaveVersions();
        screens.clickOnSave();

        //Step 2: Create a Process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);
        cy.wait(5000); // Will remove later
        cy.url().then(url => {
            var processId = url.split('/')[4].trim();
            process.dragEvent('pool',400,100);
            process.dragEvent('start', 400, 250);
            process.SetWebEntryDetailsForAStartEventWithoutEnablePassword(coverstaion_screen_1,displayScreen  );
            process.getId("start").then(start_event_id =>{
                process.dragEvent('task', 550, 250);
                process.getId("task").then(task_event_id_1 =>{
                    process.addScreenToFormTask(task_event_id_1, coverstaion_screen_1);
                    process.addassignmentRules(task_event_id_1,user_name);
                    process.dragEvent('end', 700, 350);
                    process.getId("end").then(end_event_id =>{
                        process.addScreenToEndEvent(displayScreen);
                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, end_event_id);

                    });
                });
            });
            process.saveTheProcess(name);
            specific.actionsAndAssertionsOfTCP42294(name,processId,coverstaion_screen_1);
        });
    });
});