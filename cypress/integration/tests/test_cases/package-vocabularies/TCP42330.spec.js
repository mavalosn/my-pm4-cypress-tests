import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import {Screens} from "../../../pages/screens";
import {Execution} from "../../../pages/execution";


const login = new Login();
const navHelper = new NavigationHelper();
const process = new Process();
const admin = new Admin();
const screen = new Screens();
const execution = new Execution();



describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    it("TCP4 - 2330", () => {
        var processName = "TCP4-2330 Verify Vocabulary Object and Array Script Time Out";
        var filePath = "processes/TCP4-2330 Verify Vocabulary Object and Array Script Time Out.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get('input[aria-label="Search"]')
            .eq(0)
            .type(processName)
            .should("have.value", processName);
        cy.get(
            "#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid"
        ).should("be.visible");
        cy.get(
            "#processIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid"
        ).should("not.be.visible");

        cy.xpath('//div[@id="processIndex"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if($loadedTable.length === 1){
                    process.importProcess(filePath);
                    cy.get('div[class="multiselect__select"]').eq(0).click();
                    cy.get(
                        'li[aria-label="Admin User. "] > span[class="multiselect__option multiselect__option--highlight"] > span'
                    )
                        .eq(0)
                        .contains("Admin User")
                        .click();
                    cy.get('div[class="multiselect__select"]').eq(2).click();
                    cy.get(
                        'li[id="option-2-0"] > span[class="multiselect__option multiselect__option--highlight"] > span'
                    )
                        .contains("Admin User")
                        .click();
                    cy.wait(5000);
                    cy.get('div[id="card-footer-post-import"] > div > button[class="btn btn-secondary ml-2"]')
                        .contains("Save").click();
                }
                else return;
            });
      

        //Step 2: Execution of the process
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfTCP42330();

    });
});
