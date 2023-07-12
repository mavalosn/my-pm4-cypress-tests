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

    it.only('TCP4 - 2295: Verify the entered data of a selectlist and recordlist after a Message Start-End Event', () =>{
        let name = "QA-Process-"+new Date().getTime();
        let timeStamp = new Date().getTime();
        let description = "Created for testing purpose";

        //Step 1: Create Screen
        navHelper.navigateToScreensPage();
        let screen_name1= "Screen 2295";
        let file_path1 = "screens_data/Screen 2295.json";
        screens.verifyPresenceOfScreenAndImportScreen(screen_name1, file_path1);

        //Step 2: Create Process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);
        cy.wait(5000);
        process.dragEvent('pool',400,100);
        process.dragEvent('start', 400, 250);
        process.getId("start").then(start_event_id =>{
            process.dragEvent('task', 550, 250);
            process.getId("task").then(task_event_id_1 =>{
                process.changetaskname('A');
                process.addScreenToFormTask(task_event_id_1, screen_name1);
                process.dragEvent('task', 750, 250);
                process.getId("task").then(task_event_id_2 =>{
                    process.changetaskname('B');
                    process.addScreenToFormTask(task_event_id_2, screen_name1);
                    process.dragEvent('end', 700, 350);
                    process.clickOnMsgEndEvent();
                    process.getId("end").then(end_event_id =>{
                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, task_event_id_2);
                        process.connectToEvents(task_event_id_2, end_event_id);
                        //second Pool
                        process.dragEvent('pool',400,500);
                        process.dragEvent('start', 800, 550);
                        process.clickOnMsgStartEvent();
                        process.setMsgReferenceToMsgStartEvent();
                        process.getId("start").then(start_event_id_1 =>{
                            process.dragEvent('task', 600, 550);
                            process.getId("task").then(task_event_id_3 =>{
                                process.changetaskname('C');
                                process.addScreenToFormTask(task_event_id_3, screen_name1);
                                process.dragEvent('end', 500, 700);
                                process.getId("end").then(end_event_id_1 =>{
                                    process.connectToEvents(end_event_id , start_event_id_1);
                                    process.connectToEvents(start_event_id_1, task_event_id_3);
                                    process.connectToEvents(task_event_id_3, end_event_id_1);
                                });
                            });
                        });
                    });
                });
            });
        });
        process.saveTheProcess(name);

        //Step 3: Create Request
        header.clickOnAddRequest();
        cy.wait(3000);
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42295(requestId,name);
        });
    });

});