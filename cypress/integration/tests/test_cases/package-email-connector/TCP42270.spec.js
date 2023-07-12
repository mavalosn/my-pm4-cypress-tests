import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";
import selectorsAdmin from "../../../selectors/admin";
import {ExternalEmails} from "../../../pages/emails";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const admin = new Admin();
const emails = new ExternalEmails();


describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });
    
    var processName = "TCP4-2270 Verify Send Email Manual Task Script Task";
    var filePath = "processes/TCP4-2270 Verify Send Email Manual Task Script Task.json";
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

    it('Verify if SMTP (mailtrap) server exists',()=>{
        navHelper.navigateToSettings();
        admin.createEmailServerIfNotExist(serverEmailSetup);
    })

   it("Verify and Import Process", () => {    
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"TCP4-2270 Verify Send Email Manual Task Script Task Script A",user:"admin",firstName:"Admin", lastName:"User"},
           //To Script
          {elemName: "Script", label:"TCP4-2270 Verify Send Email Manual Task Script Task Script B",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"}
         ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });

    it("Configure Mail Server in Process", () => {
        var textBodyEmail = "";
        navHelper.navigateToProcessPage();          
          process.searchForProcess(processName);
          //setup email notification
          let setupEmailNotificationA = {emailServer:nameAliasEmail,subject:"Bank - Send Email A {{}{{}_request.id{}}{}}", body:"screen", text:textBodyEmail, nro:0, sentAt:'task-end'};
          let setupEmailNotificationB = {emailServer:nameAliasEmail,subject:"Bank - Send Email B {{}{{}_request.id{}}{}}", body:"screen", text:textBodyEmail, nro:0, sentAt:'task-end'};
          process.verifyConfigOfSendEmailAndConfig("SendEmailA",setupEmailNotificationA);
          let valueEmailNotificationA = {email:'testqa@2242.qa',nro:0, create:0}; 
          process.configRecipientSendEmail('Email Address',valueEmailNotificationA);
          cy.wait(2000);
          process.saveProcessWithoutVersion();
          process.verifyConfigOfSendEmailAndConfig("SendEmailB",setupEmailNotificationB); 
          let valueEmailNotificationB = {email:'testqa@2242.qa',nro:0, create:0};
          process.configRecipientSendEmail('Email Address',valueEmailNotificationB);
          cy.wait(2000);
          process.saveProcessWithoutVersion();
      });

      const getIframeBody = () => {
        return cy
        .get('iframe[data-test-id="message_view_iframe"]')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
      } 
 
    it("TCP4-2270 Verify Send Email Manual Task Script Task", () => {         
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            cy.reload();
            request.waitUntilElementIsVisible('xpath', '//td/a[contains(text(), "Form Task")]', 'Form Task A');
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42270(requestId);
        });
            cy.xpath('//li[@class="breadcrumb-item active"]/a').invoke('text').then((text) => {
            var requestID = request.getRequestID();
            cy.wrap(requestID).then((title) => {
                 var emailA = "Bank - Send Email A "+title;
                 navHelper.navigateToLogOut();
                 emails.loginMailTrap();
                 emails.goToInboxesMenuMailTrap();
                 emails.searchInboxInTheListMailTrap();
                 emails.searchEmailBySubjectAndOpenMailTrap(emailA);
                 getIframeBody().find('div[name="Vouched Invite Notification"]').should('exist');
                 cy.reload();
                 var emailB = "Bank - Send Email B "+title;
                 emails.loginMailTrap();
                 emails.goToInboxesMenuMailTrap();
                 emails.searchInboxInTheListMailTrap();
                 emails.searchEmailBySubjectAndOpenMailTrap(emailB);
                 getIframeBody().find('div[name="Vouched Invite Notification"] > div div > p').eq(0).should('contain.text', "Dear Pablo,");
                 getIframeBody().find('div[name="Vouched Invite Notification"] > div div > p').eq(1).should('contain.text', "We noticed you are yet to complete your Identity Verification.");
                 getIframeBody().find('div[name="Vouched Invite Notification"] > div div > p').eq(2).should('contain.text', "ASSAM is ASSAM KERELA is KERELA ORRISA is ORRISA Israel Japan Germany");
                 getIframeBody().find('div[name="Vouched Invite Notification"] > div div > p').eq(3).should('contain.text', "Thank you!");    
             });
        });  
    });
});
