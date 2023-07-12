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
    let nameMenu = `01Menu-0${timeStamp}`;
    it("TCP4 - 2259 : Verify Dynamic UI Header Menu for a single user", () => {
        const username = `UserTCP42259`;
        const firstName = `0000000000-FirstNameTCP42259`;
        const lastName = `LastName`;
        const jobTitle = "QA";
        const status = "Active";
        const email = "emailTCP42259+" + "@gmail.com";
        const password = "Colosa123";

        //Step 1: Menu "01" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu, descriptionMenu);
        //Step 2: Add links "A" and "B" to menu "01"
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
        admin.selectMenuToUser(nameMenu);
        //Save changes in User Profile
        admin.saveChagesInProfile();
        //Log out of Admin
        navHelper.navigateToLogOut();
        //Step 4:Checking the assigned menu links on the home page of the created user
        //Log in with user created
        login.login(username, password);
        execution.verifyLinksCreatedInTopMenu(url1, url2);
    });
    it("Delete Menu Created", () => {
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu);
    });
});