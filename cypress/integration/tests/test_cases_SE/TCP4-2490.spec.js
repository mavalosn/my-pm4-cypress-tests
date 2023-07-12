import { Login} from "../../pages/login";
import { NavigationHelper } from "../../helpers/navigationHelper";
import {Aquiline} from "./aquiline";



const login = new Login();
const navHelper = new NavigationHelper();
const aquiline = new Aquiline();


describe("Processmaker Test Cases", () => {
    it("TCP4 - 2490 Aquiline Checking Approvers", () => {
           aquiline.aquiline2490();             
        });
     });

