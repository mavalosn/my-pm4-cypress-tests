import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();
const process = new Process();
const header = new Header();
const request = new Requests();
describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2301 : Process for verifying the tagging of different users", () => {
        let timeStamp = new Date().getTime();
        const userA = `${timeStamp}UserA`;
        const userB = `${timeStamp}UserB`;
        const firstNameA = `${timeStamp}FirstNameA`;
        const firstNameB = `${timeStamp}FirstNameB`;
        const lastNameA = `${timeStamp}LastNameA`;
        const lastNameB = `${timeStamp}LastNameB`;
        const jobTitle = "QA";
        const status = "Active";
        const emailA = "emailA+" + timeStamp + "@gmail.com";
        const emailB = "emailB+" + timeStamp + "@gmail.com";
        const password = "Colosa123";

        //Step 1:Creation users "A", "B"
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
        //AddPermission Notifications and Comments
        admin.addSpecificPermissionsToUser([
            {
                name: "Notifications (API)",
                create: 0,
                edit: 0,
                delete: 0,
                view: 1,
            },
            { name: "Comments", create: 1, edit: 0, delete: 1, view: 1 },
        ]);
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
        //AddPermission Notifications and Comments
        admin.addSpecificPermissionsToUser([
            {
                name: "Notifications (API)",
                create: 0,
                edit: 0,
                delete: 0,
                view: 1,
            },
            { name: "Comments", create: 1, edit: 0, delete: 1, view: 1 },
        ]);

        //Step 2: Import the process
        var processName =
            "TCP4-2301 Process for verifying the tagging of different users";
        var filePath =
            "processes/TCP4-2301 Process for verifying the tagging of different users.json";
        navHelper.navigateToProcessPage(); 
        process.verifyPresenceOfProcessAndImportProcess(processName, filePath);

        //Step 3: Start a request and Tag User "A"
        navHelper.navigateToProcessPage();
        navHelper.navigateToRequestsPage();
        header.clickOnAddRequest();
        header.searchWithProcessName(processName);
        header.clickOnStart(processName);
        cy.url().then((url) => {
            var requestId = url.split('/')[4].trim();
            cy.log(requestId);
            request.clickOnTaskName(1, 1);
            execution.userTagger(`@${userA}`);
            //request.processIsInprogress(requestId);
            //Log out of Admin
            navHelper.navigateToLogOut();
            //Step 4: Log in with user "A" and View notifications from User "A"
            login.login(userA, password);
            //View Notifications
            header.viewNotifications();
            header.openLastNotification();
            //Reply and Tag User "B"
            execution.replyTag();
            execution.userTagger(`@${userB}`);
            navHelper.navigateToLogOut();
            //Step 5: Log in with user "B" and View notifications from User "B"
            login.login(userB, password);
            //View Notifications
            header.viewNotifications();
            header.openLastNotification();
            navHelper.navigateToLogOut();
            //Step 6: Log in with user admin and View notifications
            login.login("admin", "admin");
            navHelper.navigateToRequestsPage();
            request.openRequestById(requestId);
            //request.openRequestByName(processName);
            execution.clickInFormTask();
            execution.viewLoadReply();
            execution.verifyTaggedUsers(`@${userA}`, `@${userB}`);
            cy.contains('button[aria-label="New Submit"]', "New Submit")
                .should("be.visible")
                .click();
        });
    });
});
