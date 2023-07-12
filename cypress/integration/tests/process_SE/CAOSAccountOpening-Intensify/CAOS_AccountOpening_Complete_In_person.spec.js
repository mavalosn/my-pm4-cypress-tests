import { TaskFunctionsSE } from "../../../pages/taskFunctionsSE";
import {Utility} from "../../../pages/utility";

const taskFunctionsSE = new TaskFunctionsSE();
const utility = new Utility();
describe("Intensify CAOS 1.0.0 - Account Opening - Complete In-Person (Application edit-Decline)", () => {

    beforeEach(()=>{});
    let processName = "Open A Business Account";
    let requestMain;
    let requestId;
    let taskName;
    it('CAOS 1.0.0 - Account Application', () =>{
        //Step 1: Complete Start Event
        utility.visitIntemsify();
        utility.loginBankerUser();

        //Step 2: Create Request
        utility.createRequestByDashboard(processName);

        //Step 3: Get Number Request
        taskName = "Start Business Account";
        utility.getNumberRequest(taskName);
        cy.url().then((url) => {
            var urlA = url.split("/")[4].trim();
            requestMain = urlA.split("?")[0].trim();
            utility.openTask(taskName);
        
        //Step 4: Complete Start Business Account task
        taskFunctionsSE.startBusinessAccountTaskCAOSIntensify();

        //Step 5: Complete Account Application Sub-Process
       taskFunctionsSE.accountAplicationTaskCAOSIntensify(); 

        //Step 6: Account Application Review Sub-Process
        taskFunctionsSE.accountApplicationReviewAndEditTaskCAOSIntensify();          
    });
    });

   it('CAOS 1.0.0 - Account Application Review Edit Sub-Process',  () => {
        //Step 7: Account Application Review Sub-Process Authorization For Change
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Account Application Review",1);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.completeOneTimePasswordAuthorizationForChange(requestId);
            taskFunctionsSE.accountApplicationReviewAuthorizationForChangeTaskCAOSIntensify();
            cy.reload();
            cy.wait(5000);
        });
    });

   it('CAOS 1.0.0 - Account Application Review Summary', () =>{
        //Step 8:Account Application Review Sub-Process
        utility.visitIntemsify();
        utility.loginBankerUser();
        utility.goToRequest(requestId);
        taskName = "Application Summary";
        utility.openTask(taskName);
        taskFunctionsSE.accountApplicationReviewSummaryBeforeEditTaskCAOSIntensify();
    });

    it('CAOS 1.0.0 - Account Application BSA Review and Decline', () =>{
        //Step 9: Account Application BSA Review And Decline
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Account Application Review",1);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.loginBsaOffiserUser();
            utility.goToRequest(requestId);
            taskName = "BSA Review";
            utility.openTask(taskName);
            taskFunctionsSE.accountApplicationReviewBSAReviewTaskCAOSIntensify();
            cy.wait(2000);
        });
    });
    afterEach(()=>{
    });
});