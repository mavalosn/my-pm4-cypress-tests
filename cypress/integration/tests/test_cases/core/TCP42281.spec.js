import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";
import selectorsAdmin from "../../../selectors/admin";
import { Admin } from "../../../pages/admin";



const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();
const admin = new Admin();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        cy.url().should('match', /login/);
        login.login();
    });
    
    
    it("Import Process", () => {
        var processName = "TCP4-2281 Verify Node Connector";
        var filePath = "processes/TCP4-2281 Verify Node Connector.json";
  
        navHelper.navigateToProcessPage();
        let parameterList = [
          //To Start Event
          {elemName: "Start Event", label:"StartEvent",user:"admin",firstName:"Admin", lastName:"User"},
          //To Script
          {elemName: "Script", label:"Simple Script",user:"admin",firstName:"Admin", lastName:"User"},
          //To Process Manager
          {elemName: "Process Manager", label:"Process Manager",user:"admin",firstName:"Admin", lastName:"User"},
          //To Edit Data
          {elemName: "Edit Date", label:"Edit Data",user:"admin",firstName:"Admin", lastName:"User"},
          //To Start Status
          {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];  
        
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath, parameterList);
    });
    
    it("TCP4-2281 Verify Node Connector Part 1", () => {       
        execution.actionsAndAssertionsOfTCP42281Part1();        
           });
    
    it("TCP4-2281 Verify Node Connector Part 2", () => {       
        execution.actionsAndAssertionsOfTCP42281Part2();        
            });
    
    it("TCP4-2281 Verify Node Connector Part 3", () => {       
        execution.actionsAndAssertionsOfTCP42281Part3();        
            });   
    });  
  

