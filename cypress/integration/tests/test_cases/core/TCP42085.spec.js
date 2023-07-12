import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();
const process = new Process();
const request = new Requests();
const admin = new Admin();

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
   
    let processName = "TCP4-2085 Check magic variables in a process";
    let processPath = "processes/TCP4-2085 Check magic variables in a process.json";
    let requestId
    let processId
    let userId
    let timeStamp = new Date().getTime();
    const userName= `UserNameTCP42085`;
    const firstName = "FirstNameTCP42085";
    const lastName = "LastNameTCP42085";
    const fullName =firstName+" "+lastName;
    const jobTitle = "QA";
    const status = "ACTIVE";
    const userEmail = "TCP42085@gmail.com";
    const password = "Colosa123";

    const userPhone = '+1 213-485-2121'
    const userFax = '555-123-4567'
    const userCell = '34 91 0606 111'
    const userAddress = '200 N. Spring Street Los Angeles CA 90012 United States'
    const userCity = 'Los Angeles CA'
    const userState = 'California'
    const userPostal = '90012'

    it("TCP4-2085 User creation and edit profile", () => {
        //Step 1: User Create 
        //Creation of a user to validate the screen variables.
        navHelper.navigateToAdminUserPage();
        admin.createUserIfNotExist(
            userName,
            firstName,
            lastName,
            jobTitle,
            status,
            userEmail,
            password
        );
        //Step 2:Edit Profile User and verify data.
        navHelper.navigateToAdminUserPage();
        admin.searchUserAndEdit(userName);
        execution.addDataInUserTCP42085ProfileAndMakeSuperAdminUser(
            userPhone,
            userCell,
            userFax,
            userAddress,
            userCity,
            userState,
            userPostal);
        cy.url().then((url) => {
            userId = url.split("/")[5].trim();
        }); 
          //Save changes in User Profile
          admin.saveChagesInProfile();   
      });          
    it("TCP4-2085 Import the process and configure", () => { 
        //Step 3: Import the process and configure
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
    it("TCP4-2085 Retrieving the process Id of the process and request", () => { 
        //Step 4: Retrieving the process Id
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        cy.url().then((url) => {
            processId = url.split("/")[4].trim();
        });
        //Step 5: Log in with user created and start the request
        //Log out of Admin
        navHelper.navigateToLogOut();
        //Log in with user created
        login.login(userName, password);
        //Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.openRequestById(requestId);
            request.clickOnTaskName(1, 1);
        //Step 6: Validations
        execution.actionsAndAssertionsTCP42085(
                requestId,
                processName,
                processId,
                userName,
                fullName,
                userId,
                userEmail,
                userPhone,
                userCell,
                userFax,
                userCity,
                userState,
                jobTitle,
                userPostal,
                firstName,
                status,
                userAddress,
            );
        });
    });        
});
   