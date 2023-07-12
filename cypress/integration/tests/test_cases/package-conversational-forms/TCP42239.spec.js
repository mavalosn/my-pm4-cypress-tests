import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import {Execution} from "../../../pages/execution";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    
    
    it("Import Process", () => {
        var processName = "TCP4-2239 Verify Conversational Screen and Send Email";
        var filePath = "processes/TCP4-2239 Verify Conversational Screen and Send Email.json";
  
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
    
    it("TCP4-2239 Verify Conversational Screen and Send Email Part 1", () => {       
        execution.actionsAndAssertionsOfTCP42239A();        
           });
    
    it("TCP4-2239 Verify Conversational Screen and Send Email Part 2", () => {       
        execution.actionsAndAssertionsOfTCP42239B();      
               });
    });  
  

