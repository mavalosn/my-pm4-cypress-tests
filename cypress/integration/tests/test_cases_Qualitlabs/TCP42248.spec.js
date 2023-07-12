import { Login } from "../../pages/login"
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Dataconnectors } from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";

const faker = require('faker');

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const dataconnector = new Dataconnectors();
const admin = new Admin();

describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it('TCP4 - 2248: Verify Form Tasks with Data Connectors', () => {
        let processName = "TCP4-2248 Verify Form Tasks with Data Connectors";
        let filePath = "processes/TCP4-2248 Verify Form Tasks with Data Connectors.json";
        let dataconnectorName = "TCP4-2248 DC";
        let description = "For purposing testing";
        let dataconnectorType = "No Auth";
        let resourceUrl = "http://api.worldbank.org/v2/country?format=json";
        let resourceMethod = "GET";
        let collectionName = "tcp4_2248bookscollection";
        let collectionFilePath = "collections/tcp4_2248bookscollection.json";

        //Step 1: Create a data connector
        navHelper.navigateToDataConnectorPage();
        let sourcesParameter = {description:description,method:resourceMethod, URL:resourceUrl};
        dataconnector.verifyPresenceOfDataConnectorAndCreate(dataconnectorName, description, dataconnectorType, sourcesParameter);

        //Step 2: Create collection using the two screens
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName, collectionFilePath);

        //Step 3: Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"}
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath, parameterList);

        //Step 4: Config ConnectorA data connector
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);

        // a1) -----------------config the first data connector
        let elementName = "ConnectorA";
        dataconnectorName = "TCP4-2248 DC";
        let resource =  "GET: list";
        process.verifyConfigOfDataConnectorAndConfig(elementName,dataconnectorName, resource);

        //Step 4: Config ConnectorA data connector
        // a2) -----------------config the first data connector
        elementName = "ConnectorB";
        dataconnectorName = "TCP4-2248BooksCollection";
        resource =  "GET: ListAll";
        process.verifyConfigOfDataConnectorAndConfig(elementName,dataconnectorName, resource);
        process.saveProcessWithoutVersion();


        //Step 5: Create Request

        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            cy.reload();
            request.clickOnTaskName(1, 1);
            let requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42248(requestId);
        });
    });

});