import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";
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
    
    var processName = "TCP4-2244 Verify Conversational Screens with PDF and Email";
    var filePath = "processes/TCP4-2244 Verify Conversational Screens with PDF and Email.json";
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
        var textBodyEmail = "";
        navHelper.navigateToProcessPage();
          process.searchForProcess(processName);
          //setup email notification
          let setupEmailNotification = {emailServer:nameAliasEmail,subject:"Subject 1 {{}{{}_request.id{}}{}}", body:"screen", text:textBodyEmail, nro:0, sentAt:'task-end'};
          process.verifyConfigOfSendEmailAndConfig("SendEmail1",setupEmailNotification); 
          let valueEmailNotification = {email:'testqa@2242.qa',nro:0, create:0};
          process.configRecipientSendEmail('Email Address',valueEmailNotification);
          cy.wait(2000)
          process.saveProcessWithoutVersion();
      });
    
      const getIframeBody = () => {
        return cy
        .get('iframe[data-test-id="message_view_iframe"]')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
      }  
    it("TCP4-2244 Verify Conversational Screens with PDF and Email", () => { 
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.clickOnTaskName(1, 1);
            var requestID = url.split('/')[4].trim();          
            execution.actionsAndAssertionsOfTCP42244(requestID);
        });           
           cy.xpath('//li[@class="breadcrumb-item active"]/a').invoke('text').then((text) => {
           var requestID = request.getRequestID();
           cy.wrap(requestID).then((title) => {
                var email = "Subject 1 "+title;
                navHelper.navigateToLogOut();
                navHelper.navigateToLogOut();
                emails.loginMailTrap();
                emails.goToInboxesMenuMailTrap();
                emails.searchInboxInTheListMailTrap();
                emails.searchEmailBySubjectAndOpenMailTrap(email);
            });

            getIframeBody().find('div[name="Verify Conversational Screens with PDF and Email Email Screen"] > div div > p').eq(0).should('contain.text', "Socrates");
            getIframeBody().find('div[name="Verify Conversational Screens with PDF and Email Email Screen"] > div div > p').eq(1).should('contain.text', "Plato");
            getIframeBody().find('div[name="Verify Conversational Screens with PDF and Email Email Screen"] > div div > p').eq(2).should('contain.text', "Aristotle");
        });
    });
  });