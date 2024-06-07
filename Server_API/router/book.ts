import express from 'express';
import { getBooks , addBook, getBookById, deleteBook, updateBook, getBooksByFilter} from '../controllers/book';
import {isAuthenticated} from '../middlewares';


export default (router: express.Router) => {
    router.get("/book", getBooks);
    router.get("/book/filter", getBooksByFilter);
    router.get("/book/:id", getBookById);
    router.post("/book/add", addBook);
    router.delete("/book/:id", deleteBook);
    router.post("/book/update/:id", updateBook);
}

