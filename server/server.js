const fs = require('fs');
const express = require('express');
const { Console } = require('console');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
// const path = require('path');
// const bodyParser = require("body-parser"); merged into express

let app = express();
app.use(morgan('tiny'));
app.use(helmet());
app.use(compression());

app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use((req, res, next) => {
    fs.appendFileSync('log.text',
        `{
        "url":${req.url},
        "method" ${req.method},
        "timestamp": ${new Date().toLocaleString()},
        "ip-address":${req.ip},
        "userName": ${req.body.username}
        } \n`);
    next();
});

app.post(`/submit-form`, (req, res) => {
    const newData = {
        url: `${req.url}`,
        method: ` ${req.method}`,
        timestamp: new Date().toLocaleString(),
        ipAddress: `${req.ip}`,
        userName: `${req.body.username}`,
        email: `${req.body.email}`
    };

    fs.writeFile('last-submission.json', JSON.stringify(newData), (err) => {
        if (err) {
            console.log(err)
            res.send('Whoops there is a problem')
        } else {
            console.log('success')
            res.send(newData)
        }
    })
});

app.get('/submissions', (req, res) => {
    fs.readFile('last-submission.json', { encoding: "utf8" }, (err, data) => {
        if (err) {
            console.log(err);
            res.send('Whoops there is a problem on the link');
        } else {
            const parsed = JSON.parse(data);
            res.send(parsed);
        }
    })
});

app.listen(3000, () => { console.log(`successful connection on port 3000 (launched at ${new Date().toLocaleString()})`) });