import { Login} from "../pages/login";
import { NavigationHelper } from "../helpers/navigationHelper";
import { Process } from "../pages/process";
import { Admin } from "../pages/admin";
import { Screens } from "../pages/screens";
import testData2357 from "../../fixtures/test_data/TCP42357.json";


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

    it('TCP4 - 2357', async () =>{
               
        //Step 1: Create Screen 
        navHelper.navigateToScreensPage();
        var timeStamp = new Date().getTime();
        var scree2357 = testData2357.screens[0];  
        var nameScreen = timeStamp + scree2357.name;
        var descriptionScreen = scree2357.description;
        var typeScreen = scree2357.type;
        screen.createScreen(nameScreen, descriptionScreen, typeScreen);

        //Step 2: Create versioned process modeling
        
    
    });
});