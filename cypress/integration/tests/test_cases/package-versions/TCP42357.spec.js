import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import { Screens } from "../../../pages/screens";
import testData2357 from "../../../../fixtures/test_data/TCP42357.json";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const screen = new Screens();

describe("Processmaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2357', () =>{
               
        //Step 1: Create Screen 
        navHelper.navigateToScreensPage();
        var timeStamp = new Date().getTime();
        var scree2357 = testData2357.screens[0];  
        var nameScreen = timeStamp + scree2357.name;
        var descriptionScreen = scree2357.description;
        var typeScreen = scree2357.type;
        screen.createScreen(nameScreen, descriptionScreen, typeScreen);
        
        //Step 2: Create versioned process modeling
        var controlls = scree2357.controlls;
        screen.addControlls(controlls,timeStamp);

        //Step 3: Save with the name of version_1
        var versionName = 'version_1';
        var additionalDetails = 'verion 1';
        screen.saveTheChangesWithVersioning(versionName, additionalDetails);

        //Step 4: Create versioned process modeling
        var controlls2 = scree2357.controlls2;
        screen.addControlls(controlls2,timeStamp);

        //Step 5: Save with the name of version_2
        var versionName = 'version_2';
        var additionalDetails = 'verion 2';
        screen.saveTheChangesWithVersioning(versionName, additionalDetails);

        //Step 5: Management of screen versions
        navHelper.navigateToScreensPage();
        var option = "config";
        screen.searchScreen(nameScreen,option);
        
        //Step 6: Copy version_1
        screen.copyVersionScreen(2);

        //Step 7: Verify changes in screen with version_1
        navHelper.navigateToScreensPage();
        screen.searchScreen(nameScreen);
        screen.countElementsInScreen(controlls.length);

    });
});