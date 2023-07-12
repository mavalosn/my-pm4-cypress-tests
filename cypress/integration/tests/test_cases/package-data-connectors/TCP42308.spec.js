import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import { Dataconnectors } from "../../../pages/dataConnectors";
const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();
const admin = new Admin();
const addDataConnector = new Dataconnectors();

describe("ProcessMaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    let result_token;
    it("Get Token", async() => {
        navHelper.navigateToAdminPage();
        result_token = await admin.userGetToken('admin');
    });

    it("TCP4 - 2308 : Process for verifying the output information saved by data connector", () => {
        var collectionName ='Doctor Collection';
        var fileCPath = 'collections/doctor collection.json';

        //Go to Collections and import Collection
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName,fileCPath);
        //Extraer ID
        //navHelper.navigateToProcessPage();
        cy.wait(5000);
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName);


        cy.url().then(url => {
            const collection_id = url.split('/')[4].trim();

            //Step 1: Create Data connector
            const name = new Date().getTime()+"Doctor Collection";
            const type = "Bearer Token";
            const resourceName ="CreateRecord";
            const URL= Cypress.env('URL')+"api/1.0/collections/"+collection_id+"/records";
            const method= "POST";
            const token = result_token;
            const description = 'test_2308';
            const connectorType = "REST Service";

            navHelper.navigateToDataConnectorPage();
            addDataConnector.createADataConnector(name, description, type, connectorType);
            addDataConnector.addResourceForBearerToken(resourceName, description, method, URL, token);

            //Step 2: addDataConnector.enterBody();
            cy.xpath('//a[text()="Body"]').should('be.visible').click();
            cy.get('.h-100 > .no-user-select > .overflow-guard > .monaco-scrollable-element > .lines-content > .view-lines').type('{"data": {"ciDoctor": "{{ciDoctor}}","nameDoctor": "{{nameDoctor}}","speciality": "{{speciality}}","lastNameDoctor": "{{lastNameDoctor}}"}}', {parseSpecialCharSequences:false});
            cy.wait(2000);
            cy.xpath("//text()[contains(.,'Save')]/ancestor::button[1]").click();

            //Step 3: Import the process
            const ProcessName = 'TCP4-2308 Process for verifying the output information saved by data connector';
            const filePath = 'processes/TCP4-2308 Process for verifying the output information saved by data connector.json';
            const taskName = 'Form Task';

            navHelper.navigateToProcessPage();
            process.verifyPresenceOfProcessAndImportProcess(ProcessName,filePath);

            //Step 4: Open Process and complete configuration
            navHelper.navigateToProcessPage();
            execution.completeConfigurationProcessTCP42308(ProcessName,name);

            //Step 5: Start a request
            navHelper.navigateToRequestsPage();
            request.openNewRequest(ProcessName);
            request.openTaskByTaskName(taskName);

            //Step 6: Complete form
            execution.completeformTCP42308();
            cy.wait(5000);

            //Step 7: Review data of collection
            navHelper.navigateToCollectionPage();
            execution.reviewCollectionTCP42308(collectionName);
        });
    });
});