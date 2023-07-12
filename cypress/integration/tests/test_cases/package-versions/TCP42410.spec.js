import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Scripts } from "../../../pages/scripts";

const login = new Login();
const navHelper = new NavigationHelper();
const scripts = new Scripts();
describe("Processmaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it("TCP4 - 2410", () => {
        // Step 1: Create Script
        navHelper.navigateToScriptPage();
        const timeStamp = new Date().getTime();
        const nameScript = `Script-${timeStamp}`;
        const descriptionScript = `Description-${timeStamp}`;
        const nameUser = "Admin";
        scripts.createScript(nameScript, descriptionScript, nameUser);
        // Step 2: Save versions
        scripts.addPhpToScriptAndSaveWithNameOfVersion(
            "<?php return ['Hello world'];",
            "Version_1",
            "detail1"
        );
        scripts.addPhpToScriptAndSaveWithNameOfVersion(
            "<?php return ['Hello world2'];",
            "Version_2",
            "detail2"
        );
        scripts.addPhpToScriptAndSaveWithoutNameOfVersion(
            "<?php return ['Hello world3'];"
        );
        // Step 3 - Check the version history of the created script
        navHelper.navigateToScriptPage();
        const option = "config";
        scripts.searchScript(nameScript, option);
        // Check that all saved versions appear
        scripts.checkSavedAllVersions();
        // Enable the Check button and see that no unnamed versions appear
        scripts.showVersioningOnly();
        scripts.verifyVersioningWithoutNameNotAppear();
        // Check if "Copy to latest" works
        scripts.checkCopyToLastest();
    });
});
