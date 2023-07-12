import { Login } from "../../../../pages/login";
import { NavigationHelper } from "../../../../helpers/navigationHelper";
import { Admin } from "../../../../pages/admin";
import { Requests } from "../../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const request = new Requests();

describe("Processmaker Test Cases", () => {
  beforeEach(() => {
      login.navigateToUrl();
      login.login();
  });
 
  it("Download File", () => {
      //Assertion Create User
      navHelper.navigateToAdminUserPage();
      admin.searchForUser('admin');
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="admin"]/ancestor::tr/td/div//button/i', 10);
      cy.xpath('//span[text()="admin"]/ancestor::tr/td/div//button/i').click({force:true});
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="Edit User"]', 10);
      cy.xpath('//span[text()="Edit User"]').click({force:true});
      cy.xpath('//a[text()="Security Logs"]').click();
      cy.xpath('//button[@id="downloadLogUser"]').should('be.visible').click();
  });
});
