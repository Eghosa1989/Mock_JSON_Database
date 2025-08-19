const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs')
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const { readData } = require('./utils/file.js');


app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//api endpoint exposing user resources
app.get('/api/v1/users',  async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


mongoose.connect(uri).then(
async ()=> {

    console.log('Connected to MongoDB Server');

    app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}`)
    });
}).catch((err) =>{ console.log(`error: ${err}`)});