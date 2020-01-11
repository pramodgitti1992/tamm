const express = require("express");

const app = express();

const fs = require('fs');

const bodyParser = require("body-parser");

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.post("/addCreditCard", (req, res) => {

    let parsedJson = [];

    fs.readFile('./data.json', 'utf8', (err, jsonString) => {
        parsedJson = JSON.parse(jsonString);
        parsedJson.push(req.body);
        let stringifyParsedJson = JSON.stringify(parsedJson);
        fs.writeFile('./data.json', stringifyParsedJson, err => {
            stringifyParsedJson.push(JSON.parse(stringifyParsedJson));
        });
        res.send(stringifyParsedJson);
    });

});

app.listen(8080, () => {
    console.log("Server is listening on port: 8080");
});