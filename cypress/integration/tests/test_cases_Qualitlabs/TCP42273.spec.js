import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper} from "../../helpers/navigationHelper";
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


    it.only('TCP4 - 2273: Verify that the intermediate timer after 1 minute returns to the initial task', () =>{

        let name = "TCP4-2273 Verify Intermediate Timer Event";
        let filePath = "processes/TCP4-2273 Verify Intermediate Timer Event.json";

        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(name, filePath);


        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            cy.reload();
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42273(requestId);

        });
    });

});