import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution"
import { Requests } from "../../../pages/requests";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();
const request = new Requests();
const process = new Process();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2183 Verify that a super administrator user can reassign a request to users with different permissions";
    let processPath = "processes/TCP4-2183 Verify that a super administrator user can reassign a request to users with different permissions.json";
    let requestId;
    let requestId2;
    let timeStamp = new Date().getTime();
    const userSA = `0UserSATCP42183`;
    const firstNameUserSA = `0UserSATCP42183`;
    const lastNameUserSA = `0lastNameUserSA`;
    const emailUserSA = "0UserSATCP42183@gmail.com";
    const user3 = `0User3TCP42183`;
    const firstNameUser3 = `0User3TCP42183`;
    const lastNameUser = `lastNameTCP42183`;
    const emailUser3 = "0user3TCP42183@gmail.com";
    const jobTitle = "testCase";
    const status = "Active";
    const password = "Colosa123";
    const nameGroup = '0ReassignTCP42183'+timeStamp;
    const description = `testCase`;


    it("TCP4 - 2183: Users creation", () => {
        //userSA creation and add superAdmin persmission to userSA
        navHelper.navigateToAdminUserPage();
        execution.createUserIfNotExistAndMakeSuperAdmin(
            userSA,
            firstNameUserSA,
            lastNameUserSA,
            jobTitle,
            status,
            emailUserSA,
            password
        );
        //User3 creation
        navHelper.navigateToAdminUserPage();
        admin.createUserIfNotExist(
            user3,
            firstNameUser3,
            lastNameUser,
            jobTitle,
            status,
            emailUser3,
            password
        );
    });
    it("TCP4 - 2183: Group creation and assign user3 to group", () => {
        //"Reassign" group creation
        navHelper.navigateToAdminGroupPage();
        admin.createGroupIfNotExist(nameGroup,description);
        //Assign user3 to group "Reassign"
        navHelper.navigateToAdminGroupPage();
        admin.searchGroupAndEdit(nameGroup);
        execution.assignUsertoGroup(user3,firstNameUser3);
    });
    it("TCP4 - 2183: Import and configure the process in modeler", () => {
        //Import the Process
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
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(processName, "edit");
        process.verifyConfigOfTaskAndConfig('FormTask1', 'User/Group', nameGroup);
        process.verifyConfigOfTaskAndConfig('FormTask2', 'User/Group', nameGroup);  
        process.saveProcessWithoutVersion();
    });
    it("TCP4 - 2183: Start request with Admin user", () => {
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            request.clickOnTaskName(1, 1);
            cy.get('input[name="form_input_1"]').type("testCase Reassign");
            cy.get('button[aria-label="New Submit"]').click();
        });
    }); 
    it('TCP4 - 2183: Request and validations "Case1" ', () => {
        //First request: Case 1
        cy.wait(3000);
        //LogOut
        navHelper.navigateToLogOut();
        //Log in with the UserSA
        login.navigateToUrl();
        login.login(userSA, password);
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestId)
        request.clickOnTaskName(1, 1);
        //Reassignment to User3
        cy.contains(
            'button[class="btn btn-outline-secondary btn-block"]',
            "Reassign"
        ).click();
        cy.get(
            'input[aria-placeholder="Select the user to reassign to the task"]'
        ).type(user3);
        let locator =
            '//span[text()="' +
            firstNameUser3 +
            " " +
            lastNameUser +
            '"]/ancestor::div//div[@class="multiselect__content-wrapper"]//li[1]';
        cy.xpath(locator)
            .should("have.attr", "aria-label")
            .and("equal", firstNameUser3 + " " + lastNameUser + ". ");
        cy.get(
            'input[aria-placeholder="Select the user to reassign to the task"]'
        ).type("{enter}");
        cy.contains('[class="btn btn-secondary ml-2"]', "Reassign").click();
        //LogOut
        navHelper.navigateToLogOut();
        //Log in with the User3
        login.navigateToUrl();
        login.login(user3, password);
        navHelper.navigateToRequestsPage();
        cy.wait(2000);
        cy.visit('/requests/' + requestId);
        request.clickOnTaskName(1, 1);
        cy.get('button[aria-label="New Submit"]').click();
    });
    it('TCP4 - 2183: Request and validations "Case2"', () => {
        //Second request: Case 2
        cy.wait(3000);
        //LogOut
        navHelper.navigateToLogOut();
        //Log in with the UserSA
        login.navigateToUrl();
        login.login(userSA, password);
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId2 = url.split("/")[4].trim();
            request.clickOnTaskName(1, 1);
            cy.get('input[name="form_input_1"]').type("testCase Reassign");
            cy.get('button[aria-label="New Submit"]').click();
            navHelper.navigateToRequestsPage();

            //Reassigned to Admin user
            request.openRequestById(requestId2)
            request.clickOnTaskName(1, 1);
            cy.contains(
                'button[class="btn btn-outline-secondary btn-block"]',
                "Reassign"
            ).click();
            cy.xpath(
                '//h5[text()="Reassign to"]//parent::header//parent::div//input'
            )
                .click({ force: true })
                .type("Admin")
                .should("have.value", "Admin");
            cy.xpath(
                '//h5[text()="Reassign to"]//parent::header//parent::div//div[@class="multiselect__content-wrapper"]//li[1]'
            )
                .should("have.attr", "aria-label")
                .and("equal", "Admin User. ");
            cy.xpath(
                '//h5[text()="Reassign to"]//parent::header//parent::div//input'
            ).type("{enter}");
            cy.contains('[class="btn btn-secondary ml-2"]', "Reassign").click();
        });
    });
    it("TCP4 - 2183: Log in with the Admin User", () => {
        //Log in with the Admin User
        navHelper.navigateToRequestsPage();
        request.openRequestById(requestId2);
        cy.log(requestId2)
        request.clickOnTaskName(1, 1);
        cy.get('button[aria-label="New Submit"]').click();
    });
});