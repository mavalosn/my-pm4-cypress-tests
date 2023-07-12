import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import {Screens} from "../../../pages/screens";
import {Execution} from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const screen = new Screens();
const execution = new Execution();


describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2315", () => {
        //Step 1: Seach and execute the first task before parallel gateway
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfTCP42315();        
    });
});

