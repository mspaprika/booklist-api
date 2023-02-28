const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    link: String,
    read: Boolean
});

module.exports.Book = mongoose.model("Book", bookSchema, "book");