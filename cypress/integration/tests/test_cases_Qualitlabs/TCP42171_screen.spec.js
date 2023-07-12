import testData from "../../../fixtures/test_data/TCP4-2171.json";
import { NavigationHelper } from "../../helpers/navigationHelper";
import { Screens } from "../../pages/screens";

const navHelper = new NavigationHelper();
const screens= new Screens();
export class Screensof2171{
    screen(timeStamp){
        navHelper.navigateToScreensPage();
        for(var i=0; i<testData.screens.length;i++){
            screens.addScreen(testData.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }
    }
}