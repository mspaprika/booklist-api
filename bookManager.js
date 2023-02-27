
const createError = require('http-errors');

let books = [];

let idNo = 0;

exports.index = function (req, res) {
    res.send(books);
}

exports.create = function (req, res, next) {
    const book = req.body;
    if (!book.title) {
        return (next(createError(400, 'Book not found in request body')));
    }

    books.push({
        id: idNo,
        title: book.title,
        author: book.author,
        read: book.read,
        link: book.link
    })
    idNo++
    res.send({
        result: true
    })
}

exports.show = function (req, res, next) {
    const bookEntry = books.find(book => book.id == req.params.id)
    if (!bookEntry) {
        return (next(createError(404, "Book entry not found.")))
    }
    res.send(bookEntry)
}

exports.delete = function (req, res, next) {
    const bookEntry = books.find(book => book.id == req.params.id)
    if (!bookEntry) {
        return (next(createError(404, "Book entry not found")))
    }

    books = books.filter(book => book.id != req.params.id)
    res.send({
        result: true
    })
}

exports.update = function (req, res, next) {
    if (!req.body.title) {
        return (next(createError(404, "Book by this name not found")))
    }
    const bookEntry = books.find(book => book.id == req.params.id)
    if (!bookEntry) {
        return (next(createError(404, "Book not found")))
    }
    console.log(bookEntry)
    books = books.map(book => {
        if (book.id == req.params.id) {
            if (req.body.title) book.title = req.body.title
            if (req.body.author) book.author = req.body.author
            if (req.body.read) book.read = req.body.read
            if (req.body.link) book.link = req.body.link
        }
        console.log(book)
        return book
    })

    res.send({
        result: true
    })
}

exports.findByTitle = function (req, res, next) {
    const bookEntry = books.find(book => book.title == req.params.title)
    if (!bookEntry) {
        return (next(createError(404, "Book entry not found")))
    }
    console.log(bookEntry)
    res.send(bookEntry)
}

exports.findByAuthor = function (req, res, next) {
    const bookEntry = books.find(book => book.author == req.params.author)
    if (!bookEntry) {
        return (next(createError(404, "Book entry not found")))
    }
    console.log(bookEntry)
    res.send(bookEntry)
}