import { Login } from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Requests } from "../../../pages/requests";
import { Execution } from "../../../pages/execution";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const request = new Requests();
const execution = new Execution();
const admin = new Admin();

describe("Processmaker Test Cases", function () {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    });
    let collectionName = "tcp42321verifyimportcsvfileincollection";
    let collectionPath = "collections/tcp42321verifyimportcsvfileincollection.json";
    it("TCP4-2321 Verify the import of a CSV file in a Collection ", () => {
        //Step 1: Import Collection
        navHelper.navigateToCollectionPage();
        admin.verifyPresenceOfCollectionAndImportCollection(
            collectionName,
            collectionPath
        );
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName, "config");
        //Step 3: Config the columns in the collection
        //a) Delete "Active columns"
        const nameColumnsList = [
            "Modified",
            "Created",
            "Modified By",
            "Created By",
        ];
        admin.deleteAllActiveColumnsFromCollection(nameColumnsList);
        //b) Add Custom columns
        execution.addCustomColumn();
        cy.xpath('//ol[@class="breadcrumb"]//li[3]').click();
        let csvPath = "csv/books.csv";
        execution.importCSV(csvPath);
        execution.selectColumnImportCSV("Column 1 (Title)", "Title");
        execution.selectColumnImportCSV("Column 2 (Author)", "Author");
        execution.selectColumnImportCSV("Column 3 (Genre)", "Genre");
        execution.selectColumnImportCSV("Column 4 (Height)", "Height");
        execution.selectColumnImportCSV("Column 5 (Publisher)", "Publisher");
        cy.get('button[class="btn btn-secondary"]').click();
        //Checking the number of elements of the uploaded csv file in the collection
        cy.get('[class="pagination"]').should(
            "contain",
            "1 - 10 of 212 Records"
        );

    });
    afterEach(() => {
        navHelper.navigateToCollectionPage();
        //Clear "tcp42321verifyimportcsvfileincollection"
        navHelper.navigateToCollectionPage();
        admin.searchForCollection(collectionName, "delete");
    });
});