import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2310", () => {
        execution.verifyRichTextTCP42310();
    });
});