const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
// const jwt = require('jsonwebtoken');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());


// pherofinal
// cWP7R8EYWNwndrQ0


const uri = `mongodb+srv://pherofinal:cWP7R8EYWNwndrQ0@cluster0.mmeqena.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    const category = client.db("pherofinal").collection("catagory");
    const products = client.db("pherofinal").collection("Products");
    try {
        app.get('/a', async (req, res) => {
            console.log(uri)
            res.send(uri);
        })
        // get category 
        app.get('/category', async (req, res) => {
            const query = {};
            const productList = await category.find(query).toArray();
            res.send(productList);
        })
        app.get('/category/:id', async (req, res) => {
            // console.log(req.params);
            const category = req.params['id']
            const query = { type: category };
            const productList = await products.find(query).toArray();
            console.log(productList)
            res.send(productList);
        })
        app.post('/product/:id', async (req, res) => {
            // console.log(req.params);
            const category = req.params['id']
            const filter = { _id: category };
            // this option instructs the method to create a document if no documents match the filter
            const options = { upsert: true };
            // create a document that sets the plot of the movie
            const updateDoc = {
                $set: {
                    IsSold: true
                },
            };
            const result = await products.updateOne(filter, updateDoc, options);
            console.log(
                result
            );
            res.send(result)
        })
        app.post('/add', async (req, res) => {
            const productData = req.body;
            console.log(productData);
            const result = await products.insertOne(productData);
            res.send(result);
        });
    }
    finally { err => console.error(err); }
}
run().catch(console.dir);




app.get('/', (request, response) => {
    response.send('AAJAMN SAMI')
});

app.listen(port, () => {
    console.log('doctors portal is running on ', port)
})
