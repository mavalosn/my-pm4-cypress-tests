import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
import selectorsAdmin from "../../../selectors/admin";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";
import { getDate } from "date-fns";
import {ExternalEmails} from "../../../pages/emails";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const admin = new Admin();
const request = new Requests();
const emails = new ExternalEmails();


describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();  
        
    });
    let requestID;
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
        var processName = "TCP4-2242 Process Files Attach";
        var filePath = "processes/TCP4-2242 Process Files Attach.json";

        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Edit Data
          {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"},
        ]; 
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });
    
    it("Configure Mail Server in Process", () => {
      var processName = "TCP4-2242 Process Files Attach";
      var textBodyEmail = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <title>HTML Elements Reference</title>
        </head>
        <body>              
          <h1>This is a heading</h1>
          <p>This is a paragraph.</p>
                  
        </body>
        </html>`;

      navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //setup email notification
        let setupEmailNotification = {emailServer:nameAliasEmail,subject:"Subject 1 {{}{{}_request.id{}}{}}", body:"text", text:textBodyEmail, nro:0, sentAt:'task-end'};
        process.verifyConfigOfSendEmailAndConfig("SendEmail1",setupEmailNotification); 
        let valueEmailNotification = {email:'testqa@2242.qa',nro:0, create:0};
        process.configRecipientSendEmail('Email Address',valueEmailNotification);
        cy.wait(2000)
        process.saveProcessWithoutVersion();
    });
    
   it("create Request",async()=>{
    request.openNewRequest("TCP4-2242 Process Files Attach");
    requestID = await request.getRequestID();
   });
    it("Execution and Verify TCP4-2242 Process Files Attach", () => {
        execution.actionsAndAssertionsOfTCP42242(requestID);
        cy.xpath('//li[@class="breadcrumb-item active"]/a').invoke('text').then((text) => {
            var requestID = request.getRequestID();
            cy.wrap(requestID).then((title) => {
              var email = "Subject 1 "+title;
              navHelper.navigateToLogOut();
              emails.loginMailTrap();
              emails.goToInboxesMenuMailTrap();
              emails.searchInboxInTheListMailTrap();
              emails.searchEmailBySubjectAndOpenMailTrap(email);
            });
            cy.xpath('//button[@aria-controls="messageAttachmentsList"]').click();
            cy.xpath('(//div[@id="messageAttachmentsList"]/div[@role="menu"]/a/span)[1]').should('include.text',"attachment");
            cy.xpath('(//div[@id="messageAttachmentsList"]/div[@role="menu"]/a/span)[3]').should('contain.text', "origenes.jpg");
            cy.xpath('(//div[@id="messageAttachmentsList"]/div[@role="menu"]/a/span)[5]').should('contain.text', "sanagustin.jpg");
            cy.xpath('(//div[@id="messageAttachmentsList"]/div[@role="menu"]/a/span)[7]').should('contain.text', "sanambrosio.jpg");
        });  
      });  
});