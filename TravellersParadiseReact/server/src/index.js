// require('dotenv').config();
// const express = require('express');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/users');
// const helmet = require('helmet');
// const cors = require('cors');

// connectDB();
// const app = express();
// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use('/api/dashbaord', userRoutes);

// // basic error handler
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({ message: err.message || 'Server error' });
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on ${PORT}`));

const mongoClient = require('mongodb').MongoClient;
const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectionString = 'mongodb+srv://dhruvikaahuja5_db_user:AlpArKTRkJdzSBmq@cluster0.cmzigun.mongodb.net/?appName=Cluster0';

app.get('/dashbaord', (req, res) => {
    mongoClient.connect(connectionString).then(clientObj => {
        let database = clientObj.db("dashboard");
        database.collection('dashboard').find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
})

module.exports = app;

app.listen(4000);
console.log('Server Started : http://127.0.0.1:4000');