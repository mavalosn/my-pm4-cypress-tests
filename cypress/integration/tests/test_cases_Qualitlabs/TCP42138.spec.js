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
const screens = new Screens();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2138: Verify web entry with anonymous option and URL redirect with Request' +
        ' Data using _parent configuration in record list and loops', () => {
        var name = "QA-Process-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var description = "Created for testing purpose";
        var url1 = "https://www.ecosia.org";

        //screen create
        navHelper.navigateToScreensPage();
        var screen_name1 = "ScreenRequestData2138";
        var file_path1 = "screens_data/ScreenRequestData2138.json";
        screens.verifyPresenceOfScreenAndImportScreen(screen_name1, file_path1);

        navHelper.navigateToScreensPage();
        var screen_name2 = "Screen Recover Request data2138";
        var file_path2 = "screens_data/Screen Recover Request data2138.json";
        screens.verifyPresenceOfScreenAndImportScreen(screen_name2, file_path2);

        //process create
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        cy.url().then(url => {
            var processId = url.split('/')[4].trim();
            process.dragEvent('pool', 400, 100);
            process.dragEvent('start', 400, 250);
            process.SetWebEntryDetailsForAStartEventWithoutEnablePassword(screen_name1, null, url1);
            process.getId("start").then(start_event_id => {

                process.dragEvent('task', 550, 250);
                process.getId("task").then(task_event_id_1 => {
                    process.addScreenToFormTask(task_event_id_1, screen_name2);

                    process.dragEvent('end', 700, 350);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, end_event_id);

                    })
                })
            })
            process.saveTheProcess(name);
            specific.actionsAndAssertionsOfTCP42138(screen_name1, name, processId, screen_name2);

        })

    })
})