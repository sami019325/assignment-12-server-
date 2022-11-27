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


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.mmeqena.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



async function run() {

    const category = client.db("pherofinal").collection("catagory");
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
