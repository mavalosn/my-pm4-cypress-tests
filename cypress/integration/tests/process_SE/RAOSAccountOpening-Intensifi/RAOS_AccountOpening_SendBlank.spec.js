import { TaskFunctionsSE } from "../../../pages/taskFunctionsSE";
import {Utility} from "../../../pages/utility";

const taskFunctionsSE = new TaskFunctionsSE();
const utility = new Utility();

describe("RAOS 1.0.0 - Account Opening - Send Blank Application to Client", () => {

    beforeEach(()=>{});

    let processName = "Open A Personal Account";
    let requestMain;
    let requestId;
    let parameterList;
    let taskName;
    parameterList = {
        pathOption: "Send Blank",
        isTrust: true,
        users: 1
        };
    let pathName = parameterList.pathOption;

    it('RAOS 1.0.0 - Account Opening', () =>{
        //Step 1: Log in with Banker User
        utility.visitIntemsify();
        utility.loginBankerUser();

        //Step 2: Create Request
        utility.createRequestByDashboard(processName);

        //Step 3: Get Number Request
        taskName = "Start Personal Account";
        utility.getNumberRequest(taskName);
        cy.url().then((url) => {
            var urlA = url.split("/")[4].trim();
            requestMain = urlA.split("?")[0].trim();
            utility.openTask(taskName);

            //Step 4: Complete Start Personal Account task
            taskFunctionsSE.startPersonalAccountTaskRAOSIntensify(parameterList);
        });
    });

    it('RAOS 1.0.0 - Account Application',  () => {

        //Step 5: Complete Account Application Sub-Process
        utility.followingRequest(requestMain,"RAOS 1.0.0 - Account Application",1);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.completeOneTimePassword(requestId);
            taskFunctionsSE.accountApplicationSubProcessRAOSIntensify(parameterList.users,pathName);
        });
    });

    it('RAOS 1.0.0 - Send Account Owners Verification', () =>{

        //Step 6: Complete Send Account Owners Verification Sub-Process
        utility.followingRequest(requestMain,"RAOS 1.0.0 - Send Account Owners Verification",2);
        taskFunctionsSE.sendAccountOwnersVerificationSubProcessRAOSIntensify();
    });

    it('RAOS 1.0.0 - Account Application Review', () =>{

        //Step 7: Complete Account Application Review Sub-Process
        utility.followingRequest(requestMain,"RAOS 1.0.0 - Account Application Review",3);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.logout();
            utility.goToRequest(requestId);
            utility.loginBankerUser();
            taskFunctionsSE.accountApplicationReviewSubProcessRAOSIntensify(requestId,parameterList.users,pathName);
        });
    });

    it('RAOS 1.0.0 - JHA Board Account', () =>{

        //Step 8: Complete JHA Board Account Sub-Process
        utility.followingRequest(requestMain,"RAOS 1.0.0 - JHA Board Account",4);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            utility.goToRequest(requestId);
            taskFunctionsSE.jhaBoardAccountSubProcessRAOSIntensify();
        });
    });

    afterEach(()=>{});
});