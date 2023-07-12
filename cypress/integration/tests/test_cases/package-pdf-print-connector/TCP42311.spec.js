import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Process } from "../../../pages/process";

const execution = new Execution();
const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const process = new Process();

describe("ProcessMaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4 - 2311 : TCP4-2311 Process for PDF connector using loop activity and HTML code", () => {

        const processName = 'TCP4-2311 Process for PDF connector using loop activity and HTML code';
        const filePath = 'processes/TCP4-2311 Process for PDF connector using loop activity and HTML code.json';
        const taskName = 'Form Task';

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        process.verifyPresenceOfProcessAndImportProcess(processName,filePath);

        //Step 2: Start a request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.openTaskByTaskName(taskName);

        //Step 3: Complete Form
        const codeHTML = '<html> <head> <title>Este es solo un ejemplo</title> </head>' +
            ' <body> Aqui se encuentra el contenido de la web </body>';
        execution.completeFormTCP42311(codeHTML,processName);

        //Step 4: Start a second request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        request.openTaskByTaskName(taskName);

        //Step 5: Complete Form 2 part
        execution.completeFormPath2TCP42311(codeHTML,processName);
    });
});