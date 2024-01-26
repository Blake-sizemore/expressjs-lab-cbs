const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");

let app = express();

// Tester to insure its working
// app.get('/', (req, res) => {
//     res.send('welcome to serverAgain.js');
//     });
    
// auto gathers the css,js, and html
app.use(express.static(path.join(__dirname, '../public')));

app.use((req,res, next) => {
    console.log(req.originalUrl);
    fs.appendFileSync('log.txt', `${req.url}\n`);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    fs.appendFileSync('log.txt', `${req.url,req.body.username}\n`);
    next();
});

app.post(`/submit-form`, (req,res)=>{
    console.log(req.body.username + '|' + req.body.email+'|'+req.originalUrl);
res.send('Thanks for submitting |'+req.body.username + '|' + req.body.email+'|'+req.originalUrl);
})

app.listen(3000);