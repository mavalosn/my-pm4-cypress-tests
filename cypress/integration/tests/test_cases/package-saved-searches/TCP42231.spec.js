import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Specific } from "../../../pages/specific";
import { Screens } from "../../../pages/screens";
import { SaveSearchs } from "../../../pages/saveSearch";
import testData from "../../../../fixtures/test_data/TCP4-2231.json";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens= new Screens();
const saveSearch = new SaveSearchs();

describe("ProcessMaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    let timeStamp = new Date().getTime();
    let name = "TCP4-2231" + timeStamp;
    let coverstaion_screen = timeStamp+testData.screens[0].name;
    let description = "Created for testing purpose";
    let nameSaveSearch = "Saved Search - 2231";

    it('TCP4-2231: Import the process', () => {

        navHelper.navigateToScreensPage();
        screens.addScreen(testData.screens[0], timeStamp);
        navHelper.navigateToScreensPage();

        navHelper.navigateToProcessPage();
        process.createProcess(name, description);
        cy.wait(5000);

        process.dragEvent('start', 400, 200);
        process.getId("start").then(start_event_id => {
            process.dragEvent('task', 550, 200);
            process.getId("task").then(task_event_id_1 => {
                process.addScreenToFormTask(task_event_id_1, coverstaion_screen);
                process.dragEvent('end', 700, 350);
                process.getId("end").then(end_event_id => {
                    process.connectToEvents(start_event_id, task_event_id_1);
                    process.connectToEvents(task_event_id_1, end_event_id);
                });
            });
        });
        process.saveTheProcess(name);

    });

    it('TCP4-2231: Verify Saved Search in screen with PMQL/Create all requests ',  () => {
        specific.actionsAndAssertionsCreateAllRequestTCP42231(name);
    });

    it('TCP4-2231: Verify Saved Search in screen with PMQL/Execution of the process',  () => {
        specific.actionsAndAssertionsOfTCP42231(name,timeStamp,nameSaveSearch);
        //delete saveSearch
        navHelper.navigateToSavedSearchs();
        cy.xpath("//input[@placeholder='Search']").should('be.visible');
        cy.xpath("//input[@placeholder='Search']").first().click().type(nameSaveSearch).should("have.value",nameSaveSearch);
        saveSearch.waitForSaveSearch(nameSaveSearch);
        saveSearch.pressOptionSaveSearch('delete');
        cy.xpath('//button[text()="Confirm"]').should('be.visible').click();
    });

});