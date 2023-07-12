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
    it('TCP4 - 2409', () => {
        //Go to Admin
        navHelper.navigateToAdminUserPage();
        //Creating User
        var username = "TestPM-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var firstName = "TestPM" + timeStamp;
        var lastName = "TestPM" + timeStamp;
        var jobTitle = "QA";
        var status = "Active";
        var email = "testpm+"+timeStamp+"@gmail.com";
        var password = "Colosa123";
        admin.createUser(username, firstName, lastName, jobTitle, status, email, password);

        //Assign persmission to newUser

        admin.addPermissionToUser();

        //Log out
        navHelper.navigateToLogOut();

        //Log in with the user created
        login.navigateToUrl();
        login.login(username,password);
        //Step 1:
        navHelper.navigateToAdminUserPage();
        admin.searchUserName(username);
        var lan1 = "en";
        var lan2 = "es";
        var lan3 = "fr";
        var lan4 = "de";
        admin.selectLanguage(lan1);
        admin.openPermissionTab(lan1);
        admin.openInformationTab();
        admin.selectLanguage(lan2);
        admin.openPermissionTab(lan2);
        admin.openInformationTab();
        admin.selectLanguage(lan3);
        admin.openPermissionTab(lan3);
        admin.openInformationTab();
        admin.selectLanguage(lan4);
        admin.openPermissionTab(lan4);

    })
})