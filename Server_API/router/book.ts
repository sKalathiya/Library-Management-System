import express from 'express';
import { getBooks , addBook} from '../controllers/book';
import {isAuthenticated} from '../middlewares';
export default (router: express.Router) => {
    router.get("/book", isAuthenticated, getBooks);
    router.post("/book/add", addBook);
}

