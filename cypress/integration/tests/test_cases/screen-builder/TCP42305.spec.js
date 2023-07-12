import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import { Execution} from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import admin from "../../../selectors/admin";
import { Header } from "../../../pages/header";

const login = new Login();
const navHelper = new NavigationHelper();
const header = new Header();
const process = new Process();
const request = new Requests();
const execution = new Execution();
const adminPage = new Admin();

describe("TCP4 - 2305 Date picker  Max Min record List in nested screen qa", () => {
    
    var taskName1 = "FormTask1";
    var taskName2 = "FormTask2";
    var processName = "TCP4-2305 Date picker  Max Min record List in nested screen qa";
    var filePath = "processes/TCP4-2305 Date picker  Max Min record List in nested screen qa.json";
    var username = "userTCP4_2305";
    var firstName = "TPC4 2305";
    var lastName = "test user";
    var jobTitle = "QA";
    var status = "Active";
    var email = "tcp4_2305@gmail.com";
    var password = "Colosa123";
    
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    })
    it('Config process and Create a user (If that user was not created)',()=>{
        login.navigateToUrl();
        login.login();
        //Step 1: Create user.
        navHelper.navigateToAdminUserPage();
        adminPage.createUserIfNotExist(username, firstName, lastName, jobTitle, status, email, password);

        //Step 2: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        let permissionObject = {type:"User", user:username, firstName:firstName, lastName:lastName};
        process.verifyConfigOfStartEventAndConfig("StartEvent1", permissionObject);
        cy.wait(5000)
        process.saveProcessWithoutVersion();
        header.logout();
    })

    it('Scenario 1 TCP4-2305',() =>{
        login.navigateToUrl();
        login.login(username,password);

        var timeStamp = new Date();
        var yearVar = timeStamp.getFullYear();
        var monthVar = timeStamp.getMonth();
        const literalMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const nrosMonths = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        //Step 2: Create a Request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);   
        request.openTaskByTaskName(taskName1);

        //Step 3: fill datepicker
        execution.actionsOfTCP2305(yearVar,literalMonths[monthVar]);
        cy.reload()

        //Step 4: Open the next Task
        request.openTaskByTaskName(taskName2);

        //Step 5:Verify datepickers 
        execution.assertionsOfTCP2305(yearVar,nrosMonths[monthVar]);
    });
});