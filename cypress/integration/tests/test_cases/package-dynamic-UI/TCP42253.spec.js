import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let timeStamp = new Date().getTime();
    let descriptionMenu = `Description`;
    let nameMenu1 = `01Menu-0${timeStamp}`,
        nameMenu2 = `02Menu-0${timeStamp}`,
        nameMenu3 = `03Menu-0${timeStamp}`,
        nameMenu4 = `04Menu-0${timeStamp}`,
        nameMenu5 = `05Menu-0${timeStamp}`,
        nameMenu6 = `06Menu-0${timeStamp}`,
        nameMenu7 = `07Menu-0${timeStamp}`,
        nameMenu8 = `08Menu-0${timeStamp}`,
        nameMenu9 = `09Menu-0${timeStamp}`,
        nameMenu10 = `10Menu-0${timeStamp}`,
        nameMenu11 = `11Menu-0${timeStamp}`,
        nameMenu12 = `12Menu-0${timeStamp}`;
    it("TCP4 - 2253 : Verify pagination for Dynamic UI Menu list works", () => {
        //Menu "1" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu1, descriptionMenu);
        //Menu "2" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu2, descriptionMenu);
        //Menu "3" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu3, descriptionMenu);
        //Menu "4" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu4, descriptionMenu);
        //Menu "5" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu5, descriptionMenu);
        //Menu "6" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu6, descriptionMenu);
        //Menu "7" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu7, descriptionMenu);
        //Menu "8" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu8, descriptionMenu);
        //Menu "9" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu9, descriptionMenu);
        //Menu "10" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu10, descriptionMenu);
        //Menu "11" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu11, descriptionMenu);
        //Menu "12" Creation
        navHelper.navigateToAdminCustomizePage();
        admin.addMenu(nameMenu12, descriptionMenu);
        cy.get(".nav-link").contains("Menu").click();
        cy.get('[class="pagination"]').should("exist");
        //Verify that pagination is at 10
        cy.get('[aria-label="Per page"]').should("contain", "10");
        //Change pagination to 25
        cy.get("select").select("25").should("have.value", "25");
        //Change pagination to 50
        cy.get("select").select("50").should("have.value", "50");
        //Verify that the table contains the last 12 items created
        cy.get('[class="data-table"]')
            .should("contain", nameMenu1)
            .should("contain", nameMenu2)
            .should("contain", nameMenu3)
            .should("contain", nameMenu4)
            .should("contain", nameMenu5)
            .should("contain", nameMenu6)
            .should("contain", nameMenu7)
            .should("contain", nameMenu8)
            .should("contain", nameMenu9)
            .should("contain", nameMenu10)
            .should("contain", nameMenu11)
            .should("contain", nameMenu12);
    });
    it("Delete Menus", () => {
        //Delete Menu1
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu1);
        //Delete Menu2
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu2);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu3);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu4);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu5);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu6);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu7);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu8);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu9);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu10);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu11);
        navHelper.navigateToAdminCustomizePage();
        admin.deleteMenu(nameMenu12);
    });
});
