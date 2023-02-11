const express = require("express");
const csvParser = require("csv-parser");
const multer = require('multer');
const bodyParser = require('body-parser')
const fs = require("fs");

let fileName;
const PORT = process.env.PORT || 4000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

// const parser = csvParser({
//     delimiter: ':'
// });

const processFile = async () => {
    const records = [];

    const parser = fs
        .createReadStream(`./uploads/${fileName}`)
        .pipe(csvParser());

    for await (const record of parser) {
        // Work with each record
        records.push(record);
    }

    return records;
};

app.post('/parseCSV', upload.single('file'), async (req, res) => {
    // parseCSV(res);
    const records = await processFile();

    console.log(records)
    res.send(records)
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});