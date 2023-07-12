import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Screens } from "../../../pages/screens";
import { Execution } from "../../../pages/execution";
const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const screens = new Screens();
const execution = new Execution();
describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2246: Verify Dynamic UI Dashboard Menu for a group", () => {
        //Step 1: Import the ScreenTCP4-2246
        navHelper.navigateToScreensPage();
        let screenName = "000ScreenTCP4-2246";
        let filePath = "screens_data/000ScreenTCP4-2246.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenName, filePath);

        //Step 2: Dashboard Creation
        let timeStamp = new Date().getTime();
        const username = `UserTCP42246`;
        const firstName = `0000000000-FirstNameTCP42246`;
        const lastName = `LastName`;
        const jobTitle = "QA";
        const status = "Active";
        const email = "email+" + "@gmail.com";
        const password = "Colosa123";
        navHelper.navigateToAdminPage();
        let nameDashboard = `${timeStamp}-DashboardTCP42246`;
        let descriptionDashboard = `DescriptionScreenTCP42246`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboard, screenName, descriptionDashboard);
        execution.alertBanner();

        //Step 3: User Creation
        navHelper.navigateToAdminUserPage();
        admin.createUserIfNotExist(
            username,
            firstName,
            lastName,
            jobTitle,
            status,
            email,
            password
        );

        //Group TCP42246 Creation
        navHelper.navigateToAdminGroupPage();
        let nameGroup = `${timeStamp}-GroupTCP42246`;
        let description = `DescriptionGroupTCP42246`;
        admin.createGroup(nameGroup, description);
        //Assign user to group
        admin.addUserToGroup(firstName);
        //Edit Profile Group
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup);
        //Select Dashboard option in Home Page
        admin.selectMyDashboardInHomePageOfGroup();
        //Assign Dashboard to Group
        admin.selectDashboardToGroup(nameDashboard);
        //Save changes in User Profile
        admin.saveChagesInGroupDetails();
        //Step 4: Verify Dashboard in Home Page of the user created
        //Logout
        navHelper.navigateToLogOut();
        //Log in with the user
        login.navigateToUrl();
        login.login(username, password);
        //Verify Dashboard with the User
        execution.verifyDashboardContentTCP42246;
        //Step 5: Delete de Dashboard created
        //Logout
        navHelper.navigateToLogOut();
        //Log in with the Admin User
        login.login("admin", "admin");
        //Delete Dashboard
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboard);
        navHelper.navigateToAdminGroupPage();
        admin.deleteGroup(nameGroup);
    });
});