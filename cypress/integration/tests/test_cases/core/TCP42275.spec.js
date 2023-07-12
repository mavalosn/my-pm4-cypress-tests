import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Specific } from "../../../pages/specific";
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Login } from "../../../pages/login";

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

    it('TCP4 - 2275: Verify Chain of Scripts', () => {

        let processName = "TCP4-2275 Verify Chain of Scripts";
        let filePath = "processes/TCP4-2275 Verify Chain of Scripts.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Script
            {elemName: "Script", label:"Script A",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"Script B",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"Script C",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"Script D",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"Script E",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);

        //Step 2: Create a Request
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42275();
        });

    });

});