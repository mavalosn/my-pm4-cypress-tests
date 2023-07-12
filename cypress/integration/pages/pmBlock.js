import { Login } from "../pages/login"
import { Process } from "../pages/process"
import selectors from "../selectors/process";
import pageConstants from "../helpers/pageConstants";
import promisify from 'cypress-promise'
import { NavigationHelper } from "../helpers/navigationHelper";
import { isThisWeek } from "date-fns";
import '../../support/commands';

export class PMBlock {


    /**
     * This method is responsible to create a process
     * @param name: name of the new pm block
     * @param description: description about of the new pmblock
     * @param category: Select a PMBlock Category
     * @param username: Select a username to be a process manager
     * @return nothing returns
     */


    createPMBlock(name, description, category = "", username = "") {
        this.enterPMBlockName(name);
        this.enterPMBlockDescription(description);
        if (category != "") this.enterPMBlockCategory(category);
        if (username != "") this.enterPMBlockManager(username);
        this.clickOnSaveInAddPublish();


    }
    clickOnSaveInAddPublish() {
        cy.xpath(selectors.saveBtnPublish).click();
    }

    enterPMBlockManager(username) {
        cy.xpath(selectors.managerFieldXpath).click();
        cy.xpath(selectors.managerFieldTxtXpath)
            .type(username, { delay: 100 })
            .should("have.value", username)
            .type("{enter}");
    }

    enterPMBlockCategory(category) {
        cy.xpath(selectors.processCategoryFieldXpath).click();
        cy.xpath(selectors.processCategoryInputXpath).type(category, {
            delay: 200,
        });
        cy.xpath(
            selectors.selectCategoryListXpath.replace("categoryName", category)
        )
            .should("be.visible")
            .click();
    }
    enterPMBlockName(name) {
        cy.get(selectors.nameTxtBx)
            .should("be.visible")
            .type(name, { delay: 200 })
            .should("have.value", name);
    }

    enterPMBlockDescription(description) {
        cy.get(selectors.descriptionTxtBx)
            .type(description)
            .should("have.value", description);
    }

    searchForPMBlock(pmblockName) {
        
        cy.xpath(selectors.searchInputPmblock).type(`${pmblockName}{enter}`).should('have.value', pmblockName);
        
    }

    searchPmblockAndSelectOptions(
        pmblockName,
        option = "config",
        exportType = "basic",
        passwordOption = "no",
        password
    ) {
        cy.xpath(selectors.threePointsBtnXpathPmblock).should("be.visible");
       cy.xpath(selectors.searchInputPmblock).type(`${pmblockName}{enter}`).should("have.value", pmblockName);
        //cy.get(selectors.loadingSpinnerProcess).should("be.visible");
        cy.xpath(selectors.threePointsBtnXpathPmblock).first().click();
        switch (option) {
            case "edit":
                this.editPmblock();
                break;
            case "config":
                this.goToConfigPmblock();
                break;
            case "archive":
                this.archivePmblock();
                break;
            
            }
    }
    editPmblock() {
        this.selectMenuOptionRow("Edit PM Block");
    }

    goToConfigPmblock() {
        this.selectMenuOptionRow("Edit Configure PM Block");
    }

    archivePmblock() {
        this.selectMenuOptionRow("Archive PM Block");
    }

    selectMenuOptionRow(nameOption){
        var optionXpath = '//div[@id="pmCategorizedList"]/ul/li/a[@id="nav-sources-tab"]//ancestor::div[@id="pmCategorizedList"]/descendant::div[@id="pmBlockList"]//table/tbody/tr//button[@aria-haspopup="menu"]/following-sibling::ul//li//span[contains(text(),"'+nameOption+'")]'
         
        cy.xpath(optionXpath).should('be.visible');
        cy.xpath(optionXpath).first().click();
    }

}