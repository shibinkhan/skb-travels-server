const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

// midlewere
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j92oy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function server() {
    try {
        await client.connect();
        console.log('Database is Connected.');

        const database = client.db('SKB-Travels')
        const plansCollection = database.collection('plans');
        const ordersCollection = database.collection('orders');

        // POST a new Plan
        app.post('/plans', async (req, res) => {
            const plan = req.body;
            const result = await plansCollection.insertOne(plan);
            res.json(result);
        });

        // GET All Plans
        app.get('/plans', async (req, res) => {
            const cursor = plansCollection.find({});
            const plans = await cursor.toArray();
            res.send(plans);
        });

        // GET a Single Plan
        app.get('/plans/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const plan = await plansCollection.findOne(query);
            res.json(plan);
        });

        // POST an Order
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const planResult = await ordersCollection.insertOne(order);
            res.json(planResult);
        });

        // GET All Orders
        app.get('/orders', async (req, res) => {
            const cursor = ordersCollection.find({});
            const order = await cursor.toArray();
            res.send(order);
        });

        // DELETE an Order
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const deleteResult = await ordersCollection.deleteOne(query);
            res.json(deleteResult);
        });
    }

    finally {
        // await client.close();
    };
};
server().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Touring website Server is running!');
});

app.listen(port, () => {
    console.log('Server running, port no:', port);
});