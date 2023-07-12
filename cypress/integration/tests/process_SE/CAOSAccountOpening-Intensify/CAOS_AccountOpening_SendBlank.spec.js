import { TaskFunctionsSE } from "../../../pages/taskFunctionsSE";
import {Utility} from "../../../pages/utility";

const taskFunctionsSE = new TaskFunctionsSE();
const utility = new Utility();
describe("Intensify CAOS 1.0.0 - Account Opening - Send to Blank (Approve)", () => {

    beforeEach(()=>{});
    let processName = "Open A Business Account";
    let requestMain;
    let requestId;
    let taskName;

    it('CAOS 1.0.0 - Account Opening', () =>{
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
            taskFunctionsSE.startBusinessAccountSendBlankTaskCAOSIntensify();
        });
    });

    it('CAOS 1.0.0 - Create Portal Profile and Account Application', () =>{

        //Step 5: Complete Account Application Sub-Process
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Create Portal Profile",1);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.completeOneTimePasswordAuthorizationForChange(requestId);
            taskFunctionsSE.createPortalProfileTaskCAOSIntensify(); 
            utility.openRequestNewUserByDashboard();
            taskFunctionsSE.accountAplicationTaskSendBlankCAOSIntensify();
        });
    });

    it('CAOS 1.0.0 - Account Application Review', () =>{

        //Step 6: Complete Account Application Review Sub-Process
        //requestMain = 6802;
        utility.followingRequest(requestMain,"CAOS 1.0.0 - Account Application Review",3);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.goToRequest(requestId);
            utility.loginBankerUser();
            taskName = "Application Summary";
            utility.openTask(taskName);
            taskFunctionsSE.accountApplicationReviewTaskCAOSIntensify(requestId);
        });
    });

    it('CAOS 1.0.0 - Account Application BSA Review', () =>{
        cy.wait(4000);
        //Step 7: Account Application BSA Review And Decline
        utility.logout();
        utility.loginBsaOffiserUser();
        utility.goToRequest(requestId);
        taskName = "BSA Review";
        utility.openTask(taskName);
        taskFunctionsSE.accountApplicationReviewBSAApproveReviewTaskCAOSIntensify();
    });

    it('CAOS 1.0.0 - Account Application Review Second Part', () =>{

        //Step 8: Complete Account Application Review Sub-Process
        utility.logout();
        utility.goToRequest(requestId);
        utility.loginBankerUser();
        taskName = "Due Diligence";
        utility.openTask(taskName);
        taskFunctionsSE.accountApplicationReviewSecondPartTaskCAOSIntensify(requestId);
    });

    afterEach(()=>{
        cy.clearCookies();
        cy.clearLocalStorage();
    });
});