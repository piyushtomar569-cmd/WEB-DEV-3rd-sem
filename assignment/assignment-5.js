const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

let books = [
    {
        id: 1,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        category: "Fantasy",
        year: 1937,
        isbn: "9780547928227"
    },
    {
        id: 2,
        title: "Pride and Prejudice",
        author: "Jane Austen",
        category: "Classic",
        year: 1813,
        isbn: "9780141439518"
    },
    {
        id: 3,
        title: "The Martian",
        author: "Andy Weir",
        category: "Science Fiction",
        year: 2011,
        isbn: "9780553418026"
    }
];

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "library.html"));
});

app.get("/api/books", (req, res) => {
    res.json(books);
});

app.get("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    res.json(book);
});

app.post("/api/books", (req, res) => {
    const { title, author, category, year, isbn } = req.body;

    const newBook = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        category,
        year,
        isbn
    };

    books.push(newBook);

    res.status(201).json({
        message: "Book added successfully",
        book: newBook
    });
});

app.put("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author, category, year, isbn } = req.body;

    book.title = title ?? book.title;
    book.author = author ?? book.author;
    book.category = category ?? book.category;
    book.year = year ?? book.year;
    book.isbn = isbn ?? book.isbn;

    res.json({
        message: "Book updated successfully",
        book
    });
});

app.delete("/api/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
