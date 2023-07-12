import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2312',  () =>{
               
        //Step 1: Creating User
        navHelper.navigateToAdminUserPage();
        var username = "user-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var firstName = "teresa " + timeStamp;
        var lastName = "Velasco " + timeStamp;
        var jobTitle = "QA";
        var status = "Active";
        var email = "teresa+"+timeStamp+"@gmail.com";
        var password = "Colosa123";
        admin.createUser(username, firstName, lastName, jobTitle, status, email, password);

        //Step 2: Creating group
        navHelper.navigateToAdminGroupPage();
        var nameGroup = "group-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var descriptionGroup = "description-" + timeStamp;
        admin.createGroup(nameGroup,descriptionGroup);

        //Step 3: Assign user to group
        admin.addUserToGroup(firstName);

        //Step 4: Assign persmission to group
        var permissionsProcess = ["create","view","edit"];
        admin.addPermissionProcessToGroup(permissionsProcess);

        //Step 5: Log out
        navHelper.navigateToLogOut();

        //Step 6: Log in with the user created
        login.navigateToUrl();
        login.login(username,password);

        //Step 7: Log in with the user created
        navHelper.navigateToProcessPage();

        //Step 8: Create a process
        var nameProcess = "QA-Process-2312"+ timeStamp;
        var descriptionProcess = "Created for testing purpose";
        process.createProcess(nameProcess, descriptionProcess);
        cy.wait(5000); 

        //Step 9: Search of process and Edit a process
        navHelper.navigateToProcessPage();
        process.searchForProcess(nameProcess);
       
    });
});