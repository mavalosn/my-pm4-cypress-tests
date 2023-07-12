import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();

describe("Processmaker Test Cases", function () {

    before(() => {
        login.navigateToUrl();
        login.login();
    });

    let timeStamp = new Date().getTime();
    const userName = '00UserSATCP42186';
    const firstNameUserSA = '00UserSATCP42186';
    const lastNameUserSA = 'lastNameUserSATCP42186';
    const emailUserSA = 'UserSATCP42186@gmail.com';
    const jobTitle = "testCase";
    const status = "Active";
    const password = "Colosa123";

    it("TCP4 - 2186 Verify the number of files uploaded to public files", function () {
        //SuperAdmin creation: userSA
        navHelper.navigateToAdminUserPage();
        execution.createUserIfNotExistAndMakeSuperAdmin(
            userName,
            firstNameUserSA,
            lastNameUserSA,
            jobTitle,
            status,
            emailUserSA,
            password
        );
    }); 

    it("TCP4 - 2186 Login with userSA and Add 11 files in Public File", function () {
        //Log in with the UserSA
        login.navigateToUrl();
        login.login(userName, password);
        //Create folder
        //let timeStamp = new Date().getTime();
        navHelper.navigateToFileManagerPublicPage();
        cy.xpath('//button[@aria-label="Create Folder"]').should('be.visible').click();
        var folderName = "FOLDERTCP42186folderInsideFiles"+timeStamp;
        admin.createFolder(folderName);

        execution.putLatestFileAtTopList();
        cy.xpath('//td/span[text()="'+folderName+'"]').click();
        //Upload files in Folder
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
        let filePath11 = "images/image11.jpeg";       
        if(cy.xpath('//table/tbody[@role="rowgroup"]/tr').should('not.exist')){
            //Upload File1
            var file1 = {filePath:filePath1, fileName:'image1.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file1);
            //Upload File1
            file1 = {filePath:filePath1, fileName:'image1.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file1);
            //Upload File2
            var file2 = {filePath:filePath2, fileName:'image2.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file2);
            //Upload File3
            var file3 = {filePath:filePath3, fileName:'image3.jpg', mimeType:'application/jpeg'};
            execution.uploadFile(file3);
            //Upload File4
            var file4 = {filePath:filePath4, fileName:'image4.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file4);
            //Upload File5
            var file5 = {filePath:filePath5, fileName:'image5.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file5);
            //Upload File6
            var file6 = {filePath:filePath6, fileName:'image6.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file6);
            //Upload File7
            var file7 = {filePath:filePath7, fileName:'image7.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file7);
            //Upload File8
            var file8 = {filePath:filePath8, fileName:'image8.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file8);
            //Upload File9
            var file9 = {filePath:filePath9, fileName:'image9.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file9);
            //Upload File10
            var file10 = {filePath:filePath10, fileName:'image10.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file10);
            //Upload File11
            var file11 = {filePath:filePath11, fileName:'image11.jpeg', mimeType:'application/jpeg'};
            execution.uploadFile(file11);
        }  
        //Verify there are 11 more files in table
        execution.verifyNumberItemsInTable(11);
        //Verify labels for images and extensions
        execution.verifyLabelsForImageAndExtension('image1','jpeg','10.5 KB');
        execution.verifyLabelsForImageAndExtension('image2','jpeg','8.43 KB');
        execution.verifyLabelsForImageAndExtension('image3','jpeg','7.45 KB');
        execution.verifyLabelsForImageAndExtension('image4','jpeg','7.92 KB');
        execution.verifyLabelsForImageAndExtension('image5','jpeg','11.9 KB');
        execution.verifyLabelsForImageAndExtension('image6','jpeg','9.4 KB');
        execution.verifyLabelsForImageAndExtension('image7','jpeg','6.52 KB');
        execution.verifyLabelsForImageAndExtension('image8','jpeg','6.64 KB');
        execution.verifyLabelsForImageAndExtension('image9','jpeg','10.28 KB');
        execution.verifyLabelsForImageAndExtension('image10','jpeg','10.44 KB');
        execution.verifyLabelsForImageAndExtension('image11','jpeg','7.71 KB');
    });

    it("TCP4 - 2186 Login with userSA and Add 10 folders in Public File", function () {
        cy.clearCookies();
        cy.clearLocalStorage();
        //Log in with the UserSA
        login.navigateToUrl();
        login.login(userName, password);
        //Create folder
        //let timeStamp = new Date().getTime();
        navHelper.navigateToFileManagerPublicPage();
        cy.xpath('//button[@aria-label="Create Folder"]').should('be.visible').click();
        let folderName = "FOLDERTCP42186folderInsideFolders"+timeStamp;
        admin.createFolder(folderName);
        cy.wait(2000);
        execution.putLatestFileAtTopList();
        cy.xpath('//td/span[text()="'+folderName+'"]').click();
        let i;
        for (let i = 1; i <=10; i++) {
            execution.createFolderInsideFolderTCP42186();
            cy.wait(2000);
        }
        cy.reload();
        execution.verifyNumberItemsInTable(10);
    });
});
