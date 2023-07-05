const express = require('express');

const booksrouter = express.Router();
const { getAllBooks } = require('../controllers/booksController');

booksrouter.get('/', getAllBooks);

booksrouter.get("/:book_id", (req,res)=>{
    res.json(req.params);
})


module.exports = booksrouter;