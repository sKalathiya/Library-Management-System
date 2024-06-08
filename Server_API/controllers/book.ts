import express from 'express';
import {getBooksAction, addBookAction, getBookByIdAction, deleteBookAction, updateBookAction, getBooksByFilterAction} from '../db/actions/bookActions';
import {upload} from "../helpers";


/********************************GET REQUESTS********************************** */

//Get all books
export const getBooks = async( req: express.Request, res: express.Response) => {
  try {
   
    //calling action to get books
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

    //calling actions to get book by ID
    const book = await getBookByIdAction(id);

    //checking if book present
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

// Filter Books

export const getBooksByFilter = async ( req: express.Request , res: express.Response) => {
  try {
  
    const data = req.body;
    data.language ? data.language = {$all : data.language } : {};
    data.publisher ? data.publisher =  {$all : data.publisher }: {} ;

    //calling action to filter books
    const books = await getBooksByFilterAction(data);

    res.status(200).json(books).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
}

/****************************************************POST REQUEST****************************************************** */


//add book
export const addBook = async ( req: express.Request, res: express.Response) => {
    try {

      
    const { title, author, publish_year, publisher, language, copies, category} = req.body;
   
    // const cover = req.file?.originalname;
    const cover = "s.png";

    //checking if present
    if( !title || !author || !publish_year || !publisher || !language || !copies || !category || !cover){
        return res.sendStatus(400);
    }

    //checking constraints
    if( publisher.length == 0 || language.length == 0 || copies < 1 || publish_year > new Date().getFullYear() )
    {
        return res.sendStatus(400);
    }
   
    //calling action to see if same title present
    const same_book = await getBooksByFilterAction({title });
    if(same_book.length != 0){
      return res.sendStatus(400);
    }

    //calling action to add book
    const book = await addBookAction( {title, author, publish_year, publisher, language, copies, category, cover, date_Added: new Date() });
    // upload.single(req.body.file);

    res.status(200).json(book).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

/****************************************************DELETE  REQUEST****************************************************** */


//delete book
export const deleteBook = async ( req: express.Request , res: express.Response) => {
  try {
    const { id} = req.params;

    //TODO
    // Add ways to delete cover 

    //calling action to delete book
    const book = await deleteBookAction(id);

    //checking if book was deleted
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


/****************************************************UPDATE  REQUEST****************************************************** */


//update book
export const updateBook = async ( req: express.Request, res: express.Response) => {
  try {
  const {id} = req.params;
  const { title, author, publish_year, publisher, language, copies, category} = req.body;
  //TODO
    // Add ways to update cover and store link in mongoose

  const cover = "s.png";
  
  //checking if present
  if( !title || !author || !publish_year || !publisher || !language || !copies || !category || !cover){
      return res.sendStatus(400);
  }

  //checking constraints
  if( publisher.length == 0 || language.length == 0 || copies < 1 || publish_year > new Date().getFullYear() )
  {
      return res.sendStatus(400);
  }

  //calling action for checking if same title present
  const same_book: any = await getBooksByFilterAction({title, _id: {$ne: id} });
  if(same_book.length != 0){
    return res.sendStatus(400);
  }

  //calling action to update
  const book = await updateBookAction(id, {title, author, publish_year, publisher, language, copies, category, cover});

  //checking if updated
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
