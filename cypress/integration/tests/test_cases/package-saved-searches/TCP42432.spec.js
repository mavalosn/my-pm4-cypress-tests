import {Login} from "../../../pages/login";
import {SaveSearchs} from "../../../pages/saveSearch";
import {NavigationHelper} from "../../../helpers/navigationHelper";

const login = new Login();
const saveSearch = new SaveSearchs();
const navHelper = new NavigationHelper();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4- 2432 Check Scheduled report, send report, and enable notifications in save search', () => {
        //Go to all requests
        navHelper.navigateToAllRequests();

        //search one process and save search
        var timeStamp = new Date().getTime();
        var namesave = "name_test" + timeStamp;
        saveSearch.clickOnProcessesName(namesave);

        //Go to saved searchs
        navHelper.navigateToSavedSearchs();

        //view save search
        saveSearch.viewSaveSearch(namesave);

        //Send report
        var email = "automation.pm4@gmail.com";
        var subject = "test_save_search_subject";
        var body = "test_save_searh_body";
        saveSearch.sendReportSaveSearch(email,subject,body);

        //schedule report
        saveSearch.scheduledReports(email,subject,body);

        //configuration
        saveSearch.configurationsSaveSearch();
    });
});