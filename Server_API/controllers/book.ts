import express from 'express';
import {getBooks_Action, addBook_Action, getBookById_Action, deleteBook_Action, updateBook_Action, getBooksByFilter_Action} from '../db/actions/bookActions';
import fs from 'fs';
import { getAuthenticationBySession_Action } from '../db/actions/authenticationActions';
import {deleteLendingByBook_Action, getLendingByFilter_Action} from '../db/actions/lendingAction';
import { deleteFile } from '../helpers';
import { json } from 'body-parser';


/********************************GET REQUESTS********************************** */

//Get all books
export const getBooks = async( req: express.Request, res: express.Response) => {
  try {
   
    //calling _Action to get books
    const books = await getBooks_Action();

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

    //calling _Actions to get book by ID
    const book = await getBookById_Action(id);

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

    //calling _Action to filter books
    const books = await getBooksByFilter_Action(data);

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
    //checking session
    const sessionToken = req.cookies["auth"];
    if(!sessionToken){
      return res.sendStatus(403);
    }

    //getting user
    const auth = await getAuthenticationBySession_Action(sessionToken);

    const updatedBy_User = auth.userId;
      
    const { title, author, publish_year, publisherJson, languageJson, Total_copies, category, description} = req.body;
    //checking if cover present
    if(!req.file){
      return res.sendStatus(400);
    }

    const cover = req.file.filename;

    // //checking if present
    if( !title || !author || !publish_year || !publisherJson || !languageJson || !Total_copies || !category || !cover || !updatedBy_User || !description){
        //delete cover if book not added
        deleteFile(cover);
        return res.sendStatus(400);
    }

    const publisher = JSON.parse(publisherJson);
    const language = JSON.parse(languageJson);
    
    // //checking constraints
    if( publisher.length == 0 || language.length == 0 || Total_copies < 1 || publish_year > new Date().getFullYear() )
    {
        //delete cover if book not added
        deleteFile(cover);
        return res.sendStatus(400);
    }
   
    //calling _Action to see if same title present
    const same_book = await getBooksByFilter_Action({title });
    if(same_book.length != 0){
      //delete cover if book not added
      deleteFile(cover);
      return res.sendStatus(400);
    }

    //calling _Action to add book
    const book = await addBook_Action( {title, author, publish_year, publisher, language, Total_copies: Total_copies, Available_copies: Total_copies, category, cover, last_Updated: new Date(), updatedBy_User , description});
    

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

    //checking if any lendings
    const lendings = await getLendingByFilter_Action({bookId : id, status: "Borrowed"})
    if(lendings.length != 0){
      return res.sendStatus(400);
    }


    //calling _Action to delete book
    const book = await deleteBook_Action(id);

    //checking if book was deleted
    if( book ){
        //delete cover of book
        deleteFile(book.cover);
        //removing all lending
        await deleteLendingByBook_Action(id);
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
    console.log(req.body)
  const {id} = req.params;
  const { title, author, publish_year, publisherJson, languageJson, Total_copies, category, description}= req.body;
  
    //checking session
    const sessionToken = req.cookies["auth"];
    if(!sessionToken){
      return res.sendStatus(403);
    }

    //getting user
    const auth = await getAuthenticationBySession_Action(sessionToken);

    const updatedBy_User = auth.userId;


  //original cover
  const bookForCover= await getBookById_Action(id);
  if(!bookForCover){
    return res.sendStatus(400);
  }
  //setting available copies
  let Available_copies;
  if(Total_copies){
    Available_copies = bookForCover.Available_copies + parseInt(Total_copies) - bookForCover.Total_copies;
    console.log(Available_copies)
    if( Available_copies < 0 ){
      //new total is less than the rented books
      return res.sendStatus(400);
    }
  }
  

  //getting new cover name
  const old_cover = bookForCover.cover;
  let new_cover = old_cover;
  if(req.file){
    new_cover = req.file.filename;
  }

  //checking if present
  if( !title || !author || !publish_year || !publisherJson || !languageJson || !Total_copies || !category || !description){
      //delete new cover only if new cover was provided
      req.file ? deleteFile(new_cover): {};
      return res.sendStatus(400);
  }

  const publisher = JSON.parse(publisherJson);
  const language = JSON.parse(languageJson);

  //checking constraints
  if( publisher.length == 0 || language.length == 0 || Total_copies < 1 || publish_year > new Date().getFullYear() )
  { 
      //delete new cover only if new cover was provided
      req.file ? deleteFile(new_cover): {};
      return res.sendStatus(400);
  }

  //calling _Action for checking if same title present
  const same_book: any = await getBooksByFilter_Action({title, _id: {$ne: id} });
  if(same_book.length != 0){
    //delete new cover only if new cover was provided
    req.file ? deleteFile(new_cover): {};
    return res.sendStatus(400);
  }

  //calling _Action to update
  const book = await updateBook_Action(id, {title, author, publish_year, publisher, language, Total_copies, Available_copies , category, cover: new_cover, last_Updated: new Date(), updatedBy_User, description});

  //checking if updated
  if( book ){
    if(req.file){
      //delete old cover is updated successfully
       deleteFile(old_cover);
    }
    res.status(200).json(book).end();
  }else{
     ///delete new cover only if new cover was provided
    req.file ? deleteFile(new_cover): {};
    return res.sendStatus(400);
  }

  } catch (error) {
      console.log(error);
      return res.sendStatus(400);
  }
}
