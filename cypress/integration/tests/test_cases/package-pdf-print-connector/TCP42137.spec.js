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

    before(()=>{
        login.navigateToUrl();
        login.login();
    });

    it.only('TCP4 - 2137', () =>{
        let processName = "TCP4-2137 Verify Request Data using parent configuration in record list and loops";
        let filePath = "processes/TCP4-2137 Verify Request Data using parent configuration in record list and loops.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);

        //Step 2: Execute the process
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            specific.actionsAndAssertionsOfTCP42137(requestId);
        });
    });
});