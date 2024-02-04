// Budget API
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.use('/', express.static('public'));

const data = fs.readFileSync('budget.json', 'utf8');

app.get('/budget', (req, res) => {
    res.send(data);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});