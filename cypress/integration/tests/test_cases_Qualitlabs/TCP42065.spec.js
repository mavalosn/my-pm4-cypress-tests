import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import testData from "../../../fixtures/test_data/TCP4-2065.json";


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

    it.only('TCP4 - 2065: Check the validation rules of a conversational type screen',() =>{
        var name = "QA-Process-"+new Date().getTime();
        var timeStamp = new Date().getTime();
        var coverstaion_screen = timeStamp+testData.screens[0].name;
        var description = "Created for testing purpose";

        navHelper.navigateToScreensPage();
        for(var i=0; i<testData.screens.length;i++){
            screens.addScreen(testData.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId('start').then(start_event_id =>{
            process.dragEvent('task', 650, 200);
            process.getId("task").then(task_event_id =>{
                process.addScreenToFormTask(task_event_id, coverstaion_screen);
                process.dragEvent('end', 500, 550);
                process.getId("end").then(end_event_id =>{
                    process.connectToEvents(start_event_id, task_event_id);
                    process.connectToEvents(task_event_id,  end_event_id);

                })

            })
        });

        process.saveTheProcess(name);
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then( url =>{
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            specific.actionsAndAssertionsOfTCP42065(requestId);
        })
    })
});