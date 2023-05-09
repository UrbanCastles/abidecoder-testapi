const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const abiFunctions = require('./abiFunctions.js');

const app = express();

const PORT = process.env.PORT || 3000;

// Enable all CORS requests
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/POSTDecodeInputData', (req, res) => {
    res.send(abiFunctions.DecodeInputValues(req.body));
  });

app.get('/GETDecodeInputData', (req, res) => {
    res.send(abiFunctions.DecodeInputValues(req.query));
});

app.listen(PORT, () =>
{
    console.log("Listening on port " + PORT);
});
