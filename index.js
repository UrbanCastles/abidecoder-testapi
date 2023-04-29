const express = require("express");
const bodyParser = require('body-parser');
const abiFunctions = require('./abiFunctions.js');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/POSTDecodeInputData', (req, res) => {
    var decodedVal = abiFunctions.DecodeInputValues(req.body);
    if(decodedVal.startsWith("ERROR"))
    {
        res.status(403).send(decodedVal);
    }
    else
    {
        res.status(200).send(decodedVal);
    }
  });

app.get('/GETDecodeInputData', (req, res) => {
    var decodedVal = abiFunctions.DecodeInputValues(req.query);
    if(decodedVal.startsWith("ERROR"))
    {
        res.status(403).send(decodedVal);
    }
    else
    {
        res.status(200).send(decodedVal);
    }
});

app.listen(PORT, () =>
{
    console.log("Listening on port " + PORT)
});



