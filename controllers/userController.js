const fs = require('fs');
const filePath = require('../database.json');
const {readData, writeData} = require('../utils/file.js'); 

async function createUser(req, res){
    try {
        const data = await readData(filePath);
        
        //determine last userId
        const lastUser = data.users[data.users.length - 1]

        //what happens if there are no users?
        //ternary operator
        const nextId = lastUser ? lastUser.id + 1 : 1;

        const newUser = {
            id: nextId,
            username: req.body.username,
            first_name: req.body.first_name,
            email: req.body.email,
        };

        //push the data to memory object
        data.users.push(newUser);


    //write to the file
    await writeData(data);
    res.status(201).json({ message: 'New user added', user: newUser });

    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    }
}

module.exports = {
    createUser
};