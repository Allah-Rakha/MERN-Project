import express from 'express';
import {Book} from '../models/booksModel.js';
const router=express.Router()


// Route to save a new book
router.post("/", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publish year",
      });
    }

    const newBook = { title, author, publishYear };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

// Route to get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Route to get one book by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    return res.status(200).json(book);
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ message: err.message });
  }
});

// Route to update a book by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, author, publishYear } = req.body;

    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publish year",
      });
    }

    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publishYear },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    return res.status(200).send({
      message: "Book updated successfully...",
      data: updatedBook,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});
//Route to delete a book by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: "Book not found",
      });
    }
    return res.status(200).send({
      message: "Book deleted successfully...",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      message: err.message,
    });
  }
});


export default router;