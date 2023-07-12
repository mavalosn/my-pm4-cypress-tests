/*
1. before           UNA vez  al  principio  
2. beforeEach       Antes de  c/Test    
3. Test execution   Test 
4. afterEach        Despues de  c/Test
5. beforeEach       Antes de  c/test   
6. test Execution   Test execution 
7. afterEach        Despeus de c/Test
8. after            Una vez  al Terminar   

*/ 

describe('Demo de hocks', function(){
    before(function(){
        cy.log('Before');

    });
    beforeEach(function(){
        cy.log('Before Each');

    });



    it('should be test #1', function(){
        console.log('test #1');

    });
    it('should be test #2', function(){
        console.log('test #2');

    });
    it('should be test #3', function(){
        console.log('test #3');

    });
    this.afterEach(function(){
        cy.log('After Each');

    });

    after(function(){
        cy.log('After');

    });


});