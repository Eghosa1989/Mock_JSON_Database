const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController.js');
const { readData } = require('../utils/file.js');


router.use(express.json());
router.use(express.urlencoded({ extended: true }));


//api endpoint exposing user resources
router.get('/api/v1/users',  async (req, res) => {
    try {
        const data = await readData();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//home route
router.get('/home', (req, res) => {
    res.render('home');
});

// router to create user
router.post('/users', userController.createUser);



   module.exports = router;