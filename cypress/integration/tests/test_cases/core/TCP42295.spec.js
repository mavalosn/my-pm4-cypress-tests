import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";
import {Screens} from "../../../pages/screens";
import {Execution} from "../../../pages/execution";
import selectors from "../../../selectors/process";



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
    it("TCP4 - 2295 Verify the entered data of a selectlist and recordlist after a Message Start-End Event", () => {
        var processName = "TCP4-2295 Verify the entered data of a selectlist and recordlist after a Message Start-End Event";
        var filePath = "processes/TCP4-2295 Verify the entered data of a selectlist and recordlist after a Message Start-End Event.json";

        //Step 1: Import the process
        navHelper.navigateToProcessPage();
        var editBtn = "[title='Edit'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox)
            .eq(0)
            .type(processName)
            .should("have.value", processName);
        cy.get(
            selectors.loadingSpinnerProcess
        ).should("be.visible");
        cy.get(
            selectors.loadingSpinnerProcess
        ).should("not.be.visible");

        cy.xpath(selectors.processTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if($loadedTable.length === 1){
                    process.importProcess(filePath);
                    cy.get('div[class="multiselect__select"]').eq(0).click();
                    cy.get('input[id="search-user-text"]').eq(0).type("Admin Us");
                    cy.get(
                            'li[aria-label="Admin User. "] > span[class="multiselect__option multiselect__option--highlight"] > span'
                    )
                        .eq(0)
                        .should('contain.text',"Admin User")
                        .click({force:true});
                    cy.get('div[class="multiselect__select"]').eq(1).click();
                    cy.get('input[id="search-user-text"]').eq(1).type("Admin Us");
                    cy.get(
                           'li[aria-label="Admin User. "] > span[class="multiselect__option multiselect__option--highlight"] > span'
                         )
                        .eq(0)
                        .should('contain.text',"Admin User")
                        .click({force:true});
                    cy.get('button[type="button"]').eq(5).should('contain.text',"Save").click();
                    cy.wait(3000);
                }
                else return;
            });
    
        
        //Step 2: Execution of the process
        navHelper.navigateToRequestsPage();
        execution.actionsAndAssertionsOfTCP42295();   
    });
});
