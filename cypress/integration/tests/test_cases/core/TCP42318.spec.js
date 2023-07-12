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

    it('TCP4 - 2318', async () => {
        navHelper.navigateToSettings();
        admin.openUserSignalTab();
        admin.setCreateSignal();
        navHelper.navigateToProcessPage();
        cy.wait(5000);
        var processName = "TCP4-2318 Signal user create";
        var filePath = "processes/TCP4-2318 Signal user create.json";
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        navHelper.navigateToSignals();
        cy.wait(5000);
        var signalName = 'user_create';
        var signalId = 'user_create';
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

        navHelper.navigateToAllRequests();
        cy.xpath('//div[@id="requests-listing"]//tbody/tr[1]/td[2]').should('have.text', processName);
    });
});