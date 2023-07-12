import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let timeStamp = new Date().getTime();
    let descriptionMenu = `Description`;
    let nameMenu = `01Menu2260-0${timeStamp}`;
    let nameGroup = `0Group2260-0${timeStamp}`;
    let descriptionGroup = `DescriptionGroup`;
    it("TCP4 - 2260 : Verify Dynamic UI Header Menu for a Group", () => {
        const username = `UserTCP42260`;
        const firstName = `0000000000-FirstNameTCP42260`;
        const lastName = `LastName`;
        const jobTitle = "QA";
        const status = "Active";
        const email = "emailTCP42260+" + "@gmail.com";
        const password = "Colosa123";

        //Step 1: Menu Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu, descriptionMenu);
        //Step 2: Add links "A" and "B" to Menu
        const linkText1 = "LinkA";
        const iconName1 = "fire";
        const color1 = "success";
        const url1 = "https://www.duck.com"
        const linkText2 = "LinkB";
        const iconName2 = "star";
        const color2 = "danger";
        const url2 = "https://www.google.com";
        //Add link A to Menu
        admin.searchMenu(nameMenu);
        admin.goToEditMenu();
        admin.addLinkToMenu(linkText1, iconName1, color1, url1);
        //Add link B to Menu
        admin.addLinkToMenu(linkText2, iconName2, color2, url2);
        //Step 3: Group Creation
        navHelper.navigateToAdminGroupPage();
        admin.createGroup(nameGroup, descriptionGroup);
        //Step 4: Assign Menu to Group
        admin.selectMenuToGroup(nameMenu);
        admin.saveChagesInGroupDetails();
        //Step 5: User Creation
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
        //Step 6: Assign User to Group
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup);
        admin.addUserToGroup(firstName);
        //Step 7:Checking the assigned menu links on the Group
        //Log out of Admin user
        navHelper.navigateToLogOut();
        //Login with a user assigned to the created Group
        login.login(username, password);
        execution.verifyLinksCreatedInTopMenu(url1, url2);
    });
    it("Delete Menu and Group Created", () => {
        //Delete Menu
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu);
        //Delete Group
        navHelper.navigateToAdminGroupPage();
        admin.deleteGroup(nameGroup);
    });
});
