let add = (a,b) => a +b;
let subtract = (a,b) => a -b;
let divide = (a,b) => a/b;
let multiply = (a,b) => a*b;

// desccribe o context   
describe('Unit testing for  our dummy aplication', () =>{
         context('Math with POSITIVE numbers',()=>{
            it('should add positive numbers', ()=>{
                expect(add(1,2)).to.eq(3);
            });
            it('should subtract positive numbers', ()=>{
                expect(subtract(4,2)).to.eq(2);

            });
            it('should divide positive numbers', ()=>{
                expect(divide(6,2)).to.eq(3);

            });
            it('should multiply positive numbers', ()=>{
                expect(multiply(2,2)).to.eq(4);

            });
});

         describe('Math with DECIMAL numbers',()=>{
            it('should add decimal numbers', ()=>{
                expect(add(2.2,2.2)).to.eq(4.4);

            });
            it('should subtract decimal numbers', ()=>{
                expect(subtract(4.4,2.2)).to.eq(2.2);

            });
            it('should divide decimal numbers', ()=>{
                expect(divide(4.5,2.4)).to.eq(1.875);

            });
            it('should multiply decimal numbers', ()=>{
                expect(multiply(2.2,1.2)).to.eq(2.64);

            });

         } );
});













