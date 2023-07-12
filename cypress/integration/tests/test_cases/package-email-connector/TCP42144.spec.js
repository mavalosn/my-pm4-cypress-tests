import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Admin } from "../../../pages/admin";
import { Requests } from "../../../pages/requests";
import 'cypress-iframe';

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const admin = new Admin();
const request = new Requests();

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();        
    });
    
    let processName = "TCP4-2144 Verify Script Task Request Data PDF Generator and Send Email _parent";
    let filePath = "processes/TCP4-2144 Verify Script Task Request Data PDF Generator and Send Email _parent.json";

    const getIframeBody = () => {
        return cy
        .get('iframe[allowfullscreen="allowfullscreen"]')
        .its('0.contentDocument.body').should('not.be.empty')
        .then(cy.wrap)
    };

   
    it("Verify and Import Process", () => {
        //Import the Process
        navHelper.navigateToProcessPage();
        let parameterList = [
            //To Start Event
            {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
            //To Script
            {elemName: "Script", label:"TCP4-2144 Verify Script Task Request Data PDF Generator and Send Email _parent",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"}
        ];
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList); 
    });

    
    it("TCP4-2144 Verify Script Task Request Data PDF Generator and Send Email _parent", () => {
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url =>{
            request.waitUntilElementIsVisibleCant('selector', "[class='py-3 d-flex']",1);
            request.clickOnTaskName(1, 1);
            var requestId = url.split('/')[4].trim();
            execution.actionsAndAssertionsOfTCP42144(requestId);
            getIframeBody().find('div[id="textLayer1"]').should('be.visible');
            getIframeBody().find('div[id="textLayer1"] > div').eq(0).should('have.text', 3);
            getIframeBody().find('div[id="textLayer1"] > div').eq(1).should('have.text', 3);
        });
    });       
});
