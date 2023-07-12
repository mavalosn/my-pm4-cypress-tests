import { Login} from "../../pages/login";
import { NavigationHelper } from "../../helpers/navigationHelper";




let navHelper = new NavigationHelper();
const login = new Login();

export class Aquiline {
    async aquiline2490(requestId){
        cy.visit("https://acpclone.dev.cloud.processmaker.net/login");
        login.login("dante.laruffa","danteLaruffa123");
        cy.xpath('//a[text()="Start Request"]').click();
        cy.get('div[class="alert alert-danger mt-3"]').should('contain.text', "There are 6 validation errors in your form.");
        cy.xpath('//li[@class="list-group-item"]/a').invoke('text').then((text) =>{
            var requestIdName = text.trim();
            cy.get('div[class="invalid-feedback"]').eq(0).should('contain.text', "Field is required");
            cy.get('input[data-cy="screen-field-ir_request_title"]').type(requestIdName);
            cy.get('div[class="alert alert-danger mt-3"]').should('contain.text', "There are 5 validation errors in your form.");
            cy.get('textarea[data-cy="screen-field-ir_request_description"]').type(requestIdName);
            cy.get('span[class="multiselect__single"]').should('contain.text', "Dante La Ruffa(DEV)");
            cy.get('div[class="invalid-feedback"]').eq(0).should('contain.text', "Field is required");
            cy.xpath('//label[text()="Prepared For:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Aksia. "]/span/span').click();
            cy.get('div[class="alert alert-danger mt-3"]').should('contain.text', "There are 4 validation errors in your form.");
            cy.get('div[class="invalid-feedback"]').eq(0).should('contain.text', "Field is required");
            cy.get('div[aria-label="Due Date:"]').click();
            cy.xpath('//tbody/tr[3]/td[7]').click();
            cy.get('div[class="alert alert-danger mt-3"]').should('contain.text', "There are 3 validation errors in your form.");
            cy.get('input[data-cy="screen-field-ir_link_file"]').type("https://www.ucalp.edu.ar/plan-de-estudio/lic-en-filosofia-distancia/");
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Worker PM. "]/span/span').should('contain.text', "Worker PM").click();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//li[@aria-label="Geoff Kalish(DEV). "]/span/span)[1]').should('contain.text', "Geoff Kalish(DEV)").click();
            cy.xpath('//div[@class="custom-control custom-switch"]/input[@type="checkbox"]').check({force: true});
            cy.xpath('//label[text()="Request Type:"]').should('not.be.visible');
            cy.xpath('//label[text()="Data Source:"]').should('not.be.visible');
            cy.get('div[class="alert alert-danger mt-3"]').should('not.exist');
            cy.xpath('//div[@class="custom-control custom-switch"]/input[@type="checkbox"]').uncheck({force: true});
            cy.get('div[class="alert alert-danger mt-3"]').should('contain.text', "There are 2 validation errors in your form.");
            cy.xpath('//label[text()="Request Type:"]').should('be.visible');
            cy.xpath('//label[text()="Data Source:"]').should('be.visible');        
            cy.xpath('//label[text()="Request Type:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Ordinary Course Reporting & PR (non-fundraising). "]/span/span').click();
            cy.xpath('//label[text()="Data Source:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Golden Source. "]/span/span').click();  
    });
            
            //Qtly Pitch Book Updates
            cy.reload();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Worker PM. "]/span/span').should('contain.text', "Worker PM").click();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//li[@aria-label="Geoff Kalish(DEV). "]/span/span)[1]').should('contain.text', "Geoff Kalish(DEV)").click();
            cy.xpath('//label[text()="Request Type:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Ordinary Course Reporting & PR (non-fundraising). "]/span/span').click();
            cy.xpath('//label[text()="Data Source:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Golden Source. "]/span/span').click({force: true});
            cy.xpath('//label[text()="Category:"]/parent::div//div[@class="multiselect__select"]').click({force: true});
            cy.xpath('//li[@aria-label="Qtly Pitch Book Updates (Golden Source). "]/span/span').click();
            cy.xpath('//label[text()="Aquiline Sponsor:"]/parent::div//div[@class="multiselect__select"]').should('be.visible');
            cy.xpath('//label[text()="Aquiline Sponsor:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//input[@placeholder="Select..."])[9]').type("Larissa Marcellino(DEV)");
            cy.xpath('//li[@aria-label="Larissa Marcellino(DEV). "]/span/span').first().click();
            cy.xpath('//label[text()="Ad Hoc Approver:"]/parent::div//div[@class="multiselect__select"]').should('be.visible');
            cy.xpath('//ul/li[text()="Ezra Berger(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Geoff Kalish(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Hina Joshi(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Larissa Marcellino(DEV) "]/span[text()="(Sponsor)"]').should('be.visible');
            
            //Capital Calls & Distribution Notices
            cy.reload();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Worker PM. "]/span/span').should('contain.text', "Worker PM").click();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//li[@aria-label="Geoff Kalish(DEV). "]/span/span)[1]').should('contain.text', "Geoff Kalish(DEV)").click();
            cy.xpath('//label[text()="Request Type:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Ordinary Course Reporting & PR (non-fundraising). "]/span/span').click();
            cy.xpath('//label[text()="Data Source:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Golden Source. "]/span/span').click();
            cy.xpath('//label[text()="Category:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Capital Calls & Distribution Notices. "]/span/span').click();
            cy.xpath('//label[text()="Ad Hoc Approver:"]/parent::div//div[@class="multiselect__select"]').should('be.visible');
            cy.xpath('(//button[@name="submit_opt"])[1]').scrollIntoView({force:true}, {timeout: 10000});
            cy.xpath('//ul/li[text()="Geoff Kalish(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Hina Joshi(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Larissa Marcellino(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Stew Koenigsberg(DEV)"]').should('be.visible');
            
            //Pitch Book Update
            cy.reload();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Worker PM. "]/span/span').should('contain.text', "Worker PM").click();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//li[@aria-label="Geoff Kalish(DEV). "]/span/span)[1]').should('contain.text', "Geoff Kalish(DEV)").click();
            cy.xpath('//label[text()="Request Type:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Ordinary Course Reporting & PR (non-fundraising). "]/span/span').click();
            cy.xpath('//label[text()="Data Source:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Golden Source. "]/span/span').click();
            cy.xpath('//label[text()="Category:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//li[@aria-label="Pitch Book Update. "]/span/span)[1]').click();            
            cy.xpath('//div[class="alert alert-danger mt-3"]').should('not.exist');
            cy.wait(5000);
            cy.xpath('(//button[@name="submit_opt"])[1]').scrollIntoView({force:true}, {timeout: 10000});            
            cy.xpath('//label[text()="Ad Hoc Approver:"]/parent::div//div[@class="multiselect__select"]').should('be.visible');            
            cy.xpath('//ul/li[text()="Geoff Kalish(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Geoff Kalish(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Hina Joshi(DEV)"]').should('be.visible');


            //LPAC Materials
            cy.reload();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Worker PM. "]/span/span').should('contain.text', "Worker PM").click();
            cy.xpath('//label[text()="Workers"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('(//li[@aria-label="Geoff Kalish(DEV). "]/span/span)[1]').should('contain.text', "Geoff Kalish(DEV)").click();
            cy.xpath('//label[text()="Request Type:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Ordinary Course Reporting & PR (non-fundraising). "]/span/span').click();
            cy.xpath('//label[text()="Data Source:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="Golden Source. "]/span/span').click();
            cy.xpath('//label[text()="Category:"]/parent::div//div[@class="multiselect__select"]').click();
            cy.xpath('//li[@aria-label="LPAC Materials. "]/span/span').click();
            cy.xpath('//div[class="alert alert-danger mt-3"]').should('not.exist');
            cy.xpath('//label[text()="Ad Hoc Approver:"]/parent::div//div[@class="multiselect__select"]').should('be.visible');
            cy.xpath('(//button[@name="submit_opt"])[1]').scrollIntoView({force:true}, {timeout: 10000});
            cy.xpath('//ul/li[text()="Ezra Berger(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Geoff Kalish(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Hina Joshi(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Larissa Marcellino(DEV)"]').should('be.visible');
            cy.xpath('//ul/li[text()="Stew Koenigsberg(DEV)"]').should('be.visible');
        
    }
}





