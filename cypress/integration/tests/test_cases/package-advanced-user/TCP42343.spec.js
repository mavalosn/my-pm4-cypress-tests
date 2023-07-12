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

    let nameDashboard1;
    let nameDashboard2;
    let nameDashboard3;
    let nameMenu1;
    let nameMenu2;
    let nameMenu3;

    it("TCP4 - 2343 : Verify that a user who is in five different groups has the option to navigate between five different panels and menus.", () => {
        // navHelper.navigateToAdminPage();
        let timeStamp = new Date().getTime();
        const user = `0User-0${timeStamp}`;
        const firstName = `0FirstName-0${timeStamp}`;
        const lastName = `LastName-0${timeStamp}`;
        const jobTitle = "QA";
        const status = "Active";
        const emailA = "email+" + timeStamp + "@gmail.com";
        const password = "Colosa123";

        navHelper.navigateToAdminCustomizePage();
        //delete all menus in table
        cy.get(".nav-link").contains("Menu").click();
        cy.wait(2000);
        admin.deleteAllMenus();
        //delete 5 dashboards in table
        cy.get(".nav-link").contains("Dashboard").click();
        cy.wait(2000);
        admin.deleteAllDashboards();

        //User Creation
        navHelper.navigateToAdminUserPage();
        admin.createUser(
            user,
            firstName,
            lastName,
            jobTitle,
            status,
            emailA,
            password
        );

        //import screen1
        navHelper.navigateToScreensPage();
        let screenName1 = "0000000ScreenDashboard1";
        let filePath1 = "screens_data/0000000ScreenDashboard1.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenName1, filePath1);
        //import screen2
        navHelper.navigateToScreensPage();
        let screenName2 = "0000000ScreenDashboard2";
        let filePath2 = "screens_data/0000000ScreenDashboard2.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenName2, filePath2);
        //import screen3
        navHelper.navigateToScreensPage();
        let screenName3 = "0000000ScreenDashboard3";
        let filePath3 = "screens_data/0000000ScreenDashboard3.json";
        screens.verifyPresenceOfScreenAndImportScreen(screenName3, filePath3);

        //Dashboard1 Creation
        nameDashboard1 = `0Dashboard1-0${timeStamp}`;
        let descriptionDashboard1 = `Description1`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboard1, screenName1, descriptionDashboard1);

        //Dashboard2 Creation
        nameDashboard2 = `0Dashboard2-0${timeStamp}`;
        let descriptionDashboard2 = `Description2`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboard2, screenName2, descriptionDashboard2);

        //Dashboard3 Creation
        nameDashboard3 = `0Dashboard3-0${timeStamp}`;
        let descriptionDashboard3 = `Description3`;
        navHelper.navigateToAdminCustomizePage();
        admin.addDashboard(nameDashboard3, screenName3, descriptionDashboard3);

        //Menu "1" Creation
        navHelper.navigateToAdminCustomizePage();
        nameMenu1 = `0Menu1-0${timeStamp}`;
        let descriptionMenu1 = `Description1`;
        admin.addMenu(nameMenu1, descriptionMenu1);
        //Add link to Menu 1
        admin.searchMenu(nameMenu1);
        admin.editMenu("Link1", `${Cypress.config().baseUrl}/requests`);

        //Menu "2" Creation
        navHelper.navigateToAdminCustomizePage();
        nameMenu2 = `0Menu2-0${timeStamp}`;
        let descriptionMenu2 = `Description2-${timeStamp}`;
        admin.addMenu(nameMenu2, descriptionMenu2);
        //Add link to Menu 2
        admin.searchMenu(nameMenu2);
        admin.editMenu("Link2", `${Cypress.config().baseUrl}/designer`);

        //Menu "3" Creation
        navHelper.navigateToAdminCustomizePage();
        nameMenu3 = `0Menu3-0${timeStamp}`;
        let descriptionMenu3 = `Description3`;
        admin.addMenu(nameMenu3, descriptionMenu3);
        //Add link to Menu 3
        admin.searchMenu(nameMenu3);
        admin.editMenu("Link3", `${Cypress.config().baseUrl}/requests`);

        //Group1 Creation
        navHelper.navigateToAdminGroupPage();
        let nameGroup1 = `0Group1-0${timeStamp}`;
        let descriptionGroup1 = `DescriptionGroup1`;
        admin.createGroup(nameGroup1, descriptionGroup1);
        //Assign Dashboard1 and menu to Group1
        admin.selectMyDashboardInHomePageOfGroup();
        admin.selectDashboardToGroup(nameDashboard1);
        admin.selectMenuToGroup(nameMenu1);
        admin.saveChagesInGroupDetails();

        //Group2 Creation
        navHelper.navigateToAdminGroupPage();
        let nameGroup2 = `0Group2-0${timeStamp}`;
        let descriptionGroup2 = `DescriptionGroup2`;
        admin.createGroup(nameGroup2, descriptionGroup2);
        //Assign Dashboard2 and menu2 to Group2
        admin.selectMyDashboardInHomePageOfGroup();
        admin.selectDashboardToGroup(nameDashboard2);
        admin.selectMenuToGroup(nameMenu2);
        admin.saveChagesInGroupDetails();

        //Group3 Creation
        navHelper.navigateToAdminGroupPage();
        let nameGroup3 = `0Group3-0${timeStamp}`;
        let descriptionGroup3 = `DescriptionGroup3`;
        admin.createGroup(nameGroup3, descriptionGroup3);
        //Assign Dashboard3 and menu3 to Group3
        admin.selectMyDashboardInHomePageOfGroup();
        admin.selectDashboardToGroup(nameDashboard3);
        admin.selectMenuToGroup(nameMenu3);
        admin.saveChagesInGroupDetails();

        //Assign user to group1
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup1);
        admin.addUserToGroup(firstName);

        //Assign user to group2
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup2);
        admin.addUserToGroup(firstName);

        //Assign user to group3
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup3);
        admin.addUserToGroup(firstName);

        navHelper.navigateToLogOut();

        //Log in with the user created
        login.navigateToUrl();
        login.login(user, password);

        //Verify Dashboard with the User
        execution.verifyDashboardsAndMenusdWithUser(
            nameDashboard1,
            nameDashboard2,
            nameDashboard3,
            nameMenu1,
            nameMenu2,
            nameMenu3
        );
    });

    it('TCP4 - 2343 : Verify that a user who is in five different groups has the option to navigate between five different panels and menus. 2 ',  ()=> {

        navHelper.navigateToLogOut();

        //Log in with the Admin User
        login.navigateToUrl();
        login.login("admin", "admin");

        //Delete Dashboard1
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboard1);
        //Delete Dashboard2
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboard2);
        //Delete Dashboard3
        navHelper.navigateToAdminCustomizePage();
        admin.deleteDashboard(nameDashboard3);

        //Delete Menu1
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu1);
        //Delete Menu2
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu2);
        //Delete Menu3
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu3);
    });

});
