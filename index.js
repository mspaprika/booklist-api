require("dotenv").config()
const mongoose = require("mongoose")

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const router = require('./router');
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});