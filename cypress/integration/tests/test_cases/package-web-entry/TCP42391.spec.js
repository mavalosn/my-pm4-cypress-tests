import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2391',  () =>{
        //Import process
        var nameProcess = "TCP4-2391 Loop required";
        var filePath = "processes/TCP4-2391 Loop required  web entry.json";
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(nameProcess,filePath);

        //Enter to the Web Entry
        navHelper.navigateToProcessPage();
        process.searchForProcess(nameProcess);
        process.goToWebEntry();

        //Execution of the process (execution class)
        execution.actionsAndAssertionsOfTCP42391A();       
    });
});