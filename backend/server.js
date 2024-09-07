const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const productRoutes = require('./routes/products')

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/products', productRoutes);

const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI).then(() =>{
    server.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    }); 
})

.catch(err =>{
    console.log('Connection Failed');
    console.log(err);
})
