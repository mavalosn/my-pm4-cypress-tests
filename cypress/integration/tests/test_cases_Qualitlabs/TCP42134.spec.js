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
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2134: Verify that line inputs inside a loop depend a Select list', () =>{
        var name = "QA-Process-"+new Date().getTime();
        var description = "Created for testing purpose";
        var form_screen="TCP4-2134-Screen";

        // import screen
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(form_screen,"screens_data/TCP4-2134.json");
        navHelper.navigateToScreensPage();

        //creating process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id =>{
            process.dragEvent('task', 650, 200);
            process.getId("task").then(task_event_id =>{
                process.addScreenToFormTask(task_event_id,form_screen);
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
        cy.url().then(url =>{
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            specific.actionsAndAssertionsOfTCP42134(requestId);
        });
    });
});