import { Login } from "../../../pages/login"
import { Process } from "../../../pages/process";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";

const login = new Login();
const process = new Process();
const navHelper = new NavigationHelper();
const execution = new Execution();
const request = new Requests();
const tasks = new Tasks();

describe("ProcessMaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let processName = "TCP4-2076 Verify Request Data in sub-process";
    let filePath = "processes/TCP4-2076 Verify Request Data in sub-process.json";
    let subProcessName1 = 'Sub Process Psychology';
    let subProcessFilePath1 = 'processes/Sub Process Psychology.json';
    let subProcessName2 = 'Sub Process Languages';
    let subProcessFilePath2 = 'processes/Sub Process Languages.json';
    let name1 = 'Amanda';
    let name2 = 'Berenice';
    let name3 = 'Carla';
    let name4 = 'Damian Fabian';
    let name5 = 'German';
    let lastName = 'Perez';
    //score students
    let scoreS1T1='70';
    let scoreS1T2='80';
    let scoreS1T3='90';

    let scoreS2T1='100';
    let scoreS2T2='80';
    let scoreS2T3='70';

    let scoreS3T1='60';
    let scoreS3T2='75';
    let scoreS3T3='85';

    let scoreS4T1='80';
    let scoreS4T2='95';
    let scoreS4T3='100';

    let scoreS5T1='65';
    let scoreS5T2='85';
    let scoreS5T3='95';

    it("TCP4-2076 Import Process,subprocesses and configure in modeler", () => {
        //Step 1: Import process and subprocesses
        //Import the main process 
        navHelper.navigateToProcessPage();
        let parameterList = [
            {
                elemName: "Process Manager",
                label: "Process Manager",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            filePath,
            parameterList
        );
        //Import the Sub Process 1
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(subProcessName1,subProcessFilePath1);
        //Import the Sub Process 2
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(subProcessName2,subProcessFilePath2);
        //Step 2: Add subprocesses to main process in Modeler
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        //Add Sub Process 1
        process.verifyConfigOfSubProcessAndConfig('SubPsychology',subProcessName1,'Start Event'); 
        process.saveProcessWithoutVersion();
        //Add Sub Process 2
        process.verifyConfigOfSubProcessAndConfig('SubLanguages',subProcessName2,'Start Event');
        process.saveProcessWithoutVersion();
    });
    it("TCP4-2076 fill form in First Scenario", () => {
        //Step 3: Go to Web entry and fill form
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Step 4: Fill the screen First Scenario
        execution.actionsAndAssertionsTCP42076(0,name1,name2,name3,name4,name5,lastName);
    });
    it("TCP4-2076 validations in First Scenario", () => {
        //Validation 1: Verify "Psychology grade" task appears in the task tray
        navHelper.navigateToTasksPage();
        let PMQLPsychology = 'task= "Psychology grade"';
        tasks.searchTaskByPMQL(PMQLPsychology);
        cy.xpath('//table//tr[1]//td[1]//a').click();
        //Validation 2: Verify that all data in the previous task was recovered
        execution.validationRecoverAllDatainTask(name1,name2,name3,name4,name5,lastName);
        //Validation 3: Put score for each students
        //execution.fillScoreForEachStudent();
        execution.fillScoreForEachStudent(0,scoreS1T1,scoreS1T2,scoreS1T3);
        execution.fillScoreForEachStudent(1,scoreS2T1,scoreS2T2,scoreS2T3);
        execution.fillScoreForEachStudent(2,scoreS3T1,scoreS3T2,scoreS3T3);
        execution.fillScoreForEachStudent(3,scoreS4T1,scoreS4T2,scoreS4T3);
        execution.fillScoreForEachStudent(4,scoreS5T1,scoreS5T2,scoreS5T3);
        //Validation 4: Press Submit button and  visualize the record of notes
        cy.get('button[aria-label="Submit"]').click();
        execution.validationDataInTable(
            name1,name2,name3,name4,name5,lastName,
            scoreS1T1,scoreS1T2,scoreS1T3,
            scoreS2T1,scoreS2T2,scoreS2T3,
            scoreS3T1,scoreS3T2,scoreS3T3,
            scoreS4T1,scoreS4T2,scoreS4T3,
            scoreS5T1,scoreS5T2,scoreS5T3); 
    });
    it("TCP4-2076 fill form in Second Scenario ", () => {
        //Step 5: Go to Web entry and fill form
        navHelper.navigateToProcessPage();
        process.searchForProcess(processName);
        process.goToWebEntry();
        //Step 6: Fill the screen First Scenario
        execution.actionsAndAssertionsTCP42076(1,name1,name2,name3,name4,name5,lastName);
    });
    it("TCP4-2076 validations in Second Scenario", () => {
        //Validation 1: Verify "Languages grade" task appears in the task tray
        navHelper.navigateToTasksPage();
        let PMQLLanguages = 'task= "Languages grade"';
        tasks.searchTaskByPMQL(PMQLLanguages);
        cy.xpath('//table//tr[1]//td[1]//a').click();
        //Validation 2: Verify that all data in the previous task was recovered
        execution.validationRecoverAllDatainTask(name1,name2,name3,name4,name5,lastName);
        //Validation 3: Put score for each students
        //execution.fillScoreForEachStudent();
        execution.fillScoreForEachStudent(0,scoreS1T1,scoreS1T2,scoreS1T3);
        execution.fillScoreForEachStudent(1,scoreS2T1,scoreS2T2,scoreS2T3);
        execution.fillScoreForEachStudent(2,scoreS3T1,scoreS3T2,scoreS3T3);
        execution.fillScoreForEachStudent(3,scoreS4T1,scoreS4T2,scoreS4T3);
        execution.fillScoreForEachStudent(4,scoreS5T1,scoreS5T2,scoreS5T3);
        //Validation 4: Press Submit button and  visualize the record of notes
        cy.get('button[aria-label="Submit"]').click();
        execution.validationDataInTable(
             name1,name2,name3,name4,name5,lastName,
             scoreS1T1,scoreS1T2,scoreS1T3,
             scoreS2T1,scoreS2T2,scoreS2T3,
             scoreS3T1,scoreS3T2,scoreS3T3,
             scoreS4T1,scoreS4T2,scoreS4T3,
             scoreS5T1,scoreS5T2,scoreS5T3);
    });
});