import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";

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

    it('TCP4 - 2382: Verify that errors do not appear on the screen, when there is a loop inside a record List',  () =>{
        let name = "QA-Process-"+new Date().getTime();
        let timeStamp= new Date().getTime();
        let description = "Created for testing purpose";
        let coverstaion_screen = "Screen 2382";
        let file_path = "screens_data/Screen 2382.json";

        //Step 1: screen create
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(coverstaion_screen ,file_path);

        //Step 2: process create
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);
        cy.wait(5000); // Will remove later
        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id =>{
            process.dragEvent('task', 550, 200);
            process.getId("task").then(task_event_id_1 =>{
                process.addScreenToFormTask(task_event_id_1, coverstaion_screen);
                process.dragEvent('task', 750, 200);
                process.getId("task").then(task_event_id_2 =>{
                    process.addScreenToFormTask(task_event_id_2, coverstaion_screen);
                    process.dragEvent('end', 700, 350);
                    process.getId("end").then(end_event_id =>{
                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, task_event_id_2);
                        process.connectToEvents(task_event_id_2, end_event_id);
                    });
                });
            });
        });

        process.saveTheProcess(name);

        //Step 3: Create a request
        header.clickOnAddRequest();
        cy.wait(3000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url =>{
            //verify FormTask visible without error
            cy.xpath('//a[normalize-space(text())="Form Task"]').should('be.visible');
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42382(requestId, coverstaion_screen);
        });
    });

});