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
    it('TCP4-2911 Verify that a PMBlock can be archived',() =>{

        let processName = "TCP4-2911_Process to archive a PM Block";
        let processPath = "processes/TCP4-2911_Process to archive a PM Block.json";
        let pmblockName = "PMBlock";

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 2: Import process
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            processPath
        );

        //Step 1: Got to Designer
        navHelper.navigateToProcessPage();

        //Step 3: Search 
        process.searchProcessAndSelectOptions(processName, "pmBlock");

        // Step 4: Create a PMBlock
        pmBlock.createPMBlock(
            "PMBlock created for test Case TCP4-2911",
            "Description for  Test Case TCP4-2911 - Archived"
        );
        // Step 5: Go to tab Pm Block
        navHelper.navigateToPmBlock();

        // Step 6: Search PmBlock created 
        //pmBlock.searchForPMBlock("PMBlock created for test Case TCP4-2911");

        // Step 7: Click on menu Pmblock and archive

        pmBlock.searchPmblockAndSelectOptions(pmblockName,"archive");
             cy.xpath('//button[text()="Confirm"]').click(); 

    });
});