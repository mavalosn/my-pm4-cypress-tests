import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
        navHelper.navigateToFileManagerPublicPage();
        //create folder
        cy.xpath('//button[@aria-label="Create Folder"]').should('be.visible');
        cy.xpath('//button[@aria-label="Create Folder"]').click();

        var timeStamp = new Date().getTime();
        var folderName = "00"+timeStamp+"folder";
        admin.createFolder(folderName);
        
        execution.putLatestFileAtTopList();
        cy.xpath('//td/span[text()="'+folderName+'"]').click();
    });
    it("TCP4 - 2309 Verify uploaded files are uploaded and displayed in file manager public folder", function () {
        let filePath1 = "images/image1.jpg";
        let filePath2 = "images/image2.jpeg";
        let filePath3 = "images/image3.jpeg";
        let filePath4 = "images/image4.jpeg";
        let filePath5 = "images/image5.jpeg";
        let filePath6 = "images/image6.jpeg";
        let filePath7 = "images/image7.jpeg";
        let filePath8 = "images/image8.jpeg";
        let filePath9 = "images/image9.jpeg";
        let filePath10 = "images/image10.jpg";
        if(cy.xpath('//table/tbody[@role="rowgroup"]/tr').should('not.exist')){
            admin.addPublicFileInFileManager();          
            //Upload files
            var file1 = {filePath:filePath1, fileName:'image1.jpeg', mimeType:'application/jpeg'};
            admin.selectFileInFileManager(file1);
            admin.doneUploadPublicFile();
            
            admin.addPublicFileInFileManager();
            var file1 = {filePath:filePath1, fileName:'image1.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file1);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file2 = {filePath:filePath2, fileName:'image2.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file2);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file3 = {filePath:filePath3, fileName:'image3.jpg', mimeType:'application/jpg'}
            admin.selectFileInFileManager(file3);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file4 = {filePath:filePath4, fileName:'image4.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file4);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file5 = {filePath:filePath5, fileName:'image5.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file5);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file6 = {filePath:filePath6, fileName:'image6.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file6);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file7 = {filePath:filePath7, fileName:'image7.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file7);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file8 = {filePath:filePath8, fileName:'image8.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file8);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file9 = {filePath:filePath9, fileName:'image9.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file9);
            admin.doneUploadPublicFile();
            admin.addPublicFileInFileManager();
            var file10 = {filePath:filePath10, fileName:'image10.jpeg', mimeType:'application/jpeg'}
            admin.selectFileInFileManager(file10);
            admin.doneUploadPublicFile();
        }        
        
        //Verify there are 10 more files in table
        cy.xpath("//table//tbody")
            .find("tr")
            .its("length")
            .should("be.gte", 10);

        //Verify labels for images and extencions
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image1"]').should('have.text','image1');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image1"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image1"]/ancestor::td/following-sibling::td[2]').should('have.text','10.5 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image2"]').should('have.text','image2');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image2"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image2"]/ancestor::td/following-sibling::td[2]').should('have.text','8.43 KB');
        
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image3"]').should('have.text','image3');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image3"]/ancestor::td/span[2]').should('have.contain','jpg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image3"]/ancestor::td/following-sibling::td[2]').should('have.text','7.45 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image4"]').should('have.text','image4');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image4"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image4"]/ancestor::td/following-sibling::td[2]').should('have.text','7.92 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image5"]').should('have.text','image5');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image5"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image5"]/ancestor::td/following-sibling::td[2]').should('have.text','11.9 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image6"]').should('have.text','image6');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image6"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image6"]/ancestor::td/following-sibling::td[2]').should('have.text','9.4 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image7"]').should('have.text','image7');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image7"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image7"]/ancestor::td/following-sibling::td[2]').should('have.text','6.52 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image8"]').should('have.text','image8');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image8"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image8"]/ancestor::td/following-sibling::td[2]').should('have.text','6.64 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image9"]').should('have.text','image9');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image9"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image9"]/ancestor::td/following-sibling::td[2]').should('have.text','10.28 KB');

        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image10"]').should('have.text','image10');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image10"]/ancestor::td/span[2]').should('have.contain','jpeg');
        cy.xpath('//table/tbody[@role="rowgroup"]/tr/td[2]/span[text()="image10"]/ancestor::td/following-sibling::td[2]').should('have.text','10.44 KB');
    });
});
