import express from 'express';
import {getBooksAction, addBookAction} from '../db/actions/bookActions';




export const getBooks = async( req: express.Request, res: express.Response) => {
  try {
   
    const books = await getBooksAction();
    return res.status(200).json(books).end();

  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
}


export const addBook = async ( req: express.Request, res: express.Response) => {
    try {
        
    const { title, author} = req.body;
  
    if( !title || !author){
        return res.sendStatus(400);
    }
   
    const book = await addBookAction( {title, author});
    res.status(200).json(book).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}
