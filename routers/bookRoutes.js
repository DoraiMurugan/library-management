const express = require('express');
const router = express.Router();

// BOOK DATA (Library)
let books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", category: "Programming", publishedYear: 2008, availableCopies: 5 },
    { id: 2, title: "Atomic Habits", author: "James Clear", category: "Self Help", publishedYear: 2018, availableCopies: 3 },
    { id: 3, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", publishedYear: 1993, availableCopies: 4 },
    { id: 4, title: "Deep Learning", author: "Ian Goodfellow", category: "AI", publishedYear: 2016, availableCopies: 2 }
];


// ---------------- CREATE ----------------
router.post('/', (req, res) => {
    const { title, author, category, publishedYear, availableCopies } = req.body;

    if (!title || !author || !category || !publishedYear || availableCopies == null) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newBook = {
        id: books.length + 1,
        title,
        author,
        category,
        publishedYear,
        availableCopies
    };

    books.push(newBook);
    res.status(201).json({ message: "Book added successfully", book: newBook });
});


// ---------------- READ ALL ----------------
router.get('/', (req, res) => {
    res.json(books);
});


// ---------------- READ BY ID ----------------
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});


// ---------------- UPDATE ----------------
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { title, author, category, publishedYear, availableCopies } = req.body;

    const book = books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (category) book.category = category;
    if (publishedYear) book.publishedYear = publishedYear;
    if (availableCopies != null) book.availableCopies = availableCopies;

    res.json({ message: "Book updated successfully", book });
});


// ---------------- DELETE ----------------
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    if (books[index].availableCopies <= 0) {
        return res.status(400).json({ message: "Book cannot be deleted. Copies not available." });
    }

    const deletedBook = books.splice(index, 1);
    res.json({ message: "Book deleted successfully", book: deletedBook[0] });
});

module.exports = router;
