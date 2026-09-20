const mongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uri = 'mongodb+srv://dhruvikaahuja5_db_user:AlpArKTRkJdzSBmq@cluster0.cmzigun.mongodb.net/?appName=Cluster0';

app.get('/api/dashbaord', async (req, res) => {
  try {
    const client = await mongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = client.db('TravellersParadise');
    const collection = db.collection('dashboard');
    const data = await collection.find({}).toArray();
    client.close();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;

app.listen(4000);
console.log('Server Started : http://127.0.0.1:4000');