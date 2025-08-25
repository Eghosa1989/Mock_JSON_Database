const express = require('express');
require('dotenv').config();
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs')
const PORT = process.env.PORT;
const uri = process.env.MONGO_URI;
const userRoutes = require('./routes/users.js');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('../swagger.yaml-main/swagger.yaml');
const rateLimit = require('express-rate-limit');


app.set('views', './views');
app.set('view engine', 'ejs');

//rate limiter
const fixedWindowLimiter = rateLimit({
    windowMs: 1 *15 * 60 * 1000, // 15 minutes
    max: 10,// Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later."
});

app.use(express.static('public'));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(fixedWindowLimiter);

app.use(userRoutes);



mongoose.connect(uri).then(
async ()=> {

    console.log('Connected to MongoDB Server');

    app.listen(PORT, () => {
        console.log(`Connected to port ${PORT}`)
    });
}).catch((err) =>{ console.log(`error: ${err}`)});