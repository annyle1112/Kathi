const express = require('express');
const cors = require('cors');
const postsRoutes = require('./routes/posts.routes');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/posts', postsRoutes)

app.listen(PORT, (error) => {
    if(error) {
        console.log(error)
    } else {
        console.log(`server running on http://localhost:${PORT}`);
    }
})

const credentials = process.env.PATH_TO_PEM
mongoose.connect(process.env.DB_CONNECTION, { 
    sslKey: credentials,
    sslCert: credentials,
    dbName: process.env.DATABASE 
})
.then(
    () => console.log('connected to DB')
).catch(
    err => console.error(err, 'conncetion error')
)

const db = mongoose.connection;