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
    it("TCP4 - 2323 : Verify Customize UI with two users in a group", () => {
        // navHelper.navigateToAdminPage();
        let timeStamp = new Date().getTime();
        const userA = `00000000000000UserA-00000000000${timeStamp}`;
        const userB = `00000000000000UserB-00000000000${timeStamp}`;
        const firstNameA = `00000000000000FirstNameA-000000000000${timeStamp}`;
        const firstNameB = `00000000000000FirstNameB-000000000000${timeStamp}`;
        const lastNameA = `LastNameA-000000000000${timeStamp}`;
        const lastNameB = `LastNameB-000000000000${timeStamp}`;
        const jobTitle = "QA";
        const status = "Active";
        const emailA = "emailA+" + timeStamp + "@gmail.com";
        const emailB = "emailB+" + timeStamp + "@gmail.com";
        const password = "Colosa123";

        //User "A" Creation
        navHelper.navigateToAdminUserPage();
        admin.createUser(
            userA,
            firstNameA,
            lastNameA,
            jobTitle,
            status,
            emailA,
            password
        );
        //User "B" Creation
        navHelper.navigateToAdminUserPage();
        admin.createUser(
            userB,
            firstNameB,
            lastNameB,
            jobTitle,
            status,
            emailB,
            password
        );

        //import screenA
        navHelper.navigateToScreensPage();
        let screenNameA = "00000000000000A";
        let filePathA = "screens_data/00000000000000A.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenNameA, filePathA);

        //import screenB
        navHelper.navigateToScreensPage();
        let screenNameB = "00000000000000B";
        let filePathB = "screens_data/00000000000000B.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenNameB, filePathB);

        //Dashboard "A" Creation
        let nameDashboardA = `000000000000000DashboardA-000000000000${timeStamp}`;
        let descriptionDashboardA = `DescriptionScreenA`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboardA, screenNameA, descriptionDashboardA);

        //Dashboard "B" Creation
        let nameDashboardB = `000000000000000DashboardB-000000000000${timeStamp}`;
        let descriptionDashboardB = `DescriptionScreenB`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboardB, screenNameB, descriptionDashboardB);

        //Menu "A" Creation
        navHelper.navigateToAdminCustomizePage();
        let nameMenuA = `000000000000000MenuA-000000000000${timeStamp}`;
        let descriptionMenuA = `DescriptionScreenA`;
        admin.addMenu(nameMenuA, descriptionMenuA);

        //Add link to Menu A
        admin.searchMenu(nameMenuA);
        admin.editMenu("LinkA", `${Cypress.config().baseUrl}/requests`);

        //Menu "B" Creation
        navHelper.navigateToAdminCustomizePage();
        let nameMenuB = `000000000000000MenuB-000000000000${timeStamp}`;
        let descriptionMenuB = `DescriptionScreenB-${timeStamp}`;
        admin.addMenu(nameMenuB, descriptionMenuB);

        //Add link to Menu B
        admin.searchMenu(nameMenuB);
        admin.editMenu("LinkB", `${Cypress.config().baseUrl}/processes`);

        //GroupAB Creation
        navHelper.navigateToAdminGroupPage();
        let nameGroup = `000000000000GroupAB-000000000000${timeStamp}`;
        let description = `DescriptionGroupAB`;
        admin.createGroup(nameGroup, description);

        //Assign user A to group AB
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup);
        admin.addUserToGroup(firstNameA);

        //Assign user B to group AB
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup);
        admin.addUserToGroup(firstNameB);

        //Edit User Profile UserA
        navHelper.navigateToAdminUserPage();
        admin.searchUserAndEdit(userA);
        // Select Dashboard option in Home Page
        admin.selectMyDashboardInHomePage();
        // Assign DashboardA to UserA
        admin.selectDashboardToUser(nameDashboardA);
        //Assign MenuA to UserA
        admin.selectMenuToUser(nameMenuA);
        //Save changes in UserA Profile
        admin.saveChagesInProfile();

        //Edit User Profile UserB
        navHelper.navigateToAdminUserPage();
        admin.searchUserAndEdit(userB);
        // Select Dashboard option in Home Page
        admin.selectMyDashboardInHomePage();
        // Assign DashboardB to UserB
        admin.selectDashboardToUser(nameDashboardB);
        //Assign MenuB to UserB
        admin.selectMenuToUser(nameMenuB);
        //Save changes in UserB Profile
        admin.saveChagesInProfile();

        //Logout
        navHelper.navigateToLogOut();

        //Log in with the userA
        login.navigateToUrl();
        login.login(userA, password);
        //Verify Dashboard with the UserA
        execution.verifyDashboardWithUser("Dashboard A", "LinkA");
        //Logout
        navHelper.navigateToLogOut();

        //Log in with the userB
        login.navigateToUrl();
        login.login(userB, password);
        //Verify Dashboard with the UserB
        execution.verifyDashboardWithUser("Dashboard B", "LinkB");

        //LogOut
        navHelper.navigateToLogOut();

        //Log in with the Admin User
        login.navigateToUrl();
        login.login("admin", "admin");

        //Delete Dashboard A
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboardA);
        //Delete Dashboard B
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboardB);

        //Delete Menu A
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenuA);
        //Delete Menu B
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenuB);
        cy.wait(4000);
    });
});
