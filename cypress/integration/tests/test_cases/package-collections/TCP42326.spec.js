import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Admin } from "../../../pages/admin";
import { Execution } from "../../../pages/execution";

const login = new Login();
const navHelper = new NavigationHelper();
const admin = new Admin();
const execution = new Execution();

describe("Processmaker Test Cases", () => {
    before(() => {
        login.navigateToUrl();
        login.login();
    });

    it('TCP4 - 2326: Verify the upload of an image in a collection', () =>{
        const collectionName = "TCP4-2326 MultipleRegistrationImgCollection";
        const filePath = "collections/tcp4_2326_multipleregistrationimgcollection.json";

        //Step 1: Import the collection
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(collectionName,filePath);

        cy.wait(2000);
        navHelper.navigateToAdminPage();
        navHelper.navigateToCollectionPage();

        //Step 2: Open the collection
        admin.searchForCollection(collectionName,"config");

        //Step 3: Config the columns in the collection
        //a) Delete "Active columns"
        const nameColumnsList= ["Modified","Created","Modified By","Created By"];
        admin.deleteAllActiveColumnsFromCollection(nameColumnsList);
        admin.saveChangesOnConfigCollection();

        //b) Add custom columns
        var label = "marital status";
        var field = "data.maritalStatus";
        var format = "Text";
        admin.addActiveColumnInCollection(label, field, format);

        label = "profession";
        field = "data.profession";
        format = "Text";
        admin.addActiveColumnInCollection(label, field, format);

        label = "photo";
        field = "data.photo";
        format = "File";
        admin.addActiveColumnInCollection(label, field, format);
        admin.saveChangesOnConfigCollection();

        //Step 4: Add a new Record on the collection
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName);
        execution.actionsAndAssertionsOfTCP42326();
    });

    after(() => {
        const collectionName = "TCP4-2326 MultipleRegistrationImgCollection";
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName,"delete");
    });
});