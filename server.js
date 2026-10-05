const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;

let books = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear"
    },
    {
        id: 2,
        title: "Ikigai",
        author: "Hector Garcia"
    }
];

app.get("/books", (req, res) => {
    res.json(books);
});


// POST a new book
app.post("/books", (req, res) => {

    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});
// UPDATE a book
app.put("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title;
    book.author = req.body.author;

    res.json(book);
});
// DELETE a book
app.delete("/books/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});