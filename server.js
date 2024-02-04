// Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());



app.use('/', express.static('public'));

const budget = {
    myBudget: [
        {
            title: 'Eat out!!',
            budget: 250
        },
        {
            title: 'Rent',
            budget: 275
        },
        {
            title: 'Grocery',
            budget: 10
        },
    ]
};

app.get('/budget', (req, res) => {
    res.send(budget);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});