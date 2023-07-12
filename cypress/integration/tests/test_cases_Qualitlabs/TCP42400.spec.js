import { Login } from "../../pages/login"
import { NavigationHelper} from "../../helpers/navigationHelper";
import { Screens } from "../../pages/screens";
import { Admin } from "../../pages/admin";
import testData2400 from "../../../fixtures/test_data/TCP42400.json";



const faker = require('faker');

const login = new Login();
const navHelper = new NavigationHelper();
const screens = new Screens();
const admin = new Admin();

describe("ProcessMaker Test Cases", () => {

  before(() => {
    login.navigateToUrl();
    login.login();
    login.changeLanguageToEnglishAndDateType();
  })

it.only('TCP4 - 2400', async () =>{
    var timeStamp = new Date().getTime();
    var description = "Created for testing purpose";
    var create_screen = timeStamp+testData2400.screens[0].name;
    var view_screen = timeStamp+testData2400.screens[1].name;
    var form_screen = timeStamp+testData2400.screens[2].name;
    var collectionName = testData2400.screens[2].controlls[0].datasource.data_connector + timeStamp;
  
    //create two screens for collection
    navHelper.navigateToScreensPage();
    for(var i=0; i<2;i++){
      screens.addScreen(testData2400.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }
  
    //create collection using above screens
    navHelper.navigateToCollectionPage();
    admin.creatACollection(collectionName, description, create_screen, view_screen, create_screen);
     var value1;

    //adding data to the collection
    for(var i=1;i<=5;i++){
      var date="2020-12-08";
      var ci="10"+i;
      var name="Tester"+i;
      var lastName="QA"+i;
      var phone="630230534"+i;
      admin.addingDataToStudentCollection(date, ci, name, lastName, phone);
      if(i==1){
        value1=name;
      }
      cy.go('back');
      cy.go('back');
    }

    //create remaining screens
    navHelper.navigateToScreensPage();
    for(var i=2; i<testData2400.screens.length;i++){
      screens.addScreen(testData2400.screens[i], timeStamp);
      navHelper.navigateToScreensPage();
    }
  
    //open created screen
    navHelper.navigateToScreensPage();
    screens.searchScreen(form_screen, 'edit');

    //click on preview of screen
    cy.xpath("//button[@title='Preview Screen']").click();
    var query ='{{} "students" : "1" }';
    //click on data input
    cy.xpath('(//*[@class="view-line"])[1]').click();
    //clear the data in data input
    cy.xpath('(//*[@class="view-line"])[1]').type('{backspace}{backspace}');
    //write query in data input
    cy.xpath('(//*[@class="view-line"])[1]').type(query);
    //verify the data is shown in select list with id 1
    cy.xpath('(//span[text()[normalize-space()="value1"]])[2]'.replace('value1', value1)).should('be.visible');
   })
})