import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Admin } from "../../../pages/admin";
import { Screens } from "../../../pages/screens";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();
const admin = new Admin();
const screens = new Screens();
describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
   
    let processName = "TCP4-2514 Verify that the pmql of a nested select list with another select list works correctly";
    let processPath = "processes/TCP4-2514 Verify that the pmql of a nested select list with another select list works correctly.json";
    let collectionName1 = "TCP42514collectionStudents";
    let collectionFilePath1 = "collections/tcp42514collectionstudents.json";
    let collectionName2 = "TCP42514collectionPriceStudents";
    let collectionFilePath2 = "collections/tcp42514collectionpricestudents.json";
    let requestId;
    
       
    it("TCP4-2514 Import the process and configure", () => { 
        //Step 1: Import the process and configure
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Process Manager
            {
                elemName: "Process Manager",
                label: "Process Manager",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath,
            parameterList
        );
    });
    it("TCP4-2514 Import the collections", () => { 
        //Step 2: Import collections
        //Import collection 1
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName1, collectionFilePath1); 
        //Import collection 2
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName2, collectionFilePath2); 
    });

    it("TCP4-2514 Configure data connector in select list control in screen", () => { 
        //Step 3: Configure data connector in select list control
        //Open screen
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.openScreenofElementFromModeler("Form Task","FormTask");
        //Edit screen
        //Select data connector for "students" Select List control
        cy.xpath("(//div[@class='card'])[1]").click();
        screens.clickOnDataSource();
        screens.selectDataConnector(collectionName1);
        screens.selectTheEndPoint("ListAll");
        screens.saveTheChanges('Form');
        //Select data connector for "product" Select List control
        cy.xpath("(//div[@class='card'])[2]").click();
        screens.clickOnDataSource();
        screens.selectDataConnector(collectionName2);
        screens.selectTheEndPoint("ListAll");
        screens.saveTheChanges('Form');
    });  
    it("TCP4-2514 Configure data connector in select list control in screen", () => { 
        //Step 4: Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1); 
            //First scenario
            execution.actionsAndAssertionsTCP42514('lupita','11');
            //Second scenario
            execution.actionsAndAssertionsTCP42514('carla','2');
            cy.get('button[aria-label="New Submit"]').click();
            //verify that request was completed
            request.verifyRequestisCompleted(requestId);
        });

    });              
});
   