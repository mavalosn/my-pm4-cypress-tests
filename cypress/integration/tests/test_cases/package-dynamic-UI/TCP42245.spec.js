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
    it("TCP4 - 2245 : Verify Dynamic UI Dashboard Menu for a single user", () => {
        //Step 1: Import the ScreenTCP4-2245
        navHelper.navigateToScreensPage();
        let screenName = "001ScreenTCP4-2245";
        let filePath = "screens_data/001ScreenTCP4-2245.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenName, filePath);

        //Step 2: Dashboard Creation
        let timeStamp = new Date().getTime();
        const username = `UserTCP42245`;
        const firstName = `FirstNameTCP42245`;
        const lastName = `LastName`;
        const jobTitle = "QA";
        const status = "Active";
        const email = "email+" + "@gmail.com";
        const password = "Colosa123";

        navHelper.navigateToAdminPage();
        let nameDashboard = `${timeStamp}-DashboardTCP42245`;
        let descriptionDashboard = `DescriptionScreenTCP42245`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboard, screenName, descriptionDashboard);

        //Step 3: User Creation and Edit Profile
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
        //Edit Profile User
        navHelper.navigateToAdminUserPage();
        admin.searchUserAndEdit(username);
        //Select Dashboard option in Home Page
        admin.selectMyDashboardInHomePage();
        //Assign Dashboard to User in User Profile
        admin.selectDashboardToUser(nameDashboard);
        //Save changes in User Profile
        admin.saveChagesInProfile();

        //Step 4: Verify Dashboard in Home Page of the user created
        //Logout
        navHelper.navigateToLogOut();
        //Log in with the user
        login.navigateToUrl();
        login.login(username, password);
        //Verify Dashboard with the User
        execution.verifyDashboardContentTCP42245;

        //Step 5: Delete de Dashboard created
        //Logout
        navHelper.navigateToLogOut();
        //Log in with the Admin User
        login.navigateToUrl();
        login.login("admin", "admin");
        //Delete Dashboard
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboard);
    });
});
