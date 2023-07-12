import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Specific } from "../../../pages/specific";
import { Screens } from "../../../pages/screens";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens= new Screens();
describe("ProcessMaker Test Cases", () => {

    beforeEach(()=>{
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2066 Process Exclusive Gateway with Calcs";
    let filePath = "processes/TCP4-2066 Process Exclusive Gateway with Calcs.json";

    it('TCP4 - 2066: Import the process ', () =>{
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it('TCP4 - 2066: Verify exclusive gateways with screens and Calcs (First Scenario) ', () =>{
        //Step 2: Create Request
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then( url =>{
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42066_1Scenario(requestId);
        });
    });

    it('TCP4 - 2066: Verify exclusive gateways with screens and Calcs (Second Scenario) ', () =>{
        //Step 2: Create Request
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then( url =>{
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42066_2Scenario(requestId);
        });
    });

    it('TCP4 - 2066: Verify exclusive gateways with screens and Calcs (Third Scenario) ', () =>{
        //Step 2: Create Request
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then( url =>{
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42066_3Scenario(requestId);
        });
    });

});