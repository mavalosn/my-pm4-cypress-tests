import { Login } from "../../pages/login";
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2271: Verify Miscellaneous of Script Tasks and Form Tasks', () => {

        let process_name = "TCP4-2271 Verify Miscellaneous of Script Tasks and Form Tasks";
        let name = process_name;
        let filepath = "processes/TCP4-2271 Verify Miscellaneous of Script Tasks and Form Tasks.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Script
            {elemName: "Script", label:"Verify Miscellaneous of Script Tasks and Form Tasks",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(process_name,filepath,parameterList);

        //Step 2: Start a Request
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            cy.reload();
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42271(requestId);

        });
    });

});
