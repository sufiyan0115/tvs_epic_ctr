const pdfkit=require("pdfkit");
const fs=require('fs');
const options={
    userPassword : "12345"
}
const doc=new pdfkit(options);
doc.text('hello world', 100, 100);
doc.pipe(fs.createWriteStream('./test/output.pdf'));
doc.end();