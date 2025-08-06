const express = require ('express');
require('dotenv').config();
const app = express();
const PORT = procces.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});