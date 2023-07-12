import { Login} from "../../../pages/login";
import { Execution } from "../../../pages/execution";

const login = new Login();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2347 - Verify loop loading of files of different formats", () => {
        //Step 1: Execution of the process
        execution.actionsAndAssertionsOfTCP42347();
    });
});
