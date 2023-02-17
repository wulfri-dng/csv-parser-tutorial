// Import required dependencies
const express = require("express");
const csvParser = require("csv-parser");
const multer = require('multer');
const bodyParser = require('body-parser')
const fs = require("fs");

let fileName;
const PORT = 4000; // Set the server port to 4000

const app = express();

// Use body-parser middleware to parse request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure Multer storage to save the uploaded CSV file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        fileName = file.originalname;
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Function to parse the uploaded CSV file into JSON format
const parseCSV = async () => {
    const records = [];

    const parser = fs
        .createReadStream(`./uploads/${fileName}`) // Create a readable stream to read the uploaded CSV file
        .pipe(csvParser()); // Pipe the stream to the CSV parser

    for await (const record of parser) {
        records.push(record);
    }

    return records;
};

// Route to handle file upload and CSV parsing
app.post('/parseCSV', upload.single('file'), async (req, res) => {
    const records = await parseCSV(); // Call the parseCSV function to parse the uploaded CSV file

    res.send(records) // Send the parsed records as a response
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
