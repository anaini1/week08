const express = require('express');
const app = express();
const fs = require('fs');
const port = 2000;
const cors = require('cors');

app.use('/', express.static('public'));


const mongoDBClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


let url = 'mongodb://localhost:27017/mongodb_demo';


app.use('/', express.static('public'));


// mongoDBClient.connect(url, { useUnifiedTopology: true }, (operationalError, dbHander) =>{
//     if(operationalError){
//         console.log('Error');
//     }
//     else {
//         console.log('Connected to the database');
//         dbHander.db('mongodb_demo').collection('data').find({}).toArray(function (err, res){
//             if(err){
//                 console.log('error');
//             }
//             console.log(JSON.stringify(res));
//         }) 
            
//     }
// });

mongoose.connect('mongodb://127.0.0.1:27017/mongodb_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const chartDataSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    relatedValue: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^#[0-9A-Fa-f]{6}$/.test(v); 
        },
        message: 'Invalid format in color.',
      },
    },
  });
  
  const ChartData = mongoose.model('ChartData', chartDataSchema);
       


// app.get('/hello', (req,res) => {
//     res.send('Hello World!!');
// })

// app.listen(port, () => {
//     console.log('Listening at 3000x')

// })

app.get('/chart-data', (req, res) => {
    ChartData.find({})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });  
  });

  
  app.post('/chart-data', (req, res) => {
    const { title, relatedValue, color } = req.body;
  
    const newChartData = new ChartData({
      title,
      relatedValue,
      color,
    });
  
    newChartData.save()
    .then((savedData) => {
      res.status(201).json(savedData);
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error: error.message });
    });
  });

app.use(cors());



app.listen(port, () =>{
    console.log(`API Started at http://localhost:${port}`);
})