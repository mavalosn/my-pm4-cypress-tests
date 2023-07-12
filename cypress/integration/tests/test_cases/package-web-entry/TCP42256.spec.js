import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";

const request = new Requests();
const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();

describe("TCP4 - 2256 Verify Web Entries in Form Tasks", () => {

    var processName = 'TCP4-2256 Verify Web Entries in Form Tasks';
    var processPath = 'processes/TCP4-2256 Verify Web Entries in Form Tasks.json';
    var taskNameA = 'taskA';
    var taskNameB = 'taskB';
    var taskNameC = 'taskC';
    var emailTest = "tcp4_2256@endtest-mail.io";
    var requestID;
    
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    })

    it('Configure Main Process',() => {  
        login.navigateToUrl();
        login.login();
        //import process
        let parameterList = [
            //To Start Event 1
            {elemName: "Start Event", label:"StartEventA",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Event 2
            {elemName: "Start Event", label:"startEventB",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //To Cancel Request
            {elemName: "Cancel Request", label:"Cancel Request",user:"admin",firstName:"Admin", lastName:"User"},
            //To Edit Data
            {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('#processIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box').type(processName).should('have.value', processName);
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');

        cy.xpath('//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if($loadedTable.length === 1){
                    process.importProcess(processPath);
                    process.configProcessImported(parameterList);
                    navHelper.navigateToProcessPage();
                    process.searchForProcess(processName);
                    let setupSendEmail = {emailServer:"Default Email Server",subject:"TCP4-2256 - Send Email - {{}{{}_request.id{}}{}}", body:"Plain Text", text:`${Cypress.config().baseUrl}/requests/webentry/request/{{}{{} _request.id {}}{}}/node_12`};
                    //let setupSendEmail = {emailServer:"Mail Trap",subject:"TCP4-2256 - Send Email - {{}{{}_request.id{}}{}}", body:"Plain Text", text:`${Cypress.config().baseUrl}/requests/webentry/request/{{}{{} _request.id {}}{}}/node_12`};
                    process.verifyConfigOfSendEmailAndConfig('SendEmail1', setupSendEmail);                
                    let value = {email:emailTest,nro:0, create:0};
                    process.configRecipientSendEmail('Email Address',value);

                    //start Event 1
                    let permissionObject = {type:"User", user:"admin", firstName:"Admin", lastName:"User"};
                    process.verifyConfigOfStartEventAndConfig('StartEventA',permissionObject);

                    //start Event 2
                    process.verifyConfigOfStartEventAndConfig('startEventB',permissionObject);
                    
                    cy.wait(5000)
                    process.saveProcessWithoutVersion();
                }

            });
            navHelper.navigateToLogOut();
    });

    it('configure email notification for Task B',()=>{
        login.navigateToUrl();
        login.login();
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //setup email notification for TaskB
        let setupEmailNotification = {emailServer:"",subject:"TCP4-2256 - Send Email - {{}{{}_request.id{}}{}}", body:"text", text:`${Cypress.config().baseUrl}/requests/webentry/request/{{}{{} _request.id {}}{}}/node_12`, nro:0, sentAt:'task-end'};
        process.validateAndConfigEmailNotification(taskNameB,setupEmailNotification);
        let valueEmailNotification = {email:emailTest,nro:0, create:0};
        process.configRecipientEmailNotification('Email Address',valueEmailNotification);
        cy.wait(1000)
        process.saveProcessWithoutVersion();
        navHelper.navigateToLogOut();
    });

    it('delete email',() => {
        cy.visit('https://app.endtest.io/mailbox?email='+emailTest+'&action=delete');
        cy.get('body').should('have.text',"Deleted all emails sent to "+emailTest);
    });

    it('first validation', async() =>{
        login.navigateToUrl();
        login.login();
        //createCase(processName,0);
        navHelper.navigateToRequestsPage();
        request.openNewRequestByNumberStartButton(processName, 0);
        cy.wait(2000);
        cy.reload();
        requestID = await request.getRequestID();
        cy.wait(5000);
        cy.reload();
        cy.xpath('//tbody/tr/td/a[contains(text(),"taskA")]').should('be.visible');
        navHelper.navigateToLogOut();
        cy.wait(10000)
        const sentArgs = { id: requestID,email: emailTest};
        cy.origin('https://endtest.io', { args: sentArgs }, ({ id, email }) => {
            cy.log("..."+id+"..."+email);
            var emailTitle = 'TCP4-2256 - Send Email - '+id;
            var visitUrl = 'https://app.endtest.io/mailbox?email='+email;
            cy.visit(visitUrl);
            cy.get("div[class='email_list'] > div > div[class='email_subject']").should('have.text',emailTitle);
            cy.get("div[class='email_list'] > div[class='email_item']").click();
            //cy.get("div[class='email-body center-block']").should('have.contain',emailTitle);
        });
        cy.xpath('//div[@class="container"]//div[@name="email"]//div[@class="form-group"]/div/div').invoke('text').then(($text)=>{
            cy.visit($text);
            cy.xpath('//label[text()="Input"]/following-sibling::input[@name="input"]').type('input');
            cy.xpath('//label[text()="Textarea"]/following-sibling::textarea[@name="textarea"]').type('textarea');
            cy.contains('button','New Submit').click();
        });
    });
  
    it('second validation', async () => {
        login.navigateToUrl();
        login.login();
        //createCase(processName,1);
        navHelper.navigateToRequestsPage();
        request.openNewRequestByNumberStartButton(processName, 1);
        cy.wait(2000);
        cy.reload();
        requestID = await request.getRequestID();
        request.openTask(taskNameB);
        cy.xpath('//label[text()="Input"]/following-sibling::input[@name="input"]').type('input');
        cy.xpath('//label[text()="Textarea"]/following-sibling::textarea[@name="textarea"]').type('textarea');
        cy.contains('button','New Submit').click();
        request.verifyTaskIsCompleted();
        request.openRequestById(requestID);
        request.openTask(taskNameC);
        cy.contains('button','New Submit').click();
        //Verify summary tab
        cy.xpath('//table[@role="table"]/tbody/tr/td').eq(0).should('have.text','input');
        cy.xpath('//table[@role="table"]/tbody/tr/td').eq(1).should('have.text','input');
        cy.xpath('//table[@role="table"]/tbody/tr/td').eq(2).should('have.text','textarea');
        cy.xpath('//table[@role="table"]/tbody/tr/td').eq(3).should('have.text','textarea');
    });
});