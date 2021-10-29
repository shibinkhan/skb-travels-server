const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// midlewere
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Touring website Server is running!');
});

app.listen(port, () => {
    console.log('Server running, port no:', port);
});