import "cypress-file-upload";
import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();

describe("Processmaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4 - 2346 Verify Download Process Modeler (BPMN) and import (XML) of a process", () => {
        //Upload BPMN File in creation of a Process
        navHelper.navigateToProcessPage();
        const timeStamp = new Date().getTime();
        const nameProcess = `Process${timeStamp}`;
        const descriptionProcess = `${timeStamp}Description`;
        const category = "Uncategorized";
        const pathFileXML = "bpmnProcesses/TCP4-2346.xml";
        process.createProcessWithBPMNFile(
            nameProcess,
            descriptionProcess,
            category,
            pathFileXML
        );
        process.verifyNameProcess(nameProcess);
        //Download File in creation of a Process
        navHelper.navigateToProcessPage();
        process.searchProcessAndSelectOptions(nameProcess, "export");
        navHelper.navigateToAdminPage();
        var concat = "./cypress/downloads/" + nameProcess + ".json";
        cy.log(concat);
        process.verifyProcessInDownloadsFolder(concat, nameProcess);
    });
});
