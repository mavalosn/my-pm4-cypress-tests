import { Login } from "../../../../pages/login"
import { Process } from "../../../../pages/process";
import { NavigationHelper } from "../../../../helpers/navigationHelper";
import { Header } from "../../../../pages/header";
import { Requests } from "../../../../pages/requests";
import { Screens } from "../../../../pages/screens";
import { RequiredExecution } from "../../../../pages/requiredFieldExecution"

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const request = new Requests();
const header = new Header();
const screens= new Screens();
const requiredExecution = new RequiredExecution();

describe("ProcessMaker Test Cases", () => {

    beforeEach(()=>{
        login.navigateToUrl();
        login.login();
    });

    let processName = "we_requiredFields";
    let filePath = "processes/TCP4-2889_we_requiredFields.json";
    let requestId;

    it('Import the process ', () =>{
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
    });

    it('TCP4-2889 Verify Required field for controls in a Web Entry',()=>{
       //Execute Web Entry
       navHelper.navigateToProcessPage();
       process.searchForProcess(processName);
       process.goToWebEntry();
       requiredExecution.verifyWERequiredFields();
    })

    it('TCP4-2890 verify Required Fields Message in a Web Entry',()=>{
       navHelper.navigateToProcessPage();
       process.searchForProcess(processName);
       process.goToWebEntry();
       requiredExecution.verifyWERequiredFieldsMessage();
    })
})