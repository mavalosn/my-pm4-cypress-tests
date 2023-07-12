import { Login } from "../../pages/login";
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";
import { Scripts } from "../../pages/scripts";
import testData2366 from "../../../fixtures/test_data/TCP42366.json";


const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const specific = new Specific();
const screens = new Screens();
const admin = new Admin();
const scripts = new Scripts();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2366: Verify Script API and Data Connectors associated', () => {
        var name = "QA-Process-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var description = "Created for testing purpose";
        var userName = 'admin';
        var listName = 'GET: ListAll';
        var form_screen = timeStamp + testData2366.screens[0].name;
        var display_screen = timeStamp + testData2366.screens[1].name;
        var collectionName = testData2366.screens[0].controlls[0].datasource.data_connector;
        var collectionFilePath = "collections/bookscollection.json";

        // import books collection
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName, collectionFilePath);

        // Create remaining screens
        navHelper.navigateToScreensPage();
        for (var i = 0; i < testData2366.screens.length; i++) {
            screens.addScreen(testData2366.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }

        //creating scripts
        var scriptName = "QA-2366Script-" + timeStamp;
        var scriptValue = "$count = sizeof($data['selectlist']); return ['count'=> $count];";
        navHelper.navigateToScriptPage();
        scripts.createScript(scriptName, description, userName);
        scripts.addPhpTOScript(scriptValue);

        //creating process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);


        cy.url().then(URL => {
            var processId = URL.split('/')[4].trim();
            cy.log(processId);
            process.dragEvent('pool', 400, 70);

            process.dragEvent('start', 460, 200);
            process.getId("start").then(start_event_id => {
                process.SetWebEntryDetailsForAStartEventWithoutEnablePassword(form_screen, display_screen);
                process.dragEvent('task', 580, 200);
                process.changetoscripttask();
                process.getId("task").then(scriptTask_event_id1 => {
                    process.changetaskname("Script A");
                    process.AddABoundaryConditionalEventToTask();
                    process.getBoundaryId().then(boundaryEvent_id => {
                        process.setConditionForBoundaryEvent("count == 0");

                        process.dragEvent('task', 730, 200);
                        process.changetoscripttask();
                        process.getId("task").then(scriptTask_event_id2 => {
                            process.changetaskname("Script B");
                            process.dragEvent('task', 930, 200);
                            process.changetoscripttask();
                            process.getId("task").then(scriptTask_event_id3 => {
                                process.changetaskname("Script C");
                                process.dragEvent('Data Connector', 500, 400);
                                process.getId("task").then(dataConnector_id1 => {
                                    process.changetaskname("Data Connector A");
                                    process.selectdataconnector(dataConnector_id1, collectionName, listName);
                                    process.addLoopActivity("Multi-Instance (Parallel)", "selectlist");

                                    process.dragEvent('end', 900, 400);
                                    process.getId("end").then(end_event_id => {


                                        process.dragEvent('Data Connector', 700, 400);
                                        process.getId("task").then(dataConnector_id2 => {
                                            process.changetaskname("Data Connector B");
                                            process.selectdataconnector(dataConnector_id2, collectionName, "GET: GetRecord");
                                            process.addOutBoundConfig("PARAM", "record_id", "{{}{{}count}}");

                                            process.addScreenToscriptTask(scriptTask_event_id1, scriptName);
                                            process.addScreenToscriptTask(scriptTask_event_id2, scriptName);
                                            process.addScreenToscriptTask(scriptTask_event_id3, scriptName);

                                            process.connectToEvents(start_event_id, scriptTask_event_id1);
                                            process.connectToEvents(scriptTask_event_id1, dataConnector_id1);
                                            process.connectToEvents(dataConnector_id1, dataConnector_id2);
                                            process.connectToEvents(dataConnector_id2, scriptTask_event_id2);
                                            process.connectToEvents(scriptTask_event_id2, scriptTask_event_id3);
                                            process.connectToEvents(boundaryEvent_id, dataConnector_id2);
                                            process.connectToEvents(scriptTask_event_id3, end_event_id);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
            process.saveTheProcess(name);

            //request part
            specific.actionsAndAssertionsOfTCP42366(form_screen, name, processId);
        });
    });

});