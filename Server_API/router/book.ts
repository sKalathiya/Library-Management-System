import express from 'express';
import { getBooks , addBook, getBookById, deleteBook, updateBook, getBooksByFilter} from '../controllers/book';
import {isAuthenticated, isBookkeeper} from '../middlewares';
import { upload } from '../helpers';


export default (router: express.Router) => {
    router.get("/book", getBooks);
    router.get("/book/filter", getBooksByFilter);
    router.get("/book/:id", getBookById);
    router.post("/book/add", isAuthenticated, isBookkeeper, upload.single("file"), addBook);
    router.delete("/book/:id", isAuthenticated, isBookkeeper, deleteBook);
    router.post("/book/update/:id", isAuthenticated, isBookkeeper, upload.single('file'), updateBook);
}

