import selectors from "../selectors/admin"
import promisify from 'cypress-promise'
import { NavigationHelper } from "../helpers/navigationHelper";

var date = new Date();
const navHelper = new NavigationHelper();
export class Admin {

	searchForCollection(collectionName,option="edit") {
		cy.get(selectors.RecordsBtn).should('be.visible');
		cy.get(selectors.searchInputBox).type(collectionName).should('have.value', collectionName);
		cy.xpath(selectors.searchctrl).click({
			multiple: true
		});
		cy.wait(5000);
		cy.xpath(selectors.collectionNameInput.replace('collectionName', collectionName)).should('be.visible');
		switch (option) {
            case "edit": this.openRecordCollection(collectionName);break;
            case "delete": this.deleteCollection(collectionName);break;
            case "config": this.goToConfigCollection(collectionName);break;
        }
	}

	deleteCollection(collectionName){
        cy.xpath(selectors.deleteCollectionBtn.replace('collectionName', collectionName)).click({ force: true });
        const confirXPATH = "//button[text()='Confirm']";
        cy.xpath(confirXPATH).should('be.visible').click();
    }

    openRecordCollection(collectionName){
        cy.xpath(selectors.RecordBtnForGivenCollection.replace('collectionName', collectionName)).click({ force: true });
    }

    goToConfigCollection(collectionName){
        cy.xpath(selectors.configCollectionBtn.replace('collectionName', collectionName)).click({ force: true });
    }
	creatACollection(name, description, createScreen, viewScreen, editScreen) {
		cy.get(selectors.newCollectionBtn).click();
		cy.get(selectors.nameInputTxtBx).type(name).should('have.value', name);
		cy.get(selectors.descriptionInputTxtBx).type(description).should('have.value', description);
		this.addCreateScreenToCollection(createScreen);
		this.addViewScreenToCollection(viewScreen);
		this.addEditScreenToCollection(editScreen);
		cy.xpath(selectors.collectionsaveBtn).click();
		cy.get(selectors.newRecordBtn).should('be.visible');
	}

	addRecordstoBookCollection(name) {
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title1", "author1", "1000");
		//cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		cy.go('back');
		cy.go('back');
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title2", "author2", "4000");
		//cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		cy.go('back');
		cy.go('back');
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title3", "author3", "3000");
		//cy.xpath(selectors.collectionNameInput.replace('name', name)).click();
		cy.go('back');
		cy.go('back');
		this.addingDataToBookCollection(new Date().toLocaleDateString('en-GB'), "title4", "author4", "2000");
	}

	addingDataToBookCollection(date, title, author, price) {
		cy.get(selectors.newRecordBtn).click();
		cy.xpath(selectors.dateinputTxtBx).type(date).should('have.value', date);
		cy.get(selectors.titleInputTxtBx).type(title).should('have.value', title);
		cy.get(selectors.authorInputTxtBx).type(author).should('have.value', author);
		cy.get(selectors.priceInputTxtBx).type(price).should('have.value', price);
		cy.get(selectors.submitBtn).click();
		cy.get(selectors.navEditBtn).should('be.visible');
		//cy.wait(3000);
	}
	addCreateScreenToCollection(screenName) {
		cy.xpath(selectors.createscreenForInputDropdown).click();
		cy.get(selectors.createscreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).first().click({force: true});
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	addViewScreenToCollection(screenName) {
		cy.xpath(selectors.viewScreenForInputDropdown).click();
		cy.get(selectors.viewScreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).click({force: true});
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	addEditScreenToCollection(screenName) {
		cy.xpath(selectors.editScreenForInputDropdown).click();
		cy.get(selectors.editScreenInputTxtBx).type(screenName).should('have.value', screenName);
		cy.xpath(selectors.screenDropdownOption.replace('screenName', screenName)).last().click({force: true});
		// cy.xpath(selectors.screenForInputDropdown).should('have.value', screenName);
	}

	createUser(username, firstName, lastName, jobTitle, status, email, password) {
		cy.get(selectors.newUserBtn).click();
		//fll data to user
		cy.get(selectors.usernameInputTxtBox).type(username).should('have.value', username);
		cy.get(selectors.firstNameInputTxtBox).type(firstName).should('have.value', firstName);
		cy.get(selectors.lastNameInputTxtBox).type(lastName).should('have.value', lastName);
		cy.get(selectors.jobTitleInputTxtBox).type(jobTitle).should('have.value', jobTitle);
		cy.get(selectors.statusDropdown).select(status);
		cy.get(selectors.emailInputTxtBox).type(email).should('have.value', email);
		cy.get(selectors.passwordInputTxtBox).type(password).should('have.value', password);
		cy.get(selectors.confirmPasswordInputTxtBox).type(password);

		cy.get(selectors.saveUserBtn).click();
		cy.xpath(selectors.profileUserLabel).should('be.visible');
	}

	createGroup(name, description){
		cy.get(selectors.newGroupBtn).click();
		//fill dato to group
		cy.get(selectors.nameGroupInputTxtBox).type(name).should('have.value',name);
		cy.get(selectors.descriptionGroupTextareaBox).type(description).should('have.value',description);
		cy.xpath(selectors.saveGroupBtn).click();
		cy.get(selectors.groupDetailsTab).should('be.visible');
	}

	addUserToGroup(fullName){
		cy.xpath(selectors.userTab).should('be.visible').click();
		cy.get(selectors.newUserToGroupBtn).should('be.visible').click();
		cy.xpath('//div[@class="modal-content"]').should('be.visible');
		cy.get(selectors.newUserToGroupBtn).should('be.visible').click({force : true});
		cy.xpath('//div[@class="modal-content"]//label[@for="users"]/following-sibling::div//div[@class="multiselect__tags"]').click();
		cy.get(selectors.usersInputTxtBox).type(fullName).should('have.value',fullName).then(() => {
			cy.wait(3000);
			cy.get(selectors.usersInputTxtBox).type('{enter}');
		});
		cy.get(selectors.saveUserToGroupBtn).click();
		cy.get(selectors.newUserToGroupBtn).should('be.visible');
	}

	addPermissionProcessToGroup(permission){
		cy.xpath(selectors.groupTab).click();
		cy.xpath(selectors.permissionProcessTab).click();
		var editCreate = false;
		for (let key in permission) {
			let op = permission[key];
			switch (op) {
				case 'create':
					if(!editCreate){
						cy.xpath(selectors.createProcessPermissionLabel).click();
						editCreate = true;
					}
					break;
				case 'edit':
					if(!editCreate){
						cy.xpath(selectors.editProcessPermissionLabel).click();
						editCreate = true;
					}
					break;
				case 'view':
					cy.xpath(selectors.viewProcessPermissionLabel).click();
					break;
			}
		}
		cy.get(selectors.savePermissionGroupBtn).click();

	}

	addingDataToStudentCollection(date, ci, name, lastName, phone) {
		cy.get(selectors.newRecordBtn).click();
		cy.xpath(selectors.studentDateInputTxtBx).type(date).should('have.value', date);
		cy.get(selectors.CIInputTxt).type(ci).should('have.value', ci);
		cy.get(selectors.studentNameInputTxtBx).type(name).should('have.value', name);
		cy.get(selectors.lastNameInputTxtBx).type(lastName).should('have.value', lastName);
		cy.get(selectors.phoneNumberInputTxtBx).type(phone).should('have.value', phone);
		cy.get(selectors.selectlistBtn).click();
		cy.xpath(selectors.selectOption).click();
		cy.get(selectors.submitBtn).click();
		cy.get(selectors.navEditBtn).should('be.visible');
	}

	searchForUser(userName) {
		cy.xpath(selectors.userInputTxtBx).type(userName).should('have.value', userName);
		// cy.xpath(selectors.userTxt.replace('userName', userName)).should('be.visible')
	}

	searchUserName(name){
		cy.xpath(selectors.searchUserField).eq(0).type(name).click();
		cy.xpath(selectors.searchButton).eq(0).click();
		cy.get(selectors.editUserButton).eq(0).click();
	}

	deleteUser(name){
		cy.xpath(selectors.searchUserField).eq(0).type(name).click();
		cy.xpath(selectors.searchButton).eq(0).click();
		cy.wait(5000);
		cy.get('[title="Delete"] > .fas').click();
		cy.xpath("//button[contains(text(),'Confirm')]").eq(0).click();
	}

    updateUser(name){
        cy.xpath(selectors.searchUserField).eq(0).type(name).click();
        cy.xpath(selectors.searchButton).eq(0).click();
        cy.wait(5000);
        cy.get('[title="Edit"] > .fas').click();
        cy.get('#phone').type('22747395');
        cy.get('#cell').type('+59173015789');
        cy.get('#saveUser').click();
    }

    readUser(){
        cy.get('.justify-content-end > .btn-secondary').click();
    }

	selectLanguage(language){
		//cy.xpath(selectors.selectListLanguage).should('have.value', 'en');
		cy.get('select[id="language"]').select(language);
		cy.xpath(selectors.selectListLanguage).should('have.value', language);
		cy.get(selectors.saveUserBtn).click();
		cy.reload();
	}

	openPermissionTab(option){
		cy.get(selectors.tabPermissions).click();
		switch(option){
			case 'en':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Auth Clients');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Collections');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Comments');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Data Connectors');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', 'Environment Variables');
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Files (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Groups');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Notifications (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Processes');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Requests');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Saved Search');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Screens');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Scripts');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Task Assignments (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Translations');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Users');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Version History');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vocabularies');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
			case 'es':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Clientes autenticados');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Colecciones');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Comentarios');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Orígenes de datos');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', 'Variables de entorno');
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Archivos (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Grupos');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Notificaciones (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Procesos');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Solicitudes');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Búsqueda guardada');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Pantallas');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Scripts');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Asignaciones de tareas (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Traducciones');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Usuarios');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Historial de versiones');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vocabularios');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
			case 'fr':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Clients authentifiés');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Collections');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Commentaires');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Sources de données');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', "Variables d'environnement");
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Fichiers (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Groupes');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Notifications (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Processus');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Demandes');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Recherche sauvegardée');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Écrans');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Scripts');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Attributions de tâches (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Traductions');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Utilisateurs');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Historique des versions');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vocabulaires');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
			case 'de':
				cy.xpath('//*[@id="accordionPermissions"]/div[3]/div[1]/div/button/div[1]').should('contain.text', 'Authentifizierter Kunde');
				cy.xpath('//*[@id="accordionPermissions"]/div[4]/div[1]/div/button/div[1]').should('contain.text', 'Sammlungen');
				cy.xpath('//*[@id="accordionPermissions"]/div[5]/div[1]/div/button/div[1]').should('contain.text', 'Kommentare');
				cy.xpath('//*[@id="accordionPermissions"]/div[6]/div[1]/div/button/div[1]').should('contain.text', 'Datenquellen');
				cy.xpath('//*[@id="accordionPermissions"]/div[7]/div[1]/div/button/div[1]').should('contain.text', 'Umgebungsvariablen');
				cy.xpath('//*[@id="accordionPermissions"]/div[8]/div[1]/div/button/div[1]').should('contain.text', 'Dateien (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[9]/div[1]/div/button/div[1]').should('contain.text', 'Gruppen');
				cy.xpath('//*[@id="accordionPermissions"]/div[10]/div[1]/div/button/div[1]').should('contain.text', 'Benachrichtigungen (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[11]/div[1]/div/button/div[1]').should('contain.text', 'Prozesse');
				cy.xpath('//*[@id="accordionPermissions"]/div[12]/div[1]/div/button/div[1]').should('contain.text', 'Anfragen');
				cy.xpath('//*[@id="accordionPermissions"]/div[13]/div[1]/div/button/div[1]').should('contain.text', 'Gespeicherte Suche');
				cy.xpath('//*[@id="accordionPermissions"]/div[14]/div[1]/div/button/div[1]').should('contain.text', 'Ansichten');
				cy.xpath('//*[@id="accordionPermissions"]/div[15]/div[1]/div/button/div[1]').should('contain.text', 'Skripte');
				//cy.xpath('//*[@id="accordionPermissions"]/div[16]/div[1]/div/button/div[1]').should('contain.text', 'Security Logs');
				//cy.xpath('//*[@id="accordionPermissions"]/div[17]/div[1]/div/button/div[1]').should('contain.text', 'Settings');
				//cy.xpath('//*[@id="accordionPermissions"]/div[18]/div[1]/div/button/div[1]').should('contain.text', 'Signals');
				cy.xpath('//*[@id="accordionPermissions"]/div[19]/div[1]/div/button/div[1]').should('contain.text', 'Aufgabenzuweisungen (API)');
				cy.xpath('//*[@id="accordionPermissions"]/div[20]/div[1]/div/button/div[1]').should('contain.text', 'Übersetzungen');
				cy.xpath('//*[@id="accordionPermissions"]/div[21]/div[1]/div/button/div[1]').should('contain.text', 'Benutzer');
				cy.xpath('//*[@id="accordionPermissions"]/div[22]/div[1]/div/button/div[1]').should('contain.text', 'Versionsgeschichte');
				cy.xpath('//*[@id="accordionPermissions"]/div[23]/div[1]/div/button/div[1]').should('contain.text', 'Vokabulare');
				//cy.xpath('//*[@id="accordionPermissions"]/div[24]/div[1]/div/button/div[1]').should('contain.text', 'Webhooks');
				break;
		}
	}

	openInformationTab(){
		cy.get(selectors.tabInformation).click();
	}


   async getUserId(userName){
    const userval = await promisify(cy.xpath(selectors.userIdInput.replace('userName',userName)).invoke('text').then((userID) =>{
         //cy.log(userID);
         return userID;
            }))
            return userval;
        }

	enableCollectionSignals() {
		cy.xpath(selectors.configBtn).click();
		cy.get(selectors.createSignalBtn).click();
		cy.get(selectors.updateSignalBtn).click();
		cy.get(selectors.deleteSignalBtn).click();
		cy.xpath(selectors.collectionSaveBtnSignl).click();

	}

    verifyTitlePage (title) {
        cy.visit('/admin/users');
        cy.title().should('eq', title);
    }
    verifySidebarMenuOption(num,option){
        cy.get(selectors.expandSidebarMenu).click();
        cy.get(selectors.optionInSidebar).eq(num).should('contain',option);
    }
    addPermissionToUser(){
        cy.get(selectors.permissionTabUser).click();
        cy.xpath(selectors.makeSuperAdmin).should('be.visible').click();
        cy.get(selectors.saveButton).click();
    }

	switchChangePassword(){
		cy.get(':nth-child(6) > .grouped > .custom-control').click('left');
		cy.get(selectors.saveUserBtn).click();
	}

    openUserSignalTab(){
        cy.xpath("//body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/ul[1]/li[7]/a[1]").click();
    }

    setCreateSignal(){
        cy.xpath('//body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[7]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[1]/td[2]/span[1]/div[1]').click('left');
    }

    setDeleteSignal(){
        cy.xpath('//body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[7]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[2]/td[2]/span[1]/div[1]').click('left');
    }

    setUpdateSignal(){
        cy.xpath('//body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[7]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[4]/td[2]/span[1]/div[1]').click('left');
    }

    setReadSignal(){
        cy.xpath('//body[1]/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[2]/div[7]/div[1]/div[1]/div[1]/div[2]/div[1]/table[1]/tbody[1]/tr[3]/td[2]/span[1]/div[1]').click('left');
    }
    addDashboard(name, screen, description) {
        cy.get(".nav-link").contains("Dashboards").click();
        cy.get('[aria-label="Create Configuration Dashboard"]').click();
        cy.xpath("//legend[text()='Name']/following-sibling::div/input").type(name);
        cy.xpath("//legend[text()='Screen']/following-sibling::div//div[@class='multiselect__spinner']").should('not.be.visible');
        cy.xpath("//legend[text()='Screen']/following-sibling::div//div[@class='multiselect__select']").click();
		cy.xpath("//legend[text()='Screen']/following-sibling::div//input").type(screen).should('have.value',screen);

		cy.xpath("//legend[text()='Screen']/following-sibling::div//div[@class='multiselect__content-wrapper']//li[1]")
			.should('have.attr', 'aria-label')
			.and('contain', screen+ '. ');
		cy.xpath("//legend[text()='Screen']/following-sibling::div//input").type('{enter}');

        cy.xpath("//legend[contains(text(),'Description')]/following-sibling::div//textarea").type(description);
        cy.xpath("//button[text()='Save']").click();
    }
    deleteDashboard(nameDashboard) {
        cy.get(".nav-link").contains("Dashboards").click();
        cy.get('[placeholder="Search"]')
            .click()
            .type(nameDashboard)
            .type(" ")
            .type("{backspace}");
        cy.get(".vuetable-body").should("contain", nameDashboard);
        cy.get('[class="btn btn-link"]').eq(3).click();
        cy.get('[class="btn m-0 btn-secondary"]').click();
        cy.get(
            '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
        ).should("be.visible");
    }
    addMenu(name, description) {
        cy.get(".nav-link").contains("Menu").click();
        cy.get('[aria-label="Create Menu"]').click();
        cy.get(".form-control").eq(1).type(name);
        cy.get(".form-control").eq(2).type(description);
        cy.contains(".btn.btn-secondary.ml-3", "Save").click();
    }
    deleteMenu(nameMenu) {
        cy.get(".nav-link").contains("Menu").click()
        cy.get('[placeholder="Search"]')
            .type(nameMenu)
            .type(" ")
            .type("{backspace}");
        cy.get(
            '[item-index="0"] > :nth-child(2) > .popout > button.btn > .fas'
        ).click();
        cy.get('[class="btn m-0 btn-secondary"]').click();
    }

    searchMenu(name) {
        cy.get('[placeholder="Search"]').click().type(name);
        cy.get(".data-table > .card").should("be.visible");
        cy.get(".pagination").should("contain", "1 - 1 of 1 Menu");
    }

    editMenu(linkName, url) {
        cy.get('[title="Edit Menu"]').click();
        cy.get('[aria-label="Create Link"]').click();
        cy.get("#package-dynamic-ui-menu-link-add___BV_modal_content_")
            .children()
            .eq(1)
            .children()
            .eq(0)
            .children()
            .eq(0)
            .type(linkName);
        cy.get("#package-dynamic-ui-menu-link-add___BV_modal_content_")
            .children()
            .eq(1)
            .children()
            .eq(3)
            .children()
            .eq(0)
            .type(url);
        cy.get(
            "#package-dynamic-ui-menu-link-add___BV_modal_footer_ > .w-100 > .btn-secondary"
        ).click();
    }

    searchGroupAndEdit(nameGroup) {
        cy.get('[placeholder="Search"]').should("be.visible");
        cy.get('[placeholder="Search"]')
            .click()
            .type(nameGroup)
            .type(" ")
            .type("{backspace}");
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
        cy.get(".pagination")
            .should("be.visible")
            .and("contain", "1 - 1 of 1 Group");
            cy.xpath('//div[@id="main"]//table/tbody/tr//button[@aria-haspopup="menu"]').should('be.visible').click();
    }

    /**
     * This method is responsible for search an user
     * @param nameUser: name of user
     * @return nothing returns
     */
    searchUserAndEdit(nameUser) {
        const editBtnXPATH = "//span[normalize-space()='Edit User']";
        cy.get('[placeholder="Search"]').should("be.visible");
        cy.get('[placeholder="Search"]').eq(0).click().type(nameUser);
        cy.get('[placeholder="Search"]')
            .eq(0)
            .click()
            .type(" ")
            .type("{backspace}");
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
        cy.get('[placeholder="Search"]').should("have.value", nameUser);
        cy.xpath("(//button[@class='btn dropdown-toggle btn-ellipsis dropdown-toggle-no-caret'])[1] ").should("be.visible").click();
        cy.xpath(editBtnXPATH.replace('nameUser',nameUser),{ timeout: 10000 })
            .should('be.visible').click();
    }
    //Select "MyDashboard" In Home Page
    selectMyDashboardInHomePage() {
        cy.get("#dynamic-ui").should("be.visible");
        cy.xpath("//label[text()='Home Page']/parent::div//div[@class='multiselect__select']").click();
        cy.xpath("//label[text()='Home Page']/parent::div//input").type("My Dashboard").should('have.value',"My Dashboard");

		cy.xpath("//label[text()='Home Page']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
			.should('have.attr', 'aria-label')
			.and('equal', "My Dashboard. ");
		cy.xpath("//label[text()='Home Page']/parent::div//input").type('{enter}');
    }

    //Assign dashboard to User
    selectDashboardToUser(nameDashboard) {
    	cy.xpath("//label[text()='Dashboard']/parent::div//div[@class='multiselect__tags']").should('be.visible');
		cy.xpath("//label[text()='Dashboard']/parent::div//div[@class='multiselect__tags']").click();
		cy.xpath("//label[text()='Dashboard']/parent::div//input").type(nameDashboard).should('have.value',nameDashboard);

		cy.xpath("//label[text()='Dashboard']/parent::div//div[@class='multiselect__content-wrapper']//li[1]")
			.should('have.attr', 'aria-label')
			.and('equal', nameDashboard+". ");
		cy.xpath("//label[text()='Dashboard']/parent::div//input").type('{enter}');
    }
    //Assign Menu to User
    selectMenuToUser(nameMenu) {
        cy.get("#dynamic-ui")
            .children()
            .eq(2)
            .children()
            .eq(1)
            .click()
            .type(nameMenu)
            .contains(nameMenu)
            .click();
    }
    saveChagesInProfile() {
        cy.get("#saveUser").click();
        cy.get(
            '[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]'
        ).should("be.visible");
    }
    verifyPresenceOfCollectionAndImportCollection(collectionName, filePath) {
        var editBtn = "[title='Records'] > .fas";
        cy.get(editBtn).should('be.visible');
        cy.get(selectors.searchInputBox).type(collectionName).should('have.value', collectionName);
        cy.wait(5000);
        cy.xpath(selectors.collectionTable, { timeout: 10000 })
            .find('td')
            .then(($loadedTable) => {
                if ($loadedTable.length === 1) {
                    this.importCollection(filePath);
                }
                else return;
            });
    }
    importCollection(filePath) {
        cy.get(selectors.importCollectionBtn).click();
        cy.get(selectors.importBtn).should('be.visible');
        cy.get(selectors.inputToFileUpload).attachFile(filePath);
        cy.get(selectors.importBtn).click();
        cy.get(selectors.loadingCollectionSpinner).should('not.exist');
        navHelper.navigateToAdminPage();
        cy.wait(6000);
        navHelper.navigateToCollectionPage();
        cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-danger"]').should('not.exist');
        cy.wait(2000);
    }

    clickOnImportButton() {
        cy.get(selectors.importCollectionBtn).click();
        cy.get(selectors.browseBtn).should('be.visible');
    }

    /**
     * This method is responsible for removing all active columns from a collection
     * @param nameColumnsList: name of the column list to be removed
     * @return nothing returns
     */
    deleteAllActiveColumnsFromCollection(nameColumnsList){
	    cy.xpath(selectors.collectionColumnsTab).click();
	    const len = nameColumnsList.length;
	    for(var i=0; i<len; i++){
            this.deleteActiveColumnFromCollection(nameColumnsList[i]);
        }
    }

    /**
     * This method is responsible for removing an active columns from a collection
     * @param nameColumn: name of the column to be removed
     * @return nothing returns
     */
    deleteActiveColumnFromCollection(nameColumn){
	    cy.xpath(selectors.activeColumns_coulumnLinkDelete.replace('nameColumn', nameColumn)).should('be.visible').click();
        cy.xpath(selectors.activeColumns_coulumnLinkDelete.replace('nameColumn', nameColumn)).should('not.be.visible');
    }

    /**
     * This method is responsible for reset to default configuration from a collection
     * @return nothing returns
     */
    resetToDefaultColumnsCollection(){
	    cy.xpath(selectors.activeColumns_resetToDefaultBtn).click();
	    cy.xpath("//button[text()='Confirm']").should('be.visible').click();
    }

    /**
     * This method is responsible for save changes on colecction configuration
     * @return nothing returns
     */
    saveChangesOnConfigCollection(){
	    cy.xpath("//div[@class='d-flex']//button[text()='Save']").should('be.visible').click();
	    cy.get('[class="alert d-none d-lg-block alertBox alert-dismissible alert-success"]').should('be.visible');
    }

    /**
     * This method is responsible for add a new column in collection configuration
     * @param label: value to label input
     * @param field: value to field input
     * @param format: value to format select list
     * @return nothing returns
     */
    addActiveColumnInCollection(label, field, format){
	    cy.xpath(selectors.activeColumns_addCustomColumnLink).click();
	    cy.xpath(selectors.customColumn_field).should('be.visible');
        cy.xpath(selectors.customColumn_label).type(label).should('have.value',label);
        cy.xpath(selectors.customColumn_field).type(field).should('have.value',field);
        cy.xpath('//legend[text()="Format"]/parent::fieldset//div[@class="multiselect__tags"]').click();
        cy.xpath('//legend[text()="Format"]/parent::fieldset//input').type(format).type('{enter}');
        cy.xpath(selectors.customColumn_save).click();
    }
    /**
     * This method is responsible for get tocket an user in PM4
     * @param userName: name of users
     * @return bearer token
     */
    async userGetToken(userName = 'admin'){
        this.searchUserAndEdit(userName);
        cy.get('[id="nav-tokens-tab"]').click();
        cy.xpath('//button[@aria-label="New Token"]').should('be.visible').click();
        return (await promisify (cy.get('[id="generated-token"]').should('be.visible')
            .invoke('val').then((val) => {
                const url = val;
                cy.log("URL Token",url).then(() =>{
                    return url;
                })
            })));
    }
 //Select "MyDashboard" in Home Page
    selectMyDashboardInHomePageOfGroup() {
        cy.get(selectors.groupDetailsTableContent).should("be.visible");
        cy.xpath(selectors.labelHomePage, { timeout: 5000 })
            .should("be.visible")
            .should("contain", "Home Page");
        cy.xpath(selectors.divContainerOptionHomePage).click();
        cy.xpath(selectors.inputOptionHomePage).type("My Dashboard").should('have.value',"My Dashboard");
        cy.xpath('//span[text()="My Dashboard"]/ancestor::ul[@id="listbox-1"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', "My Dashboard"+". ");
        cy.wait(2000);
        cy.xpath(selectors.inputOptionHomePage).type('{enter}');
    }
    //Assign dashboard to to Group
    selectDashboardToGroup(nameDashboard) {
        cy.xpath(selectors.labelDashboard, { timeout: 5000 })
            .should("be.visible")
            .and("contain", "Dashboard");
        cy.xpath(selectors.divContainerOptionDashboard).click();
        cy.xpath(selectors.inputOptionDashboard).type(nameDashboard).should('have.value', nameDashboard);
        cy.xpath('//label[text()="Dashboard"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', nameDashboard+". ");
        cy.xpath(selectors.inputOptionDashboard).type('{enter}');

    }
    //Assign Menu to Group
    selectMenuToGroup(nameMenu) {
        cy.xpath(selectors.labelMenu).should("be.visible")
            .and("contain", "Top Menu");
        cy.xpath(selectors.divContainerOptionTopMenu).click();
        cy.xpath(selectors.inputOptionTopMenu).type(nameMenu).should('have.value', nameMenu);
        cy.xpath('//label[text()="Top Menu"]/parent::div//div[@class="multiselect__content-wrapper"]//li[1]')
            .should('have.attr', 'aria-label')
            .and('equal', nameMenu+". ");
        cy.xpath(selectors.inputOptionTopMenu).type('{enter}');

    }
    saveChagesInGroupDetails() {
        cy.get(selectors.saveGroupDetailsBtn).click();
    }
    deleteAllMenus() {
        cy.xpath(selectors.rowInMenuTable)
            .find("td")
            .then(($rowM) => {
                if ($rowM.length === 1) {
                    return;
                } else {
                    cy.get(selectors.columnInTable).then(($columnMenu) => {
                        let len = $columnMenu.length / 2;
                        for (var i = 0; i < len; i++) {
                            this.deleteFirstRow();
                            navHelper.navigateToAdminCustomizePage();
                            cy.get(".nav-link").contains("Menu").click();
                        }
                    });
                }
            });
    }
    deleteAllDashboards() {
        cy.xpath(selectors.rowInDashboardTable)
            .find("td")
            .then(($rowD) => {
                if ($rowD.length === 1) {
                    return;
                } else {
                    cy.get(selectors.columnInTable).then(($columnDash) => {
                        let len = $columnDash.length / 2;
                        for (var i = 0; i < len; i++) {
                            this.deleteFirstRow();
                            navHelper.navigateToAdminCustomizePage();
                            cy.get(".nav-link").contains("Dashboard").click();
                        }
                    });
                }
            });
    }
    deleteFirstRow() {
        cy.get(selectors.deleteBtnInTable).first().click();
        cy.get(selectors.confirmDeleteBtn).click();
    }

    createGroupAddingUsers(testname4, testname2, testname1) { //create group
        cy.xpath(selectors.clickonGroupBtn).click();
        cy.wait(3000);
        cy.xpath(selectors.GroupPagevisible).should('be.visible');
        cy.xpath(selectors.clickonplsGroup).click();
        cy.wait(2000);
        cy.xpath(selectors.groupNameBtn).type(testname4);
        cy.xpath(selectors.descriptionBtn).type(testname4);
        cy.xpath(selectors.groupsaveBtn).click();
        cy.wait(3000);
        cy.xpath(selectors.clickonGroupBtn).click();
        cy.xpath(selectors.groupSearchInpBx).type(testname4);
        cy.xpath(selectors.searchBtn).click();
        cy.xpath(selectors.verifyGroupName).should('contain', testname4);
        cy.xpath(selectors.clickGroupEditBt).click();
        cy.xpath(selectors.CrtGrpPageVsb).should('be.visible');
        cy.xpath(selectors.clickonUserBtn).click();
        cy.xpath(selectors.userPageVsble).should('be.visible');
        cy.xpath(selectors.crtuserBtn).click();
        cy.xpath(selectors.selectUserBtn).type(testname2);
        cy.xpath(selectors.userInputText.replace('testname1', testname2)).click({ multiple: true });
        cy.xpath(selectors.clickonSaveBtn).click();
        cy.xpath(selectors.clickonGroup).click();

        cy.xpath(selectors.clickonsaveBtn2).click();
    }

    addPublicFileInFileManager() {
        cy.get(selectors.addPublicFileBtn).click();
    }
    selectFileInFileManager(filePath) {
        cy.get(selectors.selectFileBtn).attachFile(filePath);
        cy.xpath('//div[@class="uploader-list"]/ul/li/div[@status="uploading"]').should('be.visible')
        cy.xpath('//div[@class="uploader-list"]/ul/li/div[@status="uploading"]').should('not.be.exist')
    }
    doneUploadPublicFile(){
        cy.get(selectors.doneBtn).click();
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('be.visible');
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('not.exist')
    }

    createFolder(folderName){
        cy.xpath('//div[@class="modal-content"]//header//h5[text()="Create Folder"]').should('be.visible');
        cy.get('input[placeholder="Untitled folder"]').type(folderName).should('have.value',folderName);
        cy.xpath('//div[@class="modal-content"]//footer//button[text()="Create"]').click();
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('be.visible');
        cy.xpath('//div[@class="container text-center"]/div[@class="icon-container"]').should('not.exist')
    }
    
    /**
     * This method is responsible to search a User. If the user not exist then it will be created
     * @param username: value to label input
     * @param firstName: value to field input
     * @param lastName: value to format select list
     * @param jobTitle: value to format select list
     * @param status: value to format select list
     * @param email: value to format select list
     * @param password: value to format select list
     * @return nothing returns
     */
     createUserIfNotExist(username, firstName, lastName, jobTitle, status, email, password) {
        //search user
        cy.xpath(selectors.threePointsBtnXpath).should('be.visible');
        cy.get(selectors.searchInputBox).first().type(username).should('have.value', username);
        cy.get('#users-listing > div.container-fluid > div > div.jumbotron.jumbotron-fluid').first().should('be.visible');
        cy.wait(2000)
        cy.xpath('//div[@id="users-listing"]/div[2]/div/div[2]/table/tbody/tr', { timeout: 10000 })
        .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length === 1){
                    this.createUser(username, firstName, lastName, jobTitle, status, email, password)
                }
                else return;
            });
    }

    /**
     * This method is for granting custom permissions to a user(For now it works for COMMENTS and NOTIFICATIONS,but it can be expanded for more sections, following the same logic)
     * @param permission: It is a permission that you want to enable.
     * For example if I want to enable the "create", "delete" and "view" permissions in the Comments section,
       You must enter the following:{ name: "Comments", create: 1, edit: 0, delete: 1, view: 1 }
     */

       addSpecificPermissionsToUser(permission) {
        cy.get(selectors.permissionTabUser).click();
        permission.forEach((element) => {
            cy.log(element.name);
            cy.xpath(`//div[text()='${element.name}']`).click();
            switch (element.name) {
                case "Notifications (API)":
                    element.create &&
                        cy.get(selectors.createNotificationsPermission).click();
                    element.delete &&
                        cy.get(selectors.deleteNotificationPermission).click();
                    element.edit &&
                        cy.get(selectors.editNotificationPermission).click();
                    element.view &&
                        cy.get(selectors.viewNotificationPermission).click();
                    break;
                case "Comments":
                    element.create &&
                        cy.get(selectors.createCommentsPermission).click();
                    element.delete &&
                        cy.get(selectors.deleteCommentsPermission).click();
                    element.edit &&
                        cy.get(selectors.editCommentsPermission).click();
                    element.view &&
                        cy.get(selectors.viewCommentsPermission).click();
                    break;
                default:
                    break;
            }
            cy.get('[id="savePermissions"]').click();
        });
    }

    /**
	 * This method is responsible to delete group
	 * @param nameGroup: group name
	 * @return nothing returns
	 */
	deleteGroup(nameGroup){
		cy.get('[placeholder="Search"]').should("be.visible");
		cy.get('[placeholder="Search"]')
			.click()
			.type(nameGroup)
			.type(" ")
			.type("{backspace}");
		cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
		cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
		cy.get(".pagination")
			.should("be.visible")
			.and("contain", "1 - 1 of 1 Group");
		cy.get('[title="Delete"]').click();
		cy.get('button[class="btn m-0 btn-secondary"]').click();
	}
    goToEditMenu(){
        cy.get('[title="Edit Menu"]').first().should("be.visible").click();
    }
    addLinkToMenu(linkText, iconName, color, url) {
        //Add Link
        cy.get('button[aria-label="Create Link"]').click();
        //text
        cy.xpath('//legend[text()="Link Text"]/parent::fieldset//input')
            .should("be.visible")
            .click();
        cy.xpath('//legend[text()="Link Text"]/parent::fieldset//input').type(
            linkText
        );
        //icon
        cy.xpath(
            '//legend[text()="Icon"]/parent::fieldset//div[@class="multiselect__select"]'
        ).click();
        cy.xpath(
            '//legend[contains(text(),"Icon")]/parent::fieldset//div[@class="multiselect__content-wrapper"]//i[@class="fas fa-fw fa-' +
                iconName +
                '"]'
        ).click();
        cy.xpath(
            '//div[@class="modal-content"]//legend[text()="Icon"]//following-sibling::div//div[@class="multiselect__tags"]//span/i'
        ).should("have.class", "fas fa-fw fa-" + iconName);
        cy.xpath(
            '//div[@class="modal-content"]//legend[text()="Icon"]//following-sibling::div//span/i'
        ).should("have.class", "fas fa-fw fa-" + iconName);
        //color variant
        cy.get('[class="custom-select"]')
            .select(color)
            .should("have.value", color);
        //URL
        cy.xpath('//legend[text()="URL"]/parent::fieldset//input')
            .should("be.visible")
            .click();
        cy.xpath('//legend[text()="URL"]/parent::fieldset//input').type(url);
        //Check Open in new window
        cy.get('[type="checkbox"]').click({ force: true });
        //save
        cy.xpath(
            '//footer[@class="modal-footer"]//button[@class="btn btn-secondary ml-3"]'
        ).click();
    }

    /**
     * This method is responsible to create and configure a email server
     * @param serverEmailSetup: is a object as {type:'smtp',aliasEmail:nameAliasEmail,senderEmail: 'testqa@mailtrap.com',senderName: 'testqa@mailtrap.com',serverHost: 'smtp.mailtrap.io',serverPort: '25',option: 'tls',user: 'XXXXXXXXXXXXXx',password: 'XXXXXXXXX'};
     * @return nothing returns
     */
    createMailServer(serverEmailSetup){
        cy.xpath('//a[text()="Email Default Settings"]').should('be.visible');
        cy.xpath('//a[text()="Email Default Settings"]').click();
        cy.xpath('//button[contains(text(),"+ Mail Server")]').should('be.visible');
        cy.intercept('POST','/api/1.0/plugins/email/server').as('createEmailServer');
        cy.xpath('//button[contains(text(),"+ Mail Server")]').first().click();
        cy.wait('@createEmailServer',{responseTimeout:10000}).its('response.body').then(($data)=>{
            var newEmailServerName = $data.name;
            cy.log(newEmailServerName)
            cy.xpath('//a[text()="'+newEmailServerName+'"]').should('be.visible');
            cy.xpath('//a[text()="'+newEmailServerName+'"]').click();
            cy.xpath('//tr//td//div[contains(text(),"'+newEmailServerName+'")]').should('be.visible');
        });
        var emailServerType = serverEmailSetup.type;
        switch(emailServerType){
            case "smtp":
                //variables
                var aliasServerEmailTxt= serverEmailSetup.aliasEmail;
                var senderEmailTxt = serverEmailSetup.senderEmail;
                var senderNameTxt = serverEmailSetup.senderName;
                var serverHostTxt = serverEmailSetup.serverHost;
                var serverPortTxt = serverEmailSetup.serverPort;
                var secureOption = serverEmailSetup.option;
                var userAccount = serverEmailSetup.user;
                var userAccountPass = serverEmailSetup.password;
                //edit Mailer alias name
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="1"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(aliasServerEmailTxt);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="1"]//td[@aria-colindex="2"]').should('have.contain',aliasServerEmailTxt);

                //edit sender email
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="3"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(senderEmailTxt);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="3"]//td[@aria-colindex="2"]').should('have.contain',senderEmailTxt);

                //edit sender name
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="4"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(senderNameTxt);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="4"]//td[@aria-colindex="2"]').should('have.contain',senderNameTxt);

                //edit server host
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="5"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(serverHostTxt);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="5"]//td[@aria-colindex="2"]').should('have.contain',serverHostTxt);

                //edit server port
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="6"]//td[@aria-colindex="2"]').invoke('text').then(($port)=>{
                    cy.log("port="+$port+"/");
                    if($port.trim() !== serverPortTxt){
                        cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="6"]//button[@aria-label="Edit"]').click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//div[@class="modal-content"]//div/input').clear().type(serverPortTxt);
                        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                        cy.xpath('//div[@role="alert"]').should('not.exist');
                    }
                    cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="6"]//td[@aria-colindex="2"]').should('have.contain',serverPortTxt);
                });

                //edit server secure option
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="7"]//td[@aria-colindex="2"]').invoke('text').then(($option)=>{
                    cy.log("port="+$option+"/");
                    if($option.trim() !== secureOption){
                        cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="7"]//button[@aria-label="Edit"]').click();
                        cy.xpath('//div[@class="modal-content"]').should('be.visible');
                        cy.xpath('//label[text()="'+secureOption+'"]').click();
                        cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                        cy.xpath('//div[@role="alert"]').should('not.exist');
                    }
                    cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="7"]//td[@aria-colindex="2"]').should('have.contain',secureOption);
                });

                //edit user account
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="8"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(userAccount);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('not.exist');
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="8"]//td[@aria-colindex="2"]').should('have.contain',userAccount);

                //edit password account
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="9"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//div[@class="modal-content"]//div/input').clear().type(userAccountPass);
                cy.xpath('//div[@class="modal-content"]//footer//button[contains(text(),"Save")]').click();
                cy.xpath('//div[@role="alert"]').should('not.exist');

                break;
            case "sendmail":
                //press edit Email Server button
                cy.xpath('//div[@aria-hidden="false"]//tr[@aria-rowindex="2"]//button[@aria-label="Edit"]').click();
                cy.xpath('//div[@class="modal-content"]').should('be.visible');
                cy.xpath('//label[text()="'+emailServerType+'"]').click();
                break;
            case "mailgun":
                break;
            case "postmark":
                break;
            case "ses":
                break;
        }
    }

    /**
     * This method is responsible to verify if a email server exists or not
     * @param serverEmailSetup: is a object as {type:'smtp',aliasEmail:nameAliasEmail,senderEmail: 'testqa@mailtrap.com',senderName: 'testqa@mailtrap.com',serverHost: 'smtp.mailtrap.io',serverPort: '25',option: 'tls',user: 'XXXXXXXXXXXXXx',password: 'XXXXXXXXX'};
     * @return nothing returns
     */
    createEmailServerIfNotExist(serverEmailSetup){
        var nameAliasEmail = serverEmailSetup.aliasEmail;
        cy.xpath('//div[@id="settings"]//ul[@role="tablist"]//li//a').then((elem)=>{
            const nroTabs = elem.length;
            var res = 0;
            for(let $i=0;$i<nroTabs;$i++){
                cy.xpath('//div[@id="settings"]//ul[@role="tablist"]//li//a').eq($i).click();
                cy.get('div[aria-hidden="false"] tr[aria-rowindex="1"] > td[aria-colindex="2"]').invoke('text')
                    .then(elem => {
                        if(elem.trim() !== nameAliasEmail){
                            res++;
                        }
                        if(res === nroTabs)
                            this.createMailServer(serverEmailSetup);
                        else
                            cy.log('email server exits: '+nameAliasEmail);
                    });
            }
        })
    }
    createGroupIfNotExist(nameGroup,description) {
        //search group
        cy.get('[placeholder="Search"]').should("be.visible").click()
            .type(nameGroup).should('have.value',nameGroup);
            cy.wait(5000)
        cy.xpath('//div[@class="data-table"]//tbody//tr')
            .find('td')
            .then((loadedTable) => {
                cy.log(loadedTable)
                if(loadedTable.length > 1){  
                    return;
                }
                else {
                     this.createGroup(nameGroup,description)
                }
            });
    }

    /**
    * This method was created to create an auth client
    * @param name: name of the auth client
    * @param website: redirect website
    * @return nothing returns
    */
    createAuthClient(name, website){
        cy.xpath(selectors.authClientButton).should('be.visible').click();
        cy.xpath('//input[@id="name"]').click().type(name).should('have.value', name);
        cy.xpath('//input[@value="authorization_code_grant"]').click({force: true});
        cy.xpath('//input[@id="redirect"]').type(website);
        cy.xpath('//button[text()="Save"]').click({force: true});
    }
    /**
    * This method was created to update an auth client
    * @param name: name of the auth client
    * @return nothing returns
    */
    updateAuthClient(name,newName = 'userName'){
        cy.xpath(selectors.authClientButton).should('be.visible');
        cy.xpath('//input[@aria-label="Search"]')
            .click()
            .type(name, {force:true});
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
        cy.wait(3000);
        cy.get(".pagination")
            .should("be.visible")
            .and("contain", "1 - 1 of 1 Auth Client");
        cy.xpath('(//button[@aria-haspopup="menu"]/i)[2]').click();
        cy.xpath('//span[text()="Edit Auth Client"]').click();
        cy.xpath('//input[@id="name"]').clear().click().type(newName).should('have.value', newName);
        cy.xpath('//button[text()="Save"]').click({force: true});
    } 
    /**
    * This method was created to delete an auth client
    * @param name: name of the auth client
    * @return nothing returns
    */
    deleteAuthClient(name){
        cy.xpath(selectors.authClientButton).should('be.visible');
        cy.xpath('//input[@aria-label="Search"]')
            .click()
            .type(name, {force:true});
        cy.get(".jumbotron.jumbotron-fluid").should("be.visible");
        cy.get(".jumbotron.jumbotron-fluid").should("not.be.visible");
        cy.wait(3000);
        cy.get(".pagination")
            .should("be.visible")
            .and("contain", "1 - 1 of 1 Auth Client");
        cy.xpath('(//button[@aria-haspopup="menu"]/i)[2]').click();
        cy.xpath('//span[text()="Delete Auth Client"]').should('be.visible').click();
        cy.xpath('//button[text()="Confirm"]').click();
    }
}
