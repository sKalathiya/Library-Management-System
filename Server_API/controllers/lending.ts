import express from 'express';
import { getAuthenticationBySession_Action} from '../db/actions/authenticationActions';
import { addLending_Action, getLendingByFilter_Action, getLendingById_Action, getLendings_Action } from '../db/actions/lendingAction';
import {getBookById_Action, getBookByTitle_Action} from '../db/actions/bookActions';
import { getUserByEmail_Action } from '../db/actions/userActions';
import mongoose from 'mongoose';
import { Book, LendingSearch } from '../db/models';
import { getBooksByFilter } from './book';

//get all lending
export const getLendingDeals = async (req: express.Request, res: express.Response) => {
    try {
        
        const deals = await getLendings_Action();

        return res.status(200).json(deals).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

//getting lending by id
export const getLendingById = async (req: express.Request, res:express.Response) => {
    try {
        
        const { id} = req.params;

        const lendingDeal = await getLendingById_Action(id);
        if(!lendingDeal){
            return res.sendStatus(400);
        }

        return res.status(200).json(lendingDeal).end();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


//adding lending
export const addLending = async (req: express.Request, res: express.Response) => {

    try {
        
        //getting user from session
    const sessionToken = req.cookies["auth"];
    const auth = await getAuthenticationBySession_Action(sessionToken);
    if(!auth){
        return res.sendStatus(400);
    }
    const lender_id = auth.userId;

    //getting details of lending
    const { email, bookTitle, borrowedDays } =  req.body;

    //checking if available and borrowed days greater than 5
    if( !bookTitle || !email || !borrowedDays || borrowedDays <5){
        return res.sendStatus(400);
    }

    //getting borrower
    const borrower = await getUserByEmail_Action(email);
    if(!borrower){
        return res.sendStatus(400);
    }
    const borrower_Id = borrower._id.toString();

    //getting book to change copies
    const book = await getBookByTitle_Action(bookTitle);
    if(!book ){
        return res.sendStatus(400);
    }
    if(book.Available_copies == 0){
        return res.sendStatus(400);
    }else{
        book.Available_copies = book.Available_copies - 1;
        await book.save();
    }

    const tmp = new Date();
    tmp.setDate(tmp.getDate() + parseInt(borrowedDays) )
    
 
    //adding the lending deal
    const lendingDeal = await addLending_Action({
        book: book._id,
        borrowerUser: borrower_Id,
        lenderUser: lender_id,
        date_Borrowed: new Date(),
        updatedByUser: lender_id,
        Last_Updated: new Date(),
        Expected_Returned: tmp,
        borrowedDays,
        status: "Borrowed"
    });
    
    return res.status(200).json(lendingDeal).end();

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
    

}

//changing status of the lending
export const changeStatusOfDeal = async (req: express.Request, res:express.Response ) => {
    try {
        const{ id} = req.params;
        const {status} = req.body;

         //getting user from session
        const sessionToken = req.cookies["auth"];
        const auth = await getAuthenticationBySession_Action(sessionToken);
        if(!auth){
        return res.sendStatus(400);
        }
        const returnedToUser = auth.userId;

        //getting lending deal
        const lendingDeal = await getLendingById_Action(id);
       
        if(!lendingDeal || !lendingDeal.book ){
            return res.sendStatus(400);
        }
   
        //checking if already closed
        if(lendingDeal.status != "Borrowed"){
            return res.sendStatus(400);
        }
   
        //finding book to change copies
        const book = lendingDeal.book as Book;
       
        //checking to decrease or increase the count
        if( status == "Returned" || status == "Delayed_Return" || status == "Cancelled"){
            book.Available_copies = book.Available_copies + 1;
            lendingDeal.date_Returned = new Date();
        }
        else if( status == "Lost" || status == "Damaged") {
            book.Total_copies = book.Total_copies - 1;
            
        }else{
            return res.sendStatus(400);
        }
        await book.save();
        //changing status of deal
        lendingDeal.status = status;
        lendingDeal.Last_Updated = new Date();
        lendingDeal.updatedByUser = returnedToUser ;
       
       await lendingDeal.save();

        return res.status(200).json(lendingDeal).end();

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}




//Filter lending
export const getLendingByFilter = async (req:express.Request, res:express.Response) => {
    try {
      
        const { bookTitle, borrowerUserEmail, lenderUserEmail, date_Borrowed, borrowedDays, status} = req.body;

        const search: LendingSearch = {}

        if(bookTitle){
            const book = (await getBookByTitle_Action(bookTitle));
            if( book){
                search.book = book._id; 
            }
        }

        if( borrowerUserEmail){
            const user  = await getUserByEmail_Action(borrowerUserEmail);
            if( user) {
                search.borrowerUser = user._id;
            }
        }
        if( lenderUserEmail){
            const user  = await getUserByEmail_Action(lenderUserEmail);
            if( user) {
                search.lenderUser = user._id;
            }
        }
        if(date_Borrowed){
            const day_Midnight = new Date(date_Borrowed);
            day_Midnight.setDate(day_Midnight.getDate() + 1);
            console.log(day_Midnight.toISOString())

            search.date_Borrowed = {
                $gte: date_Borrowed,
                $lt: day_Midnight.toISOString()
            }
        }
        if(borrowedDays && borrowedDays != -1){
            search.borrowedDays = borrowedDays;
        }
        if(status){
            search.status = status;
        }
        if ( Object.keys(search).length == 0){
            return res.sendStatus(400);
        }
      
        const lendingDeals = await getLendingByFilter_Action(search);
        return res.status(200).json(lendingDeals).end();
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
} 


//Filter lending
export const getDailyLendings = async (req:express.Request, res:express.Response) => {
    try {
        var d = new Date();
        d.setHours(0,0,0,0);    
        const lendingDeals = await getLendingByFilter_Action({ date_Borrowed: {
            $gte: d
            } });
        
        return res.status(200).json(lendingDeals).end();
        
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
} 

