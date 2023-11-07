import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("MERN bookstore");
});

// Create a new book
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Enter the required fields",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Get a book by id
app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Update a book by id
app.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Must enter required fields",
      });
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }
    const preview = await Book.findById(id);
    return res.status(200).json({
      message: "Book updated",
      data: preview,
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

// Delete a book by id
app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({
        message: "Book not found",
      });
    }
    return res.status(200).json({
      message: "Book deleted",
    });
  } catch (e) {
    console.log(e.message);
    res.status(500).send({ message: e.message });
  }
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(PORT, () => {
      console.log(`Current port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
