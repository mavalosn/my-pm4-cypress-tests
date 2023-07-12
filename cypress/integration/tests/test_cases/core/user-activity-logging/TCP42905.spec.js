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
  it("Create Auth Client", () => {
      //Create User
      navHelper.navigateToAuthClients();
      admin.createAuthClient('TestUser', 'http://www.google.com');
    
      //Assertion Create User
      navHelper.navigateToAdminUserPage();
      admin.searchForUser('admin');
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="admin"]/ancestor::tr/td/div//button/i', 10);
      cy.xpath('//span[text()="admin"]/ancestor::tr/td/div//button/i').click({force:true});
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="Edit User"]', 10);
      cy.xpath('//span[text()="Edit User"]').click({force:true});
      cy.xpath('//a[text()="Security Logs"]').click();
      cy.xpath('(//span[text()="AuthClientCreated"]/ancestor::tr/td[@class="vuetable-slot"]/span/button)[1]').click();       
  });
  it("Update Auth Client", () => {
      //Update Auth Client
      navHelper.navigateToAuthClients();
      admin.updateAuthClient('TestUser', 'UserTest');

      //Assertion Update Auth Client
      navHelper.navigateToAdminUserPage();
      admin.searchForUser('admin');
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="admin"]/ancestor::tr/td/div//button/i', 10);
      cy.xpath('//span[text()="admin"]/ancestor::tr/td/div//button/i').click({force:true});
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="Edit User"]', 10);
      cy.xpath('//span[text()="Edit User"]').click({force:true});
      cy.xpath('//a[text()="Security Logs"]').click();
      cy.xpath('(//span[text()="AuthClientUpdated"]/ancestor::tr/td[@class="vuetable-slot"]/span/button)[1]').click();
      cy.xpath('//b[text()="- name:"]').should('be.visible');
      cy.xpath('//b[text()="+ name:"]').should('be.visible');
      cy.xpath('//b[text()="auth_client_id:"]').should('be.visible');
      cy.xpath('//span[text()="TestUser"]').should('be.visible');
      cy.xpath('//span[text()="UserTest"]').should('be.visible');               
  });
  it("Delete Authentic Client", () => {
      //Delete Authentic Client
      navHelper.navigateToAuthClients();
      cy.clearCookies();
      admin.deleteAuthClient('UserTest');

      //Assertions Delete Authentic Client
      navHelper.navigateToAdminUserPage();
      admin.searchForUser('admin');
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="admin"]/ancestor::tr/td/div//button/i', 10);
      cy.xpath('//span[text()="admin"]/ancestor::tr/td/div//button/i').click({force:true});
      request.waitUntilElementIsVisibleCant('xpath', '//span[text()="Edit User"]', 10);
      cy.xpath('//span[text()="Edit User"]').click({force:true});
      cy.xpath('//a[text()="Security Logs"]').click();
      cy.xpath('(//span[text()="AuthClientDeleted"]/ancestor::tr/td[@class="vuetable-slot"]/span/button)[1]').click(); 
  });
});
