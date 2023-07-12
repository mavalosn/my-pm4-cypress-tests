import { Login } from "../../pages/login";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Admin } from "../../pages/admin"

const login = new Login();
const admin = new Admin();
const navHelper = new NavigationHelper();

describe("ProcessMaker Test Cases", () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    });
    let nameAliasEmail = Cypress.env("smptEmailServer");
    let serverEmailSetup = {
        //To SMTP configuration
        type:'smtp',
        aliasEmail:nameAliasEmail,
        senderEmail: 'testqa@mailtrap.com',
        senderName: 'testqa@mailtrap.com',
        serverHost: 'smtp.mailtrap.io',
        serverPort: '25',
        option: 'tls',
        user: Cypress.env('mailTrap_smtpUser'),
        password: Cypress.env('mailTrap_smtpPassword')
    };
    it('Verify if SMTP server exists',()=>{
        navHelper.navigateToSettings();
        admin.createEmailServerIfNotExist(serverEmailSetup)
    })
});