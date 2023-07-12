import selectors from "../selectors/dataConnectors"
export class Dataconnectors {
    clickOnAddDataConnector(){
        cy.get(selectors.addDataConnector).click({force: true});
    }
    enterDataConnectorName(name) {
        cy.get(selectors.nameInput).type(name).should('have.value', name);
    }

    enterDataConnectorDescription(description) {
        cy.get(selectors.descriptionInput).type(description).should('have.value', description);
    }

    selectAuthType(type) {
        cy.xpath(selectors.authenticatonDropdownXpath).click();
        cy.get(selectors.authenticationTypeInput).type(type).should('have.value',type);
        cy.xpath(selectors.authType.replace('AuthType', type)).click();
    }

    ClickSaveBtn() {
        cy.xpath(selectors.saveBtn).click();
    }

    createADataConnector(name, description, type){
        this.clickOnAddDataConnector();
        cy.get(selectors.CategoryTxt).should('have.text','Uncategorized');
        this.enterDataConnectorName(name);
        this.enterDataConnectorDescription(description);
        this.selectAuthType(type);
        this.ClickSaveBtn();
        cy.get(selectors.addResource).should('be.visible');
    }

    OpenConfigurationTab(){
        cy.xpath(selectors.configurationtab).click();
        
    }
    AddAToken(token){
        this.OpenConfigurationTab();
        cy.get(selectors.tokenInput).type(token);
        this.ClickSaveBtn();

    }

    AddAListResource(description, method, URL){
        this.clickOnAddResource();
        this.AddResourceDescription(description);
        this.selectMethodOfResource(method);
        this.AddResourceURL(URL);
        cy.xpath(selectors.addBtn).click();
    }

    clickOnAddResource(){
        cy.get(selectors.addResource).click();
        cy.wait(2000);
    }

    AddResourceDescription(description){
        cy.get(selectors.resourceDescription).type(description);
    }
    
    selectMethodOfResource(method){
        cy.get(selectors.resourceMethod).select(method);
    }

    AddResourceURL(URL){
        cy.get(selectors.resourceURL).type(URL).should('have.value', URL);
    }

    OpenResourcesTab(){
        cy.xpath(selectors.resourcestab).click();
    }
    addResourceName(resourceName){
        cy.get(selectors.resourceNmeTxt).clear().type(resourceName).should('have.value', resourceName);
    }

    addResourceForBearerToken(resourceName, description, method, URL, token){
        this.OpenConfigurationTab();
        this.AddAToken(token);
        this.OpenResourcesTab();
        this.clickOnAddResource();
        this.addResourceName(resourceName);
        this.AddResourceDescription(description);
        this.selectMethodOfResource(method);
        this.AddResourceURL(URL);
        cy.xpath(selectors.addBtn).click();
        cy.xpath('//button[text()="Send"]').should('be.enable');
    }
    saveTheResource(){
        cy.xpath(selectors.addBtn).click();
    }
    verifyPresenceOfDataConnectorAndCreate(name, description, type, sourcesParameter={}){
        cy.wait(3000);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input').should('be.visible');
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input').type(name)
            .should('have.value', name);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@class="jumbotron jumbotron-fluid"]//h3[text()="Loading"]').should('be.visible');
        cy.wait(2000);
        cy.xpath('//div[@id="dataSourceIndex"]//tbody/tr', { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.createADataConnector(name, description, type);
                    if (Object.keys(sourcesParameter).length > 0)
                        this.AddAListResource(sourcesParameter.description, sourcesParameter.method, sourcesParameter.URL)
                }
                else return;
            });
    }

    verifyPresenceOfDataConnectorAndCreateWithBearerToken(name, description, connectorType, type, token, sourcesParameter={}){
        cy.wait(3000);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input').should('be.visible');
        cy.xpath('//div[@id="dataSourceIndex"]//div[@id="search"]//input').type(name)
            .should('have.value', name);
        cy.xpath('//div[@id="dataSourceIndex"]//div[@class="jumbotron jumbotron-fluid"]//h3[text()="Loading"]').should('be.visible');
        cy.wait(2000);
        cy.xpath('//div[@id="dataSourceIndex"]//tbody/tr', { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.createADataConnectorWithBearerToken(name, description, connectorType,type, token);
                    cy.wait(5000);
                    cy.xpath('//li[@role="presentation"]/a[text()="Resources"]').click({force:true});
                        this.AddAListResource(sourcesParameter.description, sourcesParameter.method, sourcesParameter.URL);
                }
                else return;
            });
    }

    createADataConnectorWithBearerToken(name, description, connectorType, type, token){
        this.clickOnAddDataConnector();
        cy.get(selectors.CategoryTxt).should('have.text','Uncategorized');
        this.enterDataConnectorName(name);
        this.enterDataConnectorDescription(description);
        this.selectConnectorType(connectorType);
        this.selectAuthType(type);
        this.ClickSaveBtn();
        cy.xpath('//textarea[@id="token"]').type(token);
        cy.xpath('//input[@type="checkbox"]').uncheck({force:true});
        cy.xpath('//button[@class="btn btn-secondary ml-3"]').click({force:true});
    }

    clickOnAddResourceWithBearerToken(){
        cy.xpath(selectors.addResourceWithBearerToken).click();
        cy.wait(2000);
    }

    selectConnectorType(connectorType) {
        cy.xpath(selectors.connectorTypeDropdownXpath).click();
        cy.get(selectors.connectorTypeInput).type(connectorType).should('have.value',connectorType);
        cy.xpath(selectors.connectorType.replace('connectorType', connectorType)).click();
    }
}