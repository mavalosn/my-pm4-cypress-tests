import { Login} from "../../pages/login";
import { Process } from "../../pages/process";
import { NavigationHelper } from "../../helpers/navigationHelper";

const login = new Login();
const process = new Process();
const navigationHelper = new NavigationHelper();

describe("Processmaker Test Cases", () => {

    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });


    // 1. To import a process without configuration
    it ('1. To import a process without configuration', () =>{
        var processName = "process test config importation";
        var filePath = "processes/process test config importation.json";

        //Step 1: ***************Import the process***************
        navigationHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);
        // ***************FIN***************
    });


    // 2. To import a process with configuration and without configuration on the modeler
    it ('2. To import a process with configuration and without configuration on the modeler', () =>{
        var processName = "process test config importation";
        var filePath = "processes/process test config importation.json";

        //Step 1: ***************Import the process and config***************
        navigationHelper.navigateToProcessPage();
        let parameterList = [
            //To Start Event 1
            {elemName: "Start Event", label:"startEvent1",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Event 2
            {elemName: "Start Event", label:"startEvent2",user:"143CA2ED5",firstName:"143CA2ED5", lastName:"143CA2ED5"},
            //To Script
            {elemName: "Script", label:"TCP4-2331 Verify Script API and Image",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"142B35DCA",firstName:"dgsgf", lastName:"dgsgf"},
            //To Cancel Request
            {elemName: "Cancel Request", label:"Cancel Request",user:"142B35DCA",firstName:"dgsgf", lastName:"dgsgf"},
            //To Edit Data
            {elemName: "Edit Date", label:"Edit Data",user:"142B35DCA",firstName:"dgsgf", lastName:"dgsgf"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"INACTIVE"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);
        // ***************FIN***************
    });



    // 3. To import a process with configuration and with configuration on the modeler
    it ('To import a process with configuration and with configuration on the modeler', () =>{
        var processName = "process test config importation";
        var filePath = "processes/process test config importation.json";

        //Step 1: ***************Import the process and config***************
        navigationHelper.navigateToProcessPage();
        let parameterList = [
            //To Start Event 1
            {elemName: "Start Event", label:"startEvent1",user:"admin",firstName:"Admin", lastName:"User"},
            //To Start Event 2
            {elemName: "Start Event", label:"startEvent2",user:"143CA2ED5",firstName:"143CA2ED5", lastName:"143CA2ED5"},
            //To Script
            {elemName: "Script", label:"TCP4-2331 Verify Script API and Image",user:"admin",firstName:"Admin", lastName:"User"},
            //To Process Manager
            {elemName: "Process Manager", label:"Process Manager",user:"142B35DCA",firstName:"dgsgf", lastName:"dgsgf"},
            //To Cancel Request
            {elemName: "Cancel Request", label:"Cancel Request",user:"142B35DCA",firstName:"dgsgf", lastName:"dgsgf"},
            //To Edit Data
            {elemName: "Edit Date", label:"Edit Data",user:"142B35DCA",firstName:"dgsgf", lastName:"dgsgf"},
            //To Start Status
            {elemName: "Status", label:"Status",state:"ACTIVE"},
        ];
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath,parameterList);
        // ***************FIN***************


        //Step 2: ***************Config in modeler***************
        navigationHelper.navigateToProcessPage();
        process.searchForProcess(processName);

        // a1) -----------------config the first data connector
        let elementName = "connector1";
        let dataConnectorName = "collection 5966 4.1.27 28";
        let resource =  "PUT: UpdateRecord";
        process.verifyConfigOfDataConnectorAndConfig(elementName,dataConnectorName, resource);

        // a2) -----------------config the second data connector
        elementName = "connector2";
        dataConnectorName = "ApiStarWarsPao";
        resource =  "GET: character";
        process.verifyConfigOfDataConnectorAndConfig(elementName,dataConnectorName, resource);

        // b1) -----------------config startEvent1 with user
        let permissionObject = {type:"User", user:"143CA2ED5", firstName:"143CA2ED5", lastName:"143CA2ED5"};
        process.verifyConfigOfStartEventAndConfig("startEvent1", permissionObject);

        // b2) -----------------config startEvent2 with group
        permissionObject = {type:"Group", groupName:"groupPao"};
        process.verifyConfigOfStartEventAndConfig("startEvent2", permissionObject);
        // ***************FIN***************


        //Step 3: ***************Save the configuration in the process***************
        process.saveProcessWithoutVersion();
        // ***************FIN***************
    });


    afterEach( () => {
        navigationHelper.navigateToLogOut();
    });

});