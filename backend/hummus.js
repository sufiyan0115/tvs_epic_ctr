const HummusRecipe = require('hummus-recipe');
const pdfDoc = new HummusRecipe('./test/input.pdf', './test/output1.pdf');

pdfDoc
    .encrypt({
        userPassword: '123',
        ownerPassword: '1234',
        userProtectionFlag: 4
    })
    .endPDF();