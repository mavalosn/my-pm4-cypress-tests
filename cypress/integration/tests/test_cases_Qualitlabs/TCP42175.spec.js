import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import 'cypress-file-upload';
const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();

describe("ProcessMaker Test Cases", () => {

    before(()=>{
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2175: Verify the data of a screen conversational with all line input validations',() =>{
        let processName = "TCP4-2175-Verify the data of a screen conversational";
        let filePath = "processes/TCP4-2175.json";

        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            specific.actionsAndAssertionsOfTCP42175(requestId);
        });
    });
});