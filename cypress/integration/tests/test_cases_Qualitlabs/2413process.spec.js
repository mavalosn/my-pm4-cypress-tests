import { Login } from "../../pages/login";
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Header } from "../../pages/header";
import { Requests } from "../../pages/requests";
import { Specific } from "../../pages/specific";
import { Screens } from "../../pages/screens";
import { Dataconnectors } from "../../pages/dataConnectors";
import { Admin } from "../../pages/admin";
import { Scripts } from "../../pages/scripts";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const specific = new Specific();
const screens = new Screens();
const dataconnector = new Dataconnectors();
const admin = new Admin();
const scripts = new Scripts();
describe("ProcessMaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
        login.changeLanguageToEnglishAndDateType();
    });

    it.only('TCP4 - 2413', () => {
        let process_name = "TCP4-2413 Verify Record Lists and Visibility";
        let name = process_name;
        let filepath = "processes/TCP4-2413 Verify Record Lists and Visibility.json";

        //Step 1: Import process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(process_name, filepath);

        //Step 2: Import collection
        let collectionName = "BooksCollection";
        let collectionFilePath = "collections/bookscollection.json";
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName, collectionFilePath);

        //Step 3: Configure data connector to the selectlist
        navHelper.navigateToProcessPage();
        process.searchForProcess(process_name);
        process.openScreenofElementFromModeler("Form Task","AA");
        cy.get('[data-cy="toolbar-page"]').select('1');
        cy.xpath("(//div[@class='card'])[1]").click();
        screens.clickOnDataSource();
        screens.selectDataConnector(collectionName);
        screens.selectTheEndPoint("ListAll");
        screens.saveTheChanges('Form');

        //Step 4: Create request
        header.clickOnAddRequest();
        header.searchWithProcessName(name);
        header.clickOnStart(name);
        cy.url().then(url => {
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42413(requestId);
        });
    });

});
