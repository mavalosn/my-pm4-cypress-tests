import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors } from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";


const faker = require('faker');

const login = new Login();
const dataConnectors = new Dataconnectors();
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

    it.only('TCP4 - 2302: Verify visibility Rules Select List with option Allow Multiple Options in Loops', () => {
        let name = "QA-Process-" + new Date().getTime();
        let timeStamp = new Date().getTime();
        let description = "Created for testing purpose";
        let form_screen = "Screen 2302";
        let file_path = "screens_data/Screen 2302.json";
        let dataCntr_name = "2302-" + timeStamp;
        let dataCntr_type = "No Auth";
        let resource_name = "people";
        let method = "GET";
        let url = "https://swapi.dev/api/people";
        let collectionName = "Students-collection-1659352406304";
        let collectionFilePath = "collections/students_collection_1659352406304.json";

        //Step 1: Create Data Connectors
        navHelper.navigateToDataConnectorPage();
        dataConnectors.createADataConnector(dataCntr_name, description, dataCntr_type);
        dataConnectors.clickOnAddResource();
        dataConnectors.addResourceName(resource_name);
        dataConnectors.AddResourceDescription(resource_name);
        dataConnectors.selectMethodOfResource(method);
        dataConnectors.AddResourceURL(url);
        dataConnectors.saveTheResource();

        //Step 2: Create collection
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName, collectionFilePath);

        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(form_screen, file_path);
        navHelper.navigateToScreensPage();
        screens.searchForAScreen(form_screen);
        screens.editScreen();
        cy.get('[id="select2"]').click();
        cy.get('button[data-cy="accordion-DataSource"]').click();
        cy.get('select#data-sources-list').select(dataCntr_name);
        cy.get('select#endpoint-list').select('people');

        //select 3
        cy.get('[id="select3"]').click();
        cy.get('button[data-cy="accordion-DataSource"]').click();
        cy.get('select#data-sources-list').select(collectionName);
        cy.get('select#endpoint-list').select('ListAll');
        screens.clickOnSaveVersions();
        screens.clickOnSave();

        //Step 3: Create Process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {

            process.dragEvent('task', 550, 200);
            process.getId("task").then(task_event_id_1 => {
                process.addScreenToFormTask(task_event_id_1, form_screen);

                process.dragEvent('task', 750, 200);
                process.getId("task").then(task_event_id_2 => {
                    process.addScreenToFormTask(task_event_id_2, form_screen);

                    process.dragEvent('end', 900, 200);
                    process.getId("end").then(end_event_id => {

                        process.connectToEvents(start_event_id, task_event_id_1);
                        process.connectToEvents(task_event_id_1, task_event_id_2);
                        process.connectToEvents(task_event_id_2, end_event_id);

                    });
                });
            });
        });
        process.saveTheProcess(name);

        //Step 4: Create a Request
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42302(requestId);

        });
    });

});