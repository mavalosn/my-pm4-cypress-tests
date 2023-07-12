import {
    Login
  } from "../pages/login"

const login = new Login();
describe('Get navigator', () => {
    beforeEach(() => {
        login.navigateToUrl();
        login.login();
    })

    it('get selectors', () =>{
        cy.visit("/admin/users");
    });
})