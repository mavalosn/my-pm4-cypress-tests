import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Signals } from "../../../pages/signals";
import { Admin } from "../../../pages/admin";
const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const signals = new Signals();
const admin = new Admin();
describe("ProcessMaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2320', async () => {
        navHelper.navigateToSettings();
        admin.openUserSignalTab();
        admin.setUpdateSignal();
        navHelper.navigateToProcessPage();
        cy.wait(5000);
        var processName = "TCP4-2320 Signal user update";
        var filePath = "processes/TCP4-2320 Signal user update.json";
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        navHelper.navigateToSignals();
        cy.wait(5000);
        var signalName = 'user_update';
        var signalId = 'user_update';
        signals.searchSignal(signalName,signalId);
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
        navHelper.navigateToAdminUserPage();
        cy.wait(5000);
        admin.updateUser(username);
        cy.wait(5000);
        navHelper.navigateToAllRequests();
        cy.xpath('//div[@id="requests-listing"]//tbody/tr[1]/td[2]').should('have.text', processName);
    });
});