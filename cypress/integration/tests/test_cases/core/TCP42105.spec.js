import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import { Admin } from "../../../pages/admin";
import selectorsAdmin from "../../../selectors/admin";
import {Screens} from "../../../pages/screens";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const request = new Requests();
const admin = new Admin();
const screen = new Screens();

describe("Processmaker Test Cases", () => {

    let processName = "TCP4-2105 Verify a self service task with interstitial using the Lock assignment option returning with an exclusive gateway";
    let filePath = "processes/TCP4-2105 Verify a self service task with interstitial using the Lock assignment option returning with an exclusive gateway.json";
       
    it('Verify and Import Process',() =>{
        login.navigateToUrl();
        login.login();

        //verify process imported
        navHelper.navigateToProcessPage();

        let parameterList = [
            //To Start Event
            {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
            //Edit
            {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];

        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);
    });

    it('Create Users',() =>{
        login.navigateToUrl();
        login.login();
        navHelper.navigateToAdminUserPage();
        admin.createUserIfNotExist('pabloAdmin', 'User', 'With Out Permission', 'philosopher', 'ACTIVE', 'userWithOutPermission@gmail.com', 'pabloAdmin123#');    
        cy.visit('/admin/users');
        admin.searchUserName('pabloAdmin');
        cy.xpath('//div/a[text()="Permissions"]').click();
        cy.xpath('//label[text()="Make this user a Super Admin"]/parent::div/input[@type="checkbox"]').check({force:true});
        cy.xpath('//button[@id="savePermissions"]').click();
    });

    it('Execution TCP4-2105 Verify a self service task with interstitial using the Lock assignment option returning with an exclusive gateway',() =>{
        //Start a request
        login.navigateToUrl();
        login.login();
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then(url => {
            var requestId = url.split('/')[4].trim();
            request.clickOnTaskName(1, 1);
            execution.actionsAndAssertionsOfTCP42105(requestId);      
        });
    });
});
   
