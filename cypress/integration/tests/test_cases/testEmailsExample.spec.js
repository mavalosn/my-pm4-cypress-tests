import { ExternalEmails } from "../../pages/emails";

const externalEmail = new ExternalEmails();

describe("Test email", () => {
    it("test - MailTrap login", () => {
        externalEmail.loginMailTrap();
        externalEmail.goToInboxesMenuMailTrap();
        //open the inbox by default is 'qualitlabs'
        externalEmail.searchInboxInTheListMailTrap();
        var mySubject = "Subject 1 678";
        externalEmail.searchEmailBySubjectAndOpenMailTrap(mySubject);
    });
});