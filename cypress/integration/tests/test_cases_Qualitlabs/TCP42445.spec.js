import { Login } from "../../pages/login";
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";

const faker = require('faker');

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

    it('TCP4 - 2445: Verify that all PDFs are generated in parallel and sequentially', () => {
        var name = "QA-Process-" + new Date().getTime();
        var description = "Created for testing purpose";
        var display_screen_1 = "PDF_1";
        var display_screen_2 = "PDF_2";
        var display_screen_3 = "PDF_3";
        var display_screen_4 = "PDF_4";
        var display_screen_5 = "PDF_5";


        //Step 1: Import screen1
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen_1, "screens_data/PDF_1.json");
        cy.wait(2000);

        //Step 2: Import screen2
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen_2, "screens_data/PDF_2.json");
        cy.wait(2000);

        //Step 3: Import screen3
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen_3, "screens_data/PDF_3.json");
        cy.wait(2000);

        //Step 4: Import screen4
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen_4, "screens_data/PDF_4.json");
        cy.wait(2000);

        //Step 5: Import screen5
        navHelper.navigateToScreensPage();
        screens.verifyPresenceOfScreenAndImportScreen(display_screen_5, "screens_data/PDF_5.json");
        cy.wait(2000);
        navHelper.navigateToScreensPage();

        //Step 6: Creating Process
        navHelper.navigateToProcessPage();
        process.createProcess(name, description);

        process.dragEvent('start', 400, 400);
        process.getId("start").then(start_event_id => {

            process.dragEvent('pdf generator', 520, 400);
            process.getId("pdf generator").then(pdf_event_id1 => {
                process.changetaskname("PDF Generator 1");
                process.changepdfFileName("PDF_1");

                process.dragEvent('Gateway', 780, 400);
                process.changeToParallelGateway();
                process.getId("Gateway").then(gateway_event_id_1 => {

                    process.dragEvent('pdf generator', 880, 200);
                    process.getId("pdf generator").then(pdf_event_id2 => {
                        process.changetaskname("PDF Generator 2");
                        process.changepdfFileName("PDF_2");

                        process.dragEvent('pdf generator', 880, 600);
                        process.getId("pdf generator").then(pdf_event_id3 => {
                            process.changetaskname("PDF Generator 3");
                            process.changepdfFileName("PDF_3");

                            process.dragEvent('Intermediate Event', 1100, 600);
                            process.getId("Intermediate Event").then(intermediate_event_id => {
                                process.configureTimingControlOption("timeDuration", "1");


                                process.dragEvent('pdf generator', 1100, 200);
                                process.getId("pdf generator").then(pdf_event_id4 => {
                                    process.changetaskname("PDF Generator 4");
                                    process.changepdfFileName("PDF_4");

                                    process.dragEvent('pdf generator', 1300, 600);
                                    process.getId("pdf generator").then(pdf_event_id5 => {
                                        process.changetaskname("PDF Generator 5");
                                        process.changepdfFileName("PDF_5");

                                        process.dragEvent('end', 1300, 200);
                                        process.getId("end").then(end_event_id => {


                                            process.addDisplayScreenToPDFGenrator(pdf_event_id1, display_screen_1);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id2, display_screen_2);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id4, display_screen_4);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id3, display_screen_3);
                                            process.addDisplayScreenToPDFGenrator(pdf_event_id5, display_screen_5);

                                            process.connectToEvents(start_event_id, pdf_event_id1);
                                            process.connectToEvents(pdf_event_id1, gateway_event_id_1);
                                            process.connectToEvents(gateway_event_id_1, pdf_event_id2);
                                            process.connectToEvents(gateway_event_id_1, pdf_event_id3);
                                            process.connectToEvents(pdf_event_id2, pdf_event_id4);
                                            process.connectToEvents(pdf_event_id4, end_event_id);
                                            process.connectToEvents(pdf_event_id3, intermediate_event_id);
                                            process.connectToEvents(intermediate_event_id, pdf_event_id5);
                                            process.connectToEvents(pdf_event_id5, end_event_id);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
        process.saveTheProcessWithoutUser();


        //Step 7: Create request
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42445(requestId);

        });
    });

});

