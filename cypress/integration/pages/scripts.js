import Selectors from "../selectors/scripts";

export class Scripts {
    createScript(name, description, userName) {
        cy.xpath(Selectors.newScriptBtn).click();
        cy.get(Selectors.CategoryTxt).should('have.text','Uncategorized');
        cy.xpath(Selectors.NameInputTxtBx)
            .type(name)
            .should("have.value", name);
        cy.get(Selectors.DescriptionTxtBx)
            .type(description)
            .should("have.value", description);
        cy.get(Selectors.DropDownBtn).select(0);
        cy.xpath(Selectors.SelectBx).click();
        cy.xpath(Selectors.SelectTxtInput)
            .type(userName)
            .should("have.value", userName);
        cy.xpath('//div[@name="run_as_user_id"]//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label') // yields the "href" attribute
            .and('equal', "Admin User. ");
        cy.xpath(Selectors.SelectOptionValue).click();
        cy.xpath(Selectors.CreateSaveBtn).click();
        cy.xpath(Selectors.debuggerTxt).should("be.visible");
    }

    addPhpTOScript(scriptValue) {
        cy.wait(2000);
        cy.xpath(Selectors.InputBtn).click();
        cy.xpath(Selectors.InputTxtBx).type("{downArrow}"+scriptValue+"{downArrow}")
        this.clearExtraReturn();
        this.clickOnSaveVersions();
        this.clickOnSave();
        //cy.wait(2000);
    }

    clearExtraReturn() {
        cy.xpath(Selectors.InputTxtBx).type('{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}');
       
    }

    clickOnSaveVersions() {
        cy.get(Selectors.saveVersionsBtn).click();
    }

    clickOnSave() {
        cy.xpath(Selectors.SaveBtn).click();
        cy.xpath(Selectors.sucessToastMsg).should('be.visible');
        cy.xpath(Selectors.sucessToastMsg).should('not.exist');
    }
    //Add a Script with name and details @param {string} @return {string}
    addPhpToScriptAndSaveWithNameOfVersion(script, versionName, details) {
        cy.xpath(Selectors.areaInputScript).clear().clear().type(script); //.should('contain',"return ['Hello word'];");
        cy.get(Selectors.runScript).click();
        cy.get(Selectors.saveVersionsBtn).click();
        cy.get(Selectors.inputName).type(versionName);
        cy.get(Selectors.inputDetail).type(details);
        cy.xpath(Selectors.SaveBtn).click();
        cy.get(Selectors.alertSuccess).should("be.visible");
        cy.get(Selectors.alertSuccess).should("not.exist");
    }
    // Add a Script without name and details @param {string} @return {string}
    addPhpToScriptAndSaveWithoutNameOfVersion(script) {
        cy.xpath(Selectors.areaInputScript).clear().clear().type(script); //.should('contain',"return ['Hello word'];");
        cy.get(Selectors.runScript).click();
        cy.get(Selectors.saveVersionsBtn).click();
        cy.xpath(Selectors.SaveBtn).click();
        cy.get(Selectors.alertSuccess).should("be.visible");
        cy.get(Selectors.alertSuccess).should("not.exist");
    }
    // Find a script @param {string} @return {string}
    searchScript(scriptName, option = "config") {
        cy.get(Selectors.loadingSpinnerScript).should("not.be.visible");
        cy.get(Selectors.searchInputBox)
            .first()
            .type(scriptName)
            .should("have.value", scriptName);
        cy.get(Selectors.loadingSpinnerScript).should("be.visible");
        switch (option) {
            case "edit":
                this.editScript();
                break;
            case "config":
                this.goToConfigScript();
                break;
            case "delete":
                break;
        }
    }

    editScript() {
        cy.xpath(Selectors.editctrlBtn).click();
        cy.get(Selectors.saveVersionsBtn).should("be.visible");
    }

    goToConfigScript() {
        cy.xpath(Selectors.configctrlBtn).click();
        cy.get(Selectors.versionHistoryTab).should("be.visible").click();
    }

    showVersioningOnly() {
        cy.get(Selectors.onlyShowNamedVersion).eq(0).check({ force: true });
        cy.get(Selectors.onlyShowVersionLabel).click();
    }

    verifyVersioningWithoutNameNotAppear() {
        cy.get(Selectors.container)
            .should("be.visible")
            .should("not.contain", "Unnamed Version");
    }

    checkSavedAllVersions() {
        cy.get(Selectors.container)
            .should("be.visible")
            .should("contain", "Version_1")
            .should("contain", "Version_2")
            .should("contain", "Unnamed Version");
    }

    checkCopyToLastest() {
        cy.get(Selectors.copyToLatest).click();
        cy.get(Selectors.confirmAndSave).click();
        cy.get(Selectors.currentVersion).should("contain", "Version_1");
    }

    /**
     * This method is responsible to Assign a User to script
     * @param scriptName: Name of the script
     * @param scriptPermission: object to assign a user to a script 
     * E.g. TCP4-2316
     * let scriptPermission = {user:"admin", firstName:"Admin", lastName:"User", "scriptExecutor":"php - PHP Executor", "description":"test description", timeout:"60", "enableApiAccess":1|0}
     * 
     * @return nothing returns
     */
     verifyPresenceOfScriptAndConfigureScript(scriptName, scriptPermission) {
        var editBtn = "[title='Edit'] > .fas";
        var searchField = "#scriptIndex > #search-bar > :nth-child(1) > .flex-grow-1 > #search > .input-group > #search-box";
        var scriptTable = "//div[@id='scriptIndex']/div[2]/div/div[2]/table/tbody/tr";
        cy.get(editBtn).should('be.visible');
        cy.get(searchField).type(scriptName).should('have.value', scriptName);
        cy.get('#scriptIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
        cy.get('#scriptIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
        cy.xpath(scriptTable, { timeout: 10000 })
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    //variables 
                    let userName = scriptPermission.user;
                    let firstName = scriptPermission.firstName;
                    let lastName = scriptPermission.lastName;
                    let fullName = firstName + ' ' + lastName;
                    let executorName = scriptPermission.scriptExecutor;
                    let scriptDescription = scriptPermission.description;
                    let scriptTimeout = scriptPermission.timeout;
                    let apiAccess = scriptPermission.enableApiAccess;

                    //Press Configure icon
                    //this.goToConfigScript();
                    cy.xpath(Selectors.configctrlBtn).click();

                    //Assign user
                    cy.xpath('//label[text()="Run script as"]/ancestor::div[@class="form-group"]//div/span').invoke('text').then(($userN) => {
                        if ($userN !== fullName) {
                            let liuser = "//li[@aria-label='" + fullName + ". ']";
                            var RunScriptAsField = '//label[text()="Run script as"]/ancestor::div[@class="form-group"]//div//div[@class="multiselect__tags"]';
                            cy.xpath(RunScriptAsField).type(userName);
                            cy.xpath(liuser).click();
                        }
                    });
                    //Assign  Script Executor
                    cy.xpath('//label[text()="Script Executor"]/ancestor::div[@class="form-group"]/select').select(executorName);

                    //Add description
                    cy.xpath('//label[text()="Description"]/ancestor::div[@class="form-group"]/textarea').type(scriptDescription);

                    //Add timeout
                    cy.xpath('//label[text()="Timeout"]/ancestor::div[@class="form-group"]/div/input[@id="timeout"]').clear().type(scriptTimeout);

                    //check enable direct Api access
                    if(apiAccess == 1){
                        cy.xpath('//label[contains(text(),"Enable Direct API access")]//ancestor::div[@class="form-group"]//input[@type="checkbox"]').check();
                    }
                    //save configuration
                    cy.xpath('//button[text()="Save"]').click();
                    cy.get('#scriptIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('be.visible');
                    cy.get('#scriptIndex > div.container-fluid > div > div.jumbotron.jumbotron-fluid').should('not.be.visible');
                }
                else return;
            });
    }
}
