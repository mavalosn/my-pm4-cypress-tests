import { TaskFunctionsSE } from "../../../pages/taskFunctionsSE";
import {Utility} from "../../../pages/utility";

const taskFunctionsSE = new TaskFunctionsSE();
const utility = new Utility();
describe("Intensify CAOS 1.0.0 - Account Opening - Pre-fill and Send to Client", () => {

    beforeEach(()=>{});
    let processName = "Open A Business Account";
    let requestMain;
    let requestId;
    let taskName;
    /*it('CAOS 1.0.0 - Account Opening', () =>{
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
        taskFunctionsSE.startBusinessAccountPreFillTaskCAOSIntensify();
        
        //Step 5: Complete Account Application
        taskFunctionsSE.accountAplicationTaskPreFillCAOSIntensify();
    });
    });
    it('CAOS 1.0.0 - Create Portal Profile and Account Application', () =>{
        //Step 6: Complete Account Application Sub-Process
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Create Portal Profile",1);
          cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.completeOneTimePasswordAuthorizationForChange(requestId);
            taskFunctionsSE.createPortalProfilePreFillTaskCAOSIntensify(); 
            utility.openRequestNewUserByDashboard();
            taskFunctionsSE.accountAplicationTaskPreFillReviewCAOSIntensify();
        });
    });*/
    it('CAOS 1.0.0 - Account Application Review', () =>{
        //Step 7: Complete Account Application Review Sub-Process
        requestMain=6899;
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Account Application Review",3);
        cy.reload();
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.goToRequest(requestId);
            utility.loginBankerUser();
            cy.reload();
            taskName = "Application Summary";
            utility.openTask(taskName);
            taskFunctionsSE.accountApplicationReviewTaskCAOSIntensify(requestId);        
        });
    });
    it('CAOS 1.0.0 - Account Application BSA Review', () =>{
        //Step 8: Account Application BSA Review And Aprove
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Account Application Review",3);
        cy.reload();
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.loginBsaOffiserUser();
            utility.goToRequest(requestId);
            cy.reload();
            taskName = "BSA Review";
            utility.openTask(taskName);
            taskFunctionsSE.accountApplicationReviewBSAApproveReviewTaskCAOSIntensify();
        });
    });
    it('CAOS 1.0.0 - Account Application Review Second Part', () =>{
        //Step 9: Complete Account Application Review Sub-Process
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Account Application Review",3);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.goToRequest(requestId);
            utility.loginBankerUser();
            cy.reload();
            taskName = "Due Diligence";
            utility.openTask(taskName);
            taskFunctionsSE.accountApplicationReviewSecondPartTaskCAOSIntensify(requestId);
        });
    });
    afterEach(()=>{
    });
});