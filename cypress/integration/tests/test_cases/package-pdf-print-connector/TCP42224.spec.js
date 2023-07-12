import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Requests } from "../../../pages/requests";

const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const request = new Requests();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    var processName = "TCP4-2224 Nested PDF Loop Test";
    var filePath = "processes/TCP4-2224 Nested PDF Loop Test.json";
    let requestId
    it("TCP4-2224 Process Record List", function () {
        //Step 1: Import the process and config
        navHelper.navigateToProcessPage();
        let parameterList = [
        //To Process Manager
            {
                elemName: "Process Manager",
                label: "Process Manager",
                user: "admin",
                firstName: "Admin",
                lastName: "User",
            },
        ];
        process.verifyPresenceOfProcessAndImportProcess(
            processName,
            filePath,
            parameterList
        );
        //Step 2: Start request
        navHelper.navigateToRequestsPage();
        request.openNewRequest(processName);
        cy.url().then((url) => {
            requestId = url.split("/")[4].trim();
            navHelper.navigateToRequestsPage();
            cy.visit("/requests/" + requestId);

        //Step 3:Verify content
            //Verify there are 6 images in row
            request.waitUntilElementIsVisible('selector','[class="row"]')
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .its("length")
                .should("be.gte", 6);
            //Verify there are 6 subtitles in row
            cy.get('[class="row"]')
                .find("h3")
                .its("length")
                .should("be.gte", 6);
            //Verify there are 6 paragraphs in row
            cy.get('[class="row"]').find("p").its("length").should("be.gte", 6);
            //Verify that the images are aligned to the center
            //Fisrt image
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .eq(0)
                .invoke("attr", "style", "text-align: center !important")
                .should("have.attr", "style", "text-align: center !important");
            //Second image
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .eq(1)
                .invoke("attr", "style", "text-align: center !important")
                .should("have.attr", "style", "text-align: center !important");
            //Third image
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .eq(2)
                .invoke("attr", "style", "text-align: center !important")
                .should("have.attr", "style", "text-align: center !important");
            //Four image
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .eq(3)
                .invoke("attr", "style", "text-align: center !important")
                .should("have.attr", "style", "text-align: center !important");
            //Five image
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .eq(4)
                .invoke("attr", "style", "text-align: center !important")
                .should("have.attr", "style", "text-align: center !important");
            //Six image
            cy.get('[class="row"]')
                .find('[class="container text-center"]')
                .eq(5)
                .invoke("attr", "style", "text-align: center !important")
                .should("have.attr", "style", "text-align: center !important");
        });
    });
});