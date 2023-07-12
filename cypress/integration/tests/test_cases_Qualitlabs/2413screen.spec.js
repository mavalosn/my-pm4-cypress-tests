import testData2413 from "../../../fixtures/test_data/TCP4-2413.json";
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";

const navHelper = new NavigationHelper();
const screens = new Screens();
const admin = new Admin();
export class Screen2413{

    screensOf2413(timeStamp,coverstaion_screen1){
        var create_screen= timeStamp+testData2413.screens[0].name;
        var view_screen= timeStamp+testData2413.screens[1].name;
        var description = "Created for testing purpose";
        var collectionName = testData2413.internalScreen.controlls[0].datasource.data_connector + timeStamp;
        navHelper.navigateToScreensPage();
        for(var i=0; i<testData2413.screens.length;i++){
            screens.addScreen(testData2413.screens[i], timeStamp);
            navHelper.navigateToScreensPage();
        }

        navHelper.navigateToCollectionPage();
        admin.creatACollection(collectionName, description, create_screen, view_screen, create_screen);
        admin.addRecordstoBookCollection(collectionName);

        navHelper.navigateToScreensPage();
        screens.searchForAScreen(coverstaion_screen1);
        screens.clickOnEditScreen(coverstaion_screen1);
        screens.addInternalScreen(testData2413.internalScreen, timeStamp);
        for(let i=7;i<13;i++){
            screens.addPageToRecordList(testData2413.internalScreen.name+timeStamp,i);
        }

    }
}