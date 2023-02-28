const { Book } = require('./models/book');


const createError = require('http-errors');

let books = [];

// let idNo = 0;

exports.index = function (req, res) {
    // res.send(books);
    Book.find().then((books) => {
        res.send(books);
    })
}

exports.create = function (req, res, next) {
    const book = req.body;
    if (!book.title) {
        return (next(createError(400, 'Book not found in request body')));
    }

    const newBook = new Book({
        title: book.title,
        author: book.author,
        read: book.read,
        link: book.link
    });

    newBook.save().then((book) => {
        res.send(book);
    })

    // books.push({
    //     id: idNo,
    //     title: book.title,
    //     author: book.author,
    //     read: book.read,
    //     link: book.link
    // })
    // idNo++
    // res.send({
    //     result: true
    // })
}

exports.show = function (req, res, next) {

    Book.findById(req.params.id).then((book) => {
        if (!book) {
            return (next(createError(404, "Book entry not found.")))
        }
        res.send(book)
    })

    // const bookEntry = books.find(book => book.id == req.params.id)
    // if (!bookEntry) {
    //     return (next(createError(404, "Book entry not found.")))
    // }
    // res.send(bookEntry)
}

exports.delete = function (req, res, next) {

    Book.findByIdAndDelete(req.params.id).then((book) => {
        if (!book) {
            return (next(createError(404, "Book entry not found.")))
        }
        res.send({
            result: true
        })
    })
    // const bookEntry = books.find(book => book.id == req.params.id)
    // if (!bookEntry) {
    //     return (next(createError(404, "Book entry not found")))
    // }

    // books = books.filter(book => book.id != req.params.id)
    // res.send({
    //     result: true
    // })
}

exports.update = function (req, res, next) {
    Book.findById(req.params.id).then((book) => {
        if (!book) {
            return (next(createError(404, "Book by this name not found")))
        }
        if (!book) {
            return (next(createError(404, "Book not found")))
        }
        console.log(book)
        if (req.body.title) book.title = req.body.title
        if (req.body.author) book.author = req.body.author
        if (req.body.read) book.read = req.body.read
        if (req.body.link) book.link = req.body.link
        book.save().then((book) => {
            res.send(book)
        })
    })
}
// if (book.id == req.params.id) {
//     if (req.body.title) book.title = req.body.title
//     if (req.body.author) book.author = req.body.author
//     if (req.body.read) book.read = req.body.read
//     if (req.body.link) book.link = req.body.link
// }
// books = books.map(book => {
//     if (book.id == req.params.id) {
//         if (req.body.title) book.title = req.body.title
//         if (req.body.author) book.author = req.body.author
//         if (req.body.read) book.read = req.body.read
//         if (req.body.link) book.link = req.body.link
//     }
//     console.log(book)
//         return book
//     })

//     res.send({
//         result: true
//     })
// }
// )}

exports.findByTitle = function (req, res, next) {
    Book.find({ title: req.params.title }).then((book) => {
        if (!book) {
            return (next(createError(404, "Book entry not found")))
        }
        console.log(book)
        res.send(book)
    })

    // const bookEntry = books.find(book => book.title == req.params.title)
    // if (!bookEntry) {
    //     return (next(createError(404, "Book entry not found")))
    // }
    // console.log(bookEntry)
    // res.send(bookEntry)
}

exports.findByAuthor = function (req, res, next) {

    Book.find({ author: req.params.author }).then((book) => {
        if (!book) {
            return (next(createError(404, "Book Author not found.")))
        }
        res.send(book)
    })

    //     const bookEntry = books.find(book => book.author == req.params.author)
    //     if (!bookEntry) {
    //         return (next(createError(404, "Book entry not found")))
    //     }
    //     console.log(bookEntry)
    //     res.send(bookEntry)
}