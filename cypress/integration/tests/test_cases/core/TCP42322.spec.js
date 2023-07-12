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

    it('TCP4 - 2322', async () => {
        navHelper.navigateToSettings();
        admin.openUserSignalTab();
        admin.setReadSignal();
        navHelper.navigateToProcessPage();
        cy.wait(5000);
        var processName = "TCP4-2322 Signal user read";
        var filePath = "processes/TCP4-2322 Signal user read.json";
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        navHelper.navigateToSignals();
        cy.wait(5000);
        var signalName = 'user_read';
        var signalId = 'user_read';
        signals.searchSignal(signalName,signalId);
        navHelper.navigateToAdminUserPage();
        navHelper.navigateToProfile();
        cy.wait(5000);
        admin.readUser();
        cy.wait(5000);
        navHelper.navigateToAllRequests();
        cy.xpath('//div[@id="requests-listing"]//tbody/tr[1]/td[2]').should('have.text', processName);
    });
});