import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Execution } from "../../../pages/execution";
import { Screens } from "../../../pages/screens";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const screens = new Screens();
const admin = new Admin();

describe("Processmaker Test Cases", () => {

    before(() => {
        login.navigateToUrl();
        login.login();
    });

    let urlWE = "";
    let processName = "TCP4-2307 Verify Allow Query String Data in WE";
    let filePath = "processes/TCP4-2307 Verify Allow Query String Data in WE.json";
    let collectionName = "ADOA - Sates";
    let collectionPath = "collections/adoa_sates.json";

    it('TCP4-2307: Verify Allow Query String Data in WE',async() => {
        //Step 1: Import the process and Config
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

        //Step 2: Import Collection
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName,collectionPath);
        cy.wait(2000);
        navHelper.navigateToAdminPage();
        navHelper.navigateToCollectionPage();

        //Step 3: Add a watcher in the WE screen
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.openScreenofElementFromModeler("Start Event","startEvent1");
        let dataWatcher = {
            name:"w1",
            variable_name:"option",
            source:"ADOA - Sates",
            resource:"ListAll",
            output:{source:"data",variable:"res"},
        };
        screens.verifyPresenceOfWatcherAndCreateWithDataC(dataWatcher);
        screens.saveTheChanges("Form");
        //Step 2: Get WE
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        const elementStartEventXpath = "//*[text()='startEvent1']/ancestor::*[@data-type='processmaker.components.nodes.startEvent.Shape']";
        cy.xpath(elementStartEventXpath).first().should('be.visible').click();
        cy.get("[id='accordion-button-webentry']").click();
        urlWE = await process.getURLOfWebEntry() + "?data2=22&data3=333&data4=4444";

    });


    it('Execute of the process ',  () => {
        navHelper.navigateToLogOut();
        cy.visit(urlWE);
        execution.actionsAndAssertionsOfTCP42307();
    });
});