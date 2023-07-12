import { Login} from "../../pages/login";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Admin } from "../../pages/admin";
import { Dataconnectors } from "../../pages/dataConnectors";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const dataconnectors = new Dataconnectors();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let result_token;
    it("get token", async() => {
        navHelper.navigateToAdminPage();
        result_token = await admin.userGetToken('admin');
    });

    it("TCP4-example", () => {
        console.log(result_token);
        navHelper.navigateToDataConnectorPage();
        dataconnectors.createADataConnector("ana123", "description", "Bearer Token");
        dataconnectors.AddAToken(result_token);
    });

});