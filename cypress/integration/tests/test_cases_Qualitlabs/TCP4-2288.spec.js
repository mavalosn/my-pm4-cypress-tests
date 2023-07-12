import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";
import 'cypress-file-upload';
import Selectors from "../../selectors/screens"
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

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2288: Verify Loop Signature Manual Tasks', () => {
        var name = "QA-Process-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var description = "Created for testing purpose";
        var form_screen = "2288FormScreen";
        var display_screen = "2288DisplayScreen";


        var collectionName = "TCP4-2288BooksCollection";
        var collectionFilePath = "collections/tcp4_2288bookscollection.json";

        // Create collection using the two screens
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName, collectionFilePath);


        //Import Form screen
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(form_screen, "screens_data/2288FormScreen.json");
        navHelper.navigateToScreensPage();

        //search for a screen
        screens.searchScreen(form_screen, 'edit');
        //add dataconnector to screen
        screens.changeDataConnectorForSelectList('aa', collectionName, "ListAll", "Form");

        //Import Display Screen
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen, "screens_data/2288DisplayScreen.json");
        navHelper.navigateToScreensPage();



        //create process and add items
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('pool', 400, 100);


        process.dragEvent('start', 430, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 500, 400);
            process.getId("task").then(task_event_id => {
                process.changetaskname('AA');

                process.dragEvent('task', 650, 200);
                process.changeToManualTask();
                process.getId("task").then(manualtask_event_id => {
                    process.changetaskname('BB');

                    process.dragEvent('end', 800, 200);
                    process.getId("end").then(end_event_id => {

                        //connecting the events
                        process.connectToEvents(start_event_id, task_event_id);
                        process.connectToEvents(task_event_id, manualtask_event_id);
                        process.connectToEvents(manualtask_event_id, end_event_id);


                        process.addScreenToFormTask(task_event_id, form_screen);
                        process.addScreenToFormTask(manualtask_event_id, display_screen);
                    })
                })
            })
        });

        process.saveTheProcess(name);

        //request part
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42288(requestId);

        });
    });
});