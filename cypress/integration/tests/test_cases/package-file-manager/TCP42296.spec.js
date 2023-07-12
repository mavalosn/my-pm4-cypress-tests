import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import {Screens} from "../../../pages/screens";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";

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
    it("TCP4 - 2296 Verify Multiple File Upload", () => {
        

        //Step: Execution of the process
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfTCP42296();
    });
});
