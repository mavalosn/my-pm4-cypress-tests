import { Login} from "../../../pages/login";
import { NavigationHelper } from "../../../helpers/navigationHelper";
import { Header } from "../../../pages/header";
import { Requests } from "../../../pages/requests";
import { Tasks } from "../../../pages/tasks";
import { Process } from "../../../pages/process";
import { Admin } from "../../../pages/admin";

const login = new Login();
const navHelper = new NavigationHelper();
const header = new Header();
const requests = new Requests();
const tasks = new Tasks();
const process = new Process();
const admin = new Admin();

describe("Processmaker Test Cases", () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('TCP4 - 2408', () =>{
        //Go to Admin
        navHelper.navigateToAdminUserPage();
        //Creating User
        var username = "TestPM-" + new Date().getTime();
        var timeStamp = new Date().getTime();
        var firstName = "TestPM" + timeStamp;
        var lastName = "TestPM" + timeStamp;
        var jobTitle = "QA";
        var status = "Active";
        var email = "testpm+"+timeStamp+"@gmail.com";
        var password = "Colosa123";
        admin.createUser(username, firstName, lastName, jobTitle, status, email, password);

        //Assign persmission to newUser

        admin.addPermissionToUser();

        //Log out
        navHelper.navigateToLogOut();

        //Log in with the user created
        login.navigateToUrl();
        login.login(username,password);


        //Spanish
        navHelper.navigateToEditAdminProfile('Edit Profile - ProcessMaker');
        header.choseLanguage('es');

        requests.verifyTitlePage('Mis solicitudes - ProcessMaker');
        requests.verifySidebarMenuOption(0,'Iniciado por mi');
        requests.verifySidebarMenuOption(1,'En proceso');
        requests.verifySidebarMenuOption(2,'Completado');
        requests.verifySidebarMenuOption(3,'Todas las solicitudes');
        requests.verifySidebarMenuOption(4,'Editar búsquedas guardadas');

        tasks.verifyTitlePage('Tareas por hacer - ProcessMaker');
        tasks.verifySidebarMenuOption(0,'Por hacer');
        tasks.verifySidebarMenuOption(1,'Completado');
        tasks.verifySidebarMenuOption(2,'Autoservicio');
        tasks.verifySidebarMenuOption(3,'Editar búsquedas guardadas');

        process.verifyTitlePage('Procesos - ProcessMaker');
        process.verifySidebarMenuOption(0,'Procesos');
        process.verifySidebarMenuOption(1,'Scripts');
        process.verifySidebarMenuOption(2,'Pantallas');
        process.verifySidebarMenuOption(3,'Variables de entorno');
        //process.verifySidebarMenuOption(4,'Signals');
        process.verifySidebarMenuOption(5,'Orígenes de datos');
        process.verifySidebarMenuOption(6,'Vocabularios');

        admin.verifyTitlePage('Usuarios - ProcessMaker');
        admin.verifySidebarMenuOption(0,'Usuarios');
        admin.verifySidebarMenuOption(1,'Grupos');
        //admin.verifySidebarMenuOption(2,'Settings');
        admin.verifySidebarMenuOption(3,'Clientes autenticados');
        admin.verifySidebarMenuOption(4,'Personalizar UI');
        admin.verifySidebarMenuOption(5,'Gestión de cola');
        admin.verifySidebarMenuOption(6,'Ejecutores de scripts');
        admin.verifySidebarMenuOption(7,'Colecciones');
        admin.verifySidebarMenuOption(8,'Administrador de archivos');
        admin.verifySidebarMenuOption(9,'Traducciones');

        //French
        navHelper.navigateToEditAdminProfile('Editar perfil - ProcessMaker');
        header.choseLanguage('fr');

        requests.verifyTitlePage('Mes demandes - ProcessMaker');
        requests.verifySidebarMenuOption(0,'Initiée par moi');
        requests.verifySidebarMenuOption(1,'En cours');
        requests.verifySidebarMenuOption(2,'Terminée');
        requests.verifySidebarMenuOption(3,'Toutes les demandes');
        requests.verifySidebarMenuOption(4,'Modifier les recherches sauvegardées');

        tasks.verifyTitlePage('Tâches à faire - ProcessMaker');
        tasks.verifySidebarMenuOption(0,'À faire');
        tasks.verifySidebarMenuOption(1,'Terminée');
        tasks.verifySidebarMenuOption(2,'Libre service');
        tasks.verifySidebarMenuOption(3,'Modifier les recherches sauvegardées');

        process.verifyTitlePage('Processus - ProcessMaker');
        process.verifySidebarMenuOption(0,'Processus');
        process.verifySidebarMenuOption(1,'Scripts');
        process.verifySidebarMenuOption(2,'Écrans');
        process.verifySidebarMenuOption(3,"Variables d'environnement");
        //process.verifySidebarMenuOption(4,'Signals');
        process.verifySidebarMenuOption(5,'Sources de données');
        process.verifySidebarMenuOption(6,'Vocabulaires');

        admin.verifyTitlePage('Utilisateurs - ProcessMaker');
        admin.verifySidebarMenuOption(0,'Utilisateurs');
        admin.verifySidebarMenuOption(1,'Groupes');
        //admin.verifySidebarMenuOption(2,'Settings');
        admin.verifySidebarMenuOption(3,'Clients authentifiés');
        admin.verifySidebarMenuOption(4,"Personnaliser l'IU");
        admin.verifySidebarMenuOption(5,"Gestion de la file d'attente");
        admin.verifySidebarMenuOption(6,'Exécuteurs de script');
        admin.verifySidebarMenuOption(7,'Collections');
        admin.verifySidebarMenuOption(8,'Gestionnaire de fichiers');
        admin.verifySidebarMenuOption(9,'Traductions');

        //German
        navHelper.navigateToEditAdminProfile('Modifier le profil - ProcessMaker');
        header.choseLanguage('de');

        requests.verifyTitlePage('Meine Anfragen - ProcessMaker');
        requests.verifySidebarMenuOption(0,'Von mir begonnen');
        requests.verifySidebarMenuOption(1,'In Bearbeitung');
        requests.verifySidebarMenuOption(2,'Abgeschlossen');
        requests.verifySidebarMenuOption(3,'Alle Anfragen');

        tasks.verifyTitlePage('Zu erledigende Aufgaben - ProcessMaker');
        tasks.verifySidebarMenuOption(0,'Zu erledigen');
        tasks.verifySidebarMenuOption(1,'Abgeschlossen');
        tasks.verifySidebarMenuOption(2,'Self-Service');
        tasks.verifySidebarMenuOption(3,'Gespeicherte Suchen bearbeiten');

        process.verifyTitlePage('Prozesse - ProcessMaker');
        process.verifySidebarMenuOption(0,'Prozesse');
        process.verifySidebarMenuOption(1,'Skripte');
        process.verifySidebarMenuOption(2,'Ansichten');
        process.verifySidebarMenuOption(3,"Umgebungsvariablen");
        //process.verifySidebarMenuOption(4,'Signals');
        process.verifySidebarMenuOption(5,'Datenquellen');
        process.verifySidebarMenuOption(6,'Vokabulare');

        admin.verifyTitlePage('Benutzer - ProcessMaker');
        admin.verifySidebarMenuOption(0,'Benutzer');
        admin.verifySidebarMenuOption(1,'Gruppen');
        //admin.verifySidebarMenuOption(2,'Settings');
        admin.verifySidebarMenuOption(3,'Authentifizierter Kunde');
        admin.verifySidebarMenuOption(4,'Benutzeroberfläche anpassen');
        admin.verifySidebarMenuOption(5,"Warteschlangenverwaltung");
        admin.verifySidebarMenuOption(6,'Skript-Ausführer');
        admin.verifySidebarMenuOption(7,'Sammlungen');
        admin.verifySidebarMenuOption(8,'Dateimanager');
        admin.verifySidebarMenuOption(9,'Übersetzungen');

        //English
        navHelper.navigateToEditAdminProfile('Profil bearbeiten - ProcessMaker');
        header.choseLanguage('en');
        requests.verifyTitlePage('My Requests - ProcessMaker');
        requests.verifySidebarMenuOption(0,'Started By Me');
        requests.verifySidebarMenuOption(1,'In Progress');
        requests.verifySidebarMenuOption(2,'Completed');
        requests.verifySidebarMenuOption(3,'All Requests');

        tasks.verifyTitlePage('To Do Tasks - ProcessMaker');
        tasks.verifySidebarMenuOption(0,'To Do');
        tasks.verifySidebarMenuOption(1,'Completed');
        tasks.verifySidebarMenuOption(2,'Self Service');
        tasks.verifySidebarMenuOption(3,'Edit Saved Searches');

        process.verifyTitlePage('Processes - ProcessMaker');
        process.verifySidebarMenuOption(0,'Processes');
        process.verifySidebarMenuOption(1,'Scripts');
        process.verifySidebarMenuOption(2,'Screens');
        process.verifySidebarMenuOption(3,'Environment Variables');
        //process.verifySidebarMenuOption(4,'Signals');
        process.verifySidebarMenuOption(5,'Data Connectors');
        process.verifySidebarMenuOption(6,'Vocabularies');

        admin.verifyTitlePage('Users - ProcessMaker');
        admin.verifySidebarMenuOption(0,'Users');
        admin.verifySidebarMenuOption(1,'Groups');
        //admin.verifySidebarMenuOption(2,'Settings');
        admin.verifySidebarMenuOption(3,'Auth Clients');
        admin.verifySidebarMenuOption(4,'Customize UI');
        admin.verifySidebarMenuOption(5,'Queue Management');
        admin.verifySidebarMenuOption(6,'Script Executors');
        admin.verifySidebarMenuOption(7,'Collections');
        admin.verifySidebarMenuOption(8,'File Manager');
        admin.verifySidebarMenuOption(9,'Translations');
    });
});