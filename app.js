const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;



mongoose.connect(uri).then(
async ()=> {
    console.log("Connected to MongoDB successfully");

    
    app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}`)
    });
}).catch((err) =>{ console.log(`error: ${err}`)});