import { Login } from "../../pages/login";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Scripts } from "../../pages/scripts";

const login = new Login();
const navHelper = new NavigationHelper();
const script = new Scripts();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });

    it("test script with all parameters", () => {
        var scriptName = "test1_script";
        var scriptDescription = "test1_script_description";
        var username = "admin";
        var fullName = "Admin User";
        var language = "php - PHP Executor";
        var timeout = 10;
        var retryAttempts = 2;
        var retryWaitTime = 5;

        navHelper.navigateToScriptPage();
        script.verifyIfScriptTaskExists(
            scriptName,
            scriptDescription,
            username,
            fullName,
            language,
            timeout,
            retryAttempts,
            retryWaitTime
        );

        let scriptPermission = {
            user: username,
            firstName: "Admin",
            lastName: "User",
            scriptExecutor: language,
            description: "test description",
            timeout: "20",
            retryAttemps: "10",
            retryWaitTime: "10",
            enableApiAccess: 1,
        };
        navHelper.navigateToScriptPage();
        script.verifyPresenceOfScriptAndConfigureScript(
            scriptName,
            scriptPermission
        );
        navHelper.navigateToScriptPage();
        script.searchScript(scriptName, "edit");
        script.addPhpToScriptAndSaveWithoutNameOfVersion(
            "<?php $data = 'test1'; return $data;"
        );
    });

    it("test script with default parameters", () => {
        var scriptName = "test_simple_script";
        var scriptDescription = "simle script_description";
        navHelper.navigateToScriptPage();
        script.verifyIfScriptTaskExists(scriptName, scriptDescription);
        navHelper.navigateToScriptPage();
        script.searchScript(scriptName, "config");
        navHelper.navigateToScriptPage();
        script.searchScript(scriptName, "edit");
    });
});
