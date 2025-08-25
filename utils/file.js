const fs = require("fs").promises;
const filePath = "./database.json";

async function readData() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading data: " + err);
  }
}


async function writeData(data) {
  try {

     await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw new Error("Error reading data: " + error.message);
  }
}

module.exports = {
  readData,
  writeData
};