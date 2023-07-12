import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Scripts } from "../../pages/scripts";

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

    it.only('TCP4 - 2243: Verify Display Screens with Watchers', () => {
        var name = "QA-Process-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var description = "Created for testing purpose";
        var display_screen1 = "Verify Display Screens with Watchers";
        var display_screen2 = "Verify Display Screens with Watchers Nested Screen";
        var userName = "admin";


        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen1, "screens_data/Verify Display Screens with Watchers.json");
        navHelper.navigateToScreensPage();


        //import screen
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen2, "screens_data/Verify Display Screens with Watchers Nested Screen.json");
        navHelper.navigateToScreensPage();


        //creating scripts
        var scriptName = "QA-2243Script-" + timeStamp;
        var scriptValue = '$state = array("AS"=>"ASSAM", "OR"=>"ORRISA", "KR"=>"KERELA");extract($state);$text = "$AS is $AS $KR is $KR $OR is $OR";$array_implode = ["Israel", "Japan", "Germany"];$array_text_implode = implode(" ", $array_implode);return ["text"=> $text, "text_imploded"=> $array_text_implode];?>';
        navHelper.navigateToScriptPage();
        scripts.createScript(scriptName, description, userName);
        scripts.addPhpTOScript(scriptValue);

        navHelper.navigateToScreensPage();
        screens.searchScreen(display_screen1, "edit");
        cy.get('[title="Watchers"]').click();
        screens.editWatcher("watcher", scriptName);
        cy.xpath("//h5[@class='modal-title']/following-sibling::button[1]").click();
        screens.saveTheChanges("Display");

        navHelper.navigateToScreensPage();
        screens.searchScreen(display_screen2, "edit");
        cy.get('[title="Watchers"]').click();
        screens.editWatcher("watcher", scriptName);
        cy.xpath("//h5[@class='modal-title']/following-sibling::button[1]").click();
        screens.saveTheChanges("Display");

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('pool', 400, 70);

        process.dragEvent('start', 440, 300);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 640, 300);
            process.changeToManualTask();
            process.getId("task").then(task_event_id1 => {
                process.changetaskname('A');


                process.dragEvent('task', 900, 300);
                process.changeToManualTask();
                process.getId("task").then(task_event_id2 => {
                    process.changetaskname('B');

                    process.dragEvent('end', 850, 180);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, task_event_id1);
                        process.connectToEvents(task_event_id1, task_event_id2);
                        process.connectToEvents(task_event_id2, end_event_id);

                        process.addScreenToFormTask(task_event_id2, display_screen1);
                        process.addScreenToFormTask(task_event_id1, display_screen2);

                        process.addassignmentRules(task_event_id1, userName);
                        process.addassignmentRules(task_event_id2, userName);
                    })
                })
            })
        });
        process.saveTheProcess(name);
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42243(requestId);
        })
    })
});