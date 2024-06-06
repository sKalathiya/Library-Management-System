import express from 'express';
import {getBooksAction, addBookAction, getBookByIdAction, deleteBookAction, updateBookAction} from '../db/actions/bookActions';



//Get all books
export const getBooks = async( req: express.Request, res: express.Response) => {
  try {
   
    const books = await getBooksAction();
    return res.status(200).json(books).end();

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

//get book by Id
export const getBookById = async( req: express.Request, res: express.Response) => {
  try {
    const {id }= req.params;
    const book = await getBookByIdAction(id);

    if( book ){
        return res.status(200).json(book).end();
    }else{
        return res.sendStatus(400);
    }

  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}


//add book
export const addBook = async ( req: express.Request, res: express.Response) => {
    try {
        
    const { title, author, publish_year, publisher, language, copies, category} = req.body;
  
    if( !title || !author || !publish_year || !publisher || !language || !copies || !category){
        return res.sendStatus(400);
    }
   
    const book = await addBookAction( {title, author, publish_year, publisher, language, copies, category});
    res.status(200).json(book).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}


//delete book
export const deleteBook = async ( req: express.Request , res: express.Response) => {
  try {
    const { id} = req.params;

    const book = await deleteBookAction(id);

    if( book ){
        return res.status(200).json(book).end();
    }else{
        return res.sendStatus(400);
    }


  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

//update book
export const updateBook = async ( req: express.Request, res: express.Response) => {
  try {
    const {id} = req.params;
  const { title, author, publish_year, publisher, language, copies, category} = req.body;

  if( !title || !author || !publish_year || !publisher || !language || !copies || !category){
      return res.sendStatus(400);
  }

  const book = await updateBookAction(id, {title, author, publish_year, publisher, language, copies, category});

  if( book ){
    res.status(200).json(book).end();
  }else{
    return res.sendStatus(400);
  }

  } catch (error) {
      console.log(error);
      return res.sendStatus(400);
  }
}
