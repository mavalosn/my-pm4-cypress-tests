import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Dataconnectors} from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";
const faker = require('faker');

const login = new Login();
const admin = new Admin();
const process = new Process();
const navigationHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const dataconnector = new Dataconnectors();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    let result_token;
    it("get token", async() => {
        navigationHelper.navigateToAdminPage();
        result_token = await admin.userGetToken('admin');
    });

    it('TCP4 - 2212: Verify Conversational Screens', async () =>{
        let processName = "TCP4-2212 Verify Conversational Screens";
        let filePath = "processes/TCP4-2212 Verify Conversational Screens.json";
        var timeStamp= new Date().getTime();
        let dataConnectorName = "GroupsDC"+ timeStamp;
        let dataConnectorDescription = "For purpose of test";
        let dataconnectorType = "Bearer Token";
        let resourceName ="list";
        let resourceUrl= Cypress.env('URL')+"/api/1.0/groups";
        let resourceMethod= "GET";

        //Step 1: Create Data connector
        navigationHelper.navigateToDataConnectorPage();
        dataconnector.createADataConnector(dataConnectorName, dataConnectorDescription, dataconnectorType);
        dataconnector.addResourceForBearerToken(resourceName, dataConnectorDescription, resourceMethod, resourceUrl, result_token);

        //Step 2: Import the process
        navigationHelper.navigateToProcessPage();
        let parameterList = [
            //To Script
            {elemName: "Script", label:"Conversational Screens",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);

        //Step 3: Config the data connector
        navigationHelper.navigateToProcessPage();
        process.searchForProcess(processName);

        let elementName = "Groups";
        let resource =  "GET: list";
        process.verifyConfigOfDataConnectorAndConfig(elementName,dataConnectorName, resource);
        process.saveProcessWithoutVersion();

        //Step 4: Create request
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42212(requestId);
        });
    });

});
