import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();

describe("ProcessMaker Test Case", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })
    it('TCP4 - 2334', () => {
        navHelper.navigateToAdminUserPage();
        //Creating User
        var timeStamp = new Date().getTime();
        var username = "TestPM-" + timeStamp;
        var firstName = "TestPM" + timeStamp;
        var lastName = "TestPM" + timeStamp;
        var jobTitle = "QA";
        var status = "Active";
        var email = "testpm+"+timeStamp+"@gmail.com";
        var password = "Sample123";
        admin.createUser(username, firstName, lastName, jobTitle, status, email, password);

        //admin.searchUserName(username);
        admin.switchChangePassword();
        admin.addPermissionToUser();
        
        navHelper.navigateToLogOut();
        login.navigateToUrl();
        login.loginPasswordChanged(username,password);
        var newPassword = "SampleNew123";
        login.setNewPassword(username,newPassword);

    })
})