import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";
import { Scripts } from "../../../pages/scripts";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const request = new Requests();
const script = new Scripts();

describe("TCP4-2316 Verify Loops in Manual Tasks and Script Task using variable from Script Task", () => {
    const processName = 'TCP4-2316 Verify Loops in Manual Tasks and Script Task using variable from Script Task';
    const filePath = 'processes/TCP4-2316 Verify Loops in Manual Tasks and Script Task using variable from Script Task.json';
    const taskName = 'ManualTask1';
    const scriptName = 'Verify Loops in Manual Tasks and Script Task using variable from Script Task';
    let requestID;

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        login.navigateToUrl();
        login.login();
    });
    it("Configure process and script task", () => {
        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        //Search process
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        let permissionObject = {type:"User", user:"admin", firstName:"Admin", lastName:"User"};
        process.verifyConfigOfStartEventAndConfig("StartEvent1", permissionObject);
        process.saveProcessWithoutVersion();
        navHelper.navigateToScriptPage();
        let scriptPermission = {user:"admin", firstName:"Admin", lastName:"User", "scriptExecutor":"php - PHP Executor", "description":"test description", timeout:"60", "enableApiAccess":0}
        script.verifyPresenceOfScriptAndConfigureScript(scriptName, scriptPermission);
    });

    it('Obtain Request ID',async()=>{
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.wait(2000);
        cy.reload();
        requestID = await request.getRequestID();
    });

    it('verify results',()=>{
        for(let i = 0; i < 8 ;i++){
            navHelper.navigateToRequestsPage();
            //open request
            request.processIsInprogress(requestID);
            //verify amount tasks
            cy.xpath('//div[@id="pending"]//div[@class="data-table"]//tbody/tr').should('have.length',8-i);
            //Open task 
            request.openTaskByTaskName(taskName);
            //press Complete button
            cy.xpath('//button[contains(text(),"Complete Task")]').click();
        }

        //verify that main request was completed
        request.verifyRequestisCompleted(requestID);

        //click Summary tab
        cy.xpath('//li/a[@id="summary-tab"]').click();

        //Verify values
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(0).should('have.text','date');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(1).should('have.text','8');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(2).should('have.text','array.0');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(3).should('have.text','0');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(4).should('have.text','array.1');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(5).should('have.text','1');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(6).should('have.text','array.2');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(7).should('have.text','2');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(8).should('have.text','array.3');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(9).should('have.text','3');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(10).should('have.text','array.4');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(11).should('have.text','4');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(12).should('have.text','array.5');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(13).should('have.text','5');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(14).should('have.text','array.6');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(15).should('have.text','6');

        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(16).should('have.text','array.7');
        cy.xpath('//div[@id="summary"]//table/tbody/tr/td').eq(17).should('have.text','7');
    });
});

