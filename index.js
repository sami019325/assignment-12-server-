const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
require('dotenv').config();


// middleware
app.use(cors());
app.use(express.json());


// pherofinal
// cWP7R8EYWNwndrQ0

app.get('/', (request, response) => {
    response.send('nothing')
});


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.BD_PASS}@cluster0.mmeqena.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const collection = client.db("doctorsportal").collection("services");
        const BookingCollection = client.db("booking").collection("client");

        // get appointments 
        app.get('/appointmentdata', async (req, res) => {
            const query = {};
            const appointments = await collection.find(query).toArray();
            res.send(appointments);
        })

        app.get('/t', (req, res) => {
            res.send(uri)
        })


    } finally {
    }
}
run().catch(console.dir);




app.listen(port, () => {
    console.log('listening on port ' + port);
});

