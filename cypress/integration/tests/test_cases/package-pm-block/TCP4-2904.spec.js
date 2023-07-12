import {Login} from "../../../pages/login";
import {NavigationHelper} from "../../../helpers/navigationHelper";
import {Process} from "../../../pages/process";
import {PMBlock} from "../../../pages/pmBlock";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const pmBlock = new PMBlock();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it('TCP4-2904 Verify that a PMBlock can be created from a process imported',() =>{

        let processName = "TCP4-2904 Verify that a PMBlock can be created from a process imported";
        let processPath = "processes/TCP4-2904_Verify that a PMBlock can be created from a process imported.json";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Import process
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath
        );

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 3: Create a PMblock
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        // Step 4: Create a PMBlock
        pmBlock.createPMBlock(
            "PMBlock created  for test Case TCP4-2904",
            "Description for  Test Case TCP4-2904"
        );
        // Step 5: Go to tab Pm Block
        navHelper.navigateToPmBlock();


    });
});