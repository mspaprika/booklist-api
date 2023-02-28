const express = require('express')
const books = require('./bookManager')
const router = express.Router()

router.get('/book', books.index)
router.get("/book/:id", books.show)
router.post('/create', books.create)
router.delete('/deletebook/:id', books.delete)
router.put('/book/:id', books.update)
router.get('/book/title/:title', books.findByTitle)
router.get('/book/author/:author', books.findByAuthor)
router.delete('/deleteall', books.deleteAll)

module.exports = router;